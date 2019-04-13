#!/bin/bash
# CF_API_KEY and CF_API_EMAIL must be set in the environment for FlareCTL
# GSUtil must be authenticated with GCloud or Default Application Credentials
# Uses positional arguments - first is the DNS entry, and the second is the Domain
# Example: ./deploy.sh dev-web realeyes.dev
set -ex

CNAME=$1
DOMAIN=$2

# CNAME="dev-web"
# DOMAIN="realeyes.dev"
BUCK="${CNAME}.${DOMAIN}"

gsutil mb gs://${BUCK} || echo "Bucket already exists"
gsutil iam ch allUsers:objectViewer gs://${BUCK}
gsutil -m rsync -r -d -c dist/ gs://${BUCK}
gsutil web set -m index.html -e 404.html gs://${BUCK}
flarectl dns create --zone $DOMAIN --name $CNAME --content c.storage.googleapis.com --type CNAME --ttl "1" --proxy || echo "DNS already created"
flarectl zone purge --zone $DOMAIN --everything