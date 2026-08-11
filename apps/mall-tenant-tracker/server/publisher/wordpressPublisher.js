import axios from 'axios';

/**
 * Publishes a blog post to a WordPress site using Application Password REST API authentication
 */
export async function publishToWordPress({ siteUrl, username, applicationPassword, title, content, status = 'draft', categories = [] }) {
  const cleanSiteUrl = siteUrl.replace(/\/+$/, '');
  const endpoint = `${cleanSiteUrl}/wp-json/wp/v2/posts`;

  // Create Basic Auth Token
  const credentials = `${username.trim()}:${applicationPassword.trim().replace(/\s+/g, '')}`;
  const encodedCredentials = Buffer.from(credentials).toString('base64');

  try {
    const response = await axios.post(
      endpoint,
      {
        title,
        content,
        status, // 'draft' or 'publish'
        categories
      },
      {
        headers: {
          'Authorization': `Basic ${encodedCredentials}`,
          'Content-Type': 'application/json'
        },
        timeout: 15000
      }
    );

    return {
      success: true,
      id: response.data.id,
      link: response.data.link,
      status: response.data.status,
      title: response.data.title?.rendered || title
    };
  } catch (err) {
    let errorMsg = err.message;
    if (err.response) {
      errorMsg = `WordPress API Error (${err.response.status}): ${err.response.data?.message || JSON.stringify(err.response.data)}`;
    }
    return {
      success: false,
      error: errorMsg
    };
  }
}

/**
 * Validates WordPress connection credentials
 */
export async function testWordPressConnection({ siteUrl, username, applicationPassword }) {
  const cleanSiteUrl = siteUrl.replace(/\/+$/, '');
  const endpoint = `${cleanSiteUrl}/wp-json/wp/v2/users/me`;

  const credentials = `${username.trim()}:${applicationPassword.trim().replace(/\s+/g, '')}`;
  const encodedCredentials = Buffer.from(credentials).toString('base64');

  try {
    const response = await axios.get(endpoint, {
      headers: {
        'Authorization': `Basic ${encodedCredentials}`
      },
      timeout: 10000
    });

    return {
      success: true,
      user: {
        id: response.data.id,
        name: response.data.name,
        slug: response.data.slug
      }
    };
  } catch (err) {
    let errorMsg = err.message;
    if (err.response) {
      errorMsg = `Authentication Failed (${err.response.status}): ${err.response.data?.message || 'Invalid username or Application Password'}`;
    }
    return {
      success: false,
      error: errorMsg
    };
  }
}
