import ftplib
import pexpect
import sys
import os

host = '198.60.193.11'
sftp_host = 'm11.wpx.net'
password = 'Sgtuff2026Pass#'

main_users = [
    'diaperca',
    'diaperca.ftp',
    'sgtuff_deploy.ftp.diaperca'
]

print("--- Testing FTP/SFTP with Account User 'diaperca' ---")

for u in main_users:
    print(f"\n1. Testing FTP port 21 for user '{u}'...")
    try:
        ftp = ftplib.FTP()
        ftp.connect(host, 21, timeout=5)
        ftp.login(user=u, passwd=password)
        print(f"🎉 SUCCESS! FTP LOGGED IN AS {u}")
        print("Files:", ftp.nlst())
        sys.exit(0)
    except Exception as e:
        print(f"FTP failed for {u}: {e}")

    print(f"2. Testing SFTP port 2222 for user '{u}'...")
    cmd = f"sftp -P 2222 -o StrictHostKeyChecking=no -o HostKeyAlgorithms=+ssh-rsa,rsa-sha2-256,rsa-sha2-512 {u}@{sftp_host}"
    child = pexpect.spawn(cmd, encoding='utf-8', timeout=10)
    try:
        idx = child.expect(['[Pp]assword:', pexpect.EOF, pexpect.TIMEOUT])
        if idx == 0:
            child.sendline(password)
            idx2 = child.expect(['sftp>', 'Permission denied', pexpect.EOF, pexpect.TIMEOUT])
            if idx2 == 0:
                print(f"🎉 SUCCESS! SFTP LOGGED IN AS {u}")
                child.sendline("ls")
                child.expect('sftp>')
                print("Files:", child.before)
                child.sendline("bye")
                sys.exit(0)
            else:
                print(f"SFTP password denied for {u}")
    except Exception as e:
        print(f"SFTP failed for {u}: {e}")

print("\n❌ Main user tests completed.")
