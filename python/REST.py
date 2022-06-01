#!/usr/bin/env python3

import requests

resp = requests.get('https://api.waziup.io/api/v2/devices/SM2222');
print(resp.json())
