#!/usr/bin/python
from OpenSSL import crypto
import os
import sys
import datetime
import whois

#Variables
TYPE_RSA = crypto.TYPE_RSA
TYPE_DSA = crypto.TYPE_DSA
HOME = os.getenv("HOME")
now = datetime.datetime.now()
d = now.date()

#Pull these out of scope
cn = input("Enter the Domain: ")
key = crypto.PKey()
keypath = HOME + "/" + cn + '-' + str(d) + '.key'
csrpath = HOME + "/" + cn + '-' + str(d) + '.csr'
crtpath = HOME + "/" + cn + '-' + str(d) + '.crt'

#Generate the key


def generatekey():

    if os.path.exists(keypath):
        print("Certificate file exists, aborting.")
        print(keypath)
        sys.exit(1)
    #Else write the key to the keyfile
    else:
        print("Generating Key Please standby")
        key.generate_key(TYPE_RSA, 4096)
        f = open(keypath, "wb")
        f.write(crypto.dump_privatekey(crypto.FILETYPE_PEM, key))
        f.close()

    #return key

generatekey()

#Generate CSR

def generatecsr():
    c = 'CN'
    st = 'Liao'
    l = 'dalian'
    o = 'test'
    ou = 'test'

    req = crypto.X509Req()
    req.get_subject().CN = cn
    req.get_subject().C = c
    req.get_subject().ST = st
    req.get_subject().L = l
    req.get_subject().O = o
    req.get_subject().OU = ou
    req.set_pubkey(key)
    req.sign(key, "sha256")

    if os.path.exists(csrpath):
        print ("Certificate File Exists, aborting.")
        print (csrpath)
    else:
        f = open(csrpath, "wb")
        f.write(crypto.dump_certificate_request(crypto.FILETYPE_PEM, req))
        f.close()
        print("Success")
    '''
    print ("How would you like to generate csr data?\n" \
          "1) CQB (For Self-Signed Certs).\n" \
          "2) Specify your own.\n" \
          "3) Attempt Whois Look")

    option = input("Choose (1/2/3): ")
    if option == 1:
        c = 'CN'
        st = 'Liao'
        l = 'dalian'
        o = 'test'
        ou = 'test'
    elif option == 2:
        c = input('Enter your country(ex. US): ')
        st = input("Enter your state(ex. Nevada): ")
        l = input("Enter your location(City): ")
        o = input("Enter your organization: ")
        ou = input("Enter your organizational unit(ex. IT): ")
    else:
        print("Attempting WHOIS Lookup")
        w = whois.whois(cn)
        c = str(w.get('country'))
        st = str(w.get('state')).lower().title()
        l = str(w.get('city')).lower().title()
        o = str(w.get('org')).lower().title()
        ou = 'Network Operations'
    '''


#Generate the certificate
    reply = str(input('Is this a Self-Signed Cert (y/n): ')).lower().strip()

    if reply[0] == 'y':
        cert = crypto.X509()
        cert.get_subject().CN = cn
        cert.get_subject().C = c
        cert.get_subject().ST = st
        cert.get_subject().L = l
        cert.get_subject().O = o
        cert.get_subject().OU = ou
        cert.set_serial_number(1000)
        cert.gmtime_adj_notBefore(0)
        cert.gmtime_adj_notAfter(315360000)
        cert.set_issuer(cert.get_subject())
        cert.set_pubkey(key)
        cert.sign(key, "sha256")

        if os.path.exists(crtpath):
            print ("Certificate File Exists, aborting.")
            print (crtpath)
        else:
            f = open(crtpath, "wb")
            f.write(crypto.dump_certificate(crypto.FILETYPE_PEM, cert))
            f.close()
            print ("CRT Stored Here :" + crtpath)
generatecsr()

print ("Key Stored Here :" + keypath)
print ("CSR Stored Here :" + csrpath)


#Generate the pem
TYPE_RSA = crypto.TYPE_RSA
TYPE_DSA = crypto.TYPE_DSA

def createKeyPair(type, bits):
    """
      Create a public/private key pair.
      Arguments: type - Key type, must be one of TYPE_RSA and TYPE_DSA
           bits - Number of bits to use in the key
      Returns:   The public/private key pair in a PKey object
    """
    pkey = crypto.PKey()
    pkey.generate_key(type, bits)
    return pkey

def createCertRequest(pkey, digest="md5", **name):
    """
      Create a certificate request.
      Arguments: pkey   - The key to associate with the request
           digest - Digestion method to use for signing, default is md5
           **name - The name of the subject of the request, possible
                    arguments are:
                      C     - Country name
                      ST    - State or province name
                      L     - Locality name
                      O     - Organization name
                      OU    - Organizational unit name
                      CN    - Common name
                      emailAddress - E-mail address
      Returns:   The certificate request in an X509Req object
    """
    req = crypto.X509Req()
    subj = req.get_subject()

    for (key, value) in name.items():
        setattr(subj, key, value)

    req.set_pubkey(pkey)
    req.sign(pkey, digest)
    return req

def createCertificate(req, issuerCertKey, serial, validityPeriod, digest="sha256"):

    """
       Generate a certificate given a certificate request.
       Arguments: req        - Certificate request to use
           issuerCert - The certificate of the issuer
           issuerKey  - The private key of the issuer
           serial     - Serial number for the certificate
           notBefore  - Timestamp (relative to now) when the certificate
                        starts being valid
           notAfter   - Timestamp (relative to now) when the certificate
                        stops being valid
           digest     - Digest method to use for signing, default is sha256
     Returns:   The signed certificate in an X509 object
    """
    issuerCert, issuerKey = issuerCertKey
    notBefore, notAfter = validityPeriod
    cert = crypto.X509()
    cert.set_serial_number(serial)
    cert.gmtime_adj_notBefore(notBefore)
    cert.gmtime_adj_notAfter(notAfter)
    cert.set_issuer(issuerCert.get_subject())
    cert.set_subject(req.get_subject())
    cert.set_pubkey(req.get_pubkey())
    cert.sign(issuerKey, digest)
    return cert


if __name__ == "__main__":
    cakey = createKeyPair(TYPE_RSA, 1024)
    careq = createCertRequest(cakey, CN='Certificate Authority')
    cacert = createCertificate(careq, (careq, cakey),0, (0, 60 * 60 * 24 * 365))  # one year
    open('clientkey.pem', 'wb').write(crypto.dump_privatekey(crypto.FILETYPE_PEM, cakey, passphrase='12345678'))
    open('clientcert.pem', 'wb').write(crypto.dump_certificate(crypto.FILETYPE_PEM, cacert))
