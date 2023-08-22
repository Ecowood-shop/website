import requests


def justPay(amount, orderID, language):
    url = "https://payze.io/api/v1"

    payload = {
        "method": "justPay",
        "apiKey": "FCDBCD4DE11A4907B16E56512B277FCC",
        "apiSecret": "9E1A4ADDB66D47C89E0D911078565618",
        "data": {
            "amount": amount,
            "currency": "GEL",
            "callback": "https://altax.ge/order/" + str(orderID),
            "callbackError": "https://www.facebook.com/profile.php?id=100071892284909",
            "preauthorize": False,
            "lang": language,
            "hookUrl": "https://corp.com/payze_hook?authorization_token=token",
            "hookUrlV2": "https://corp.com/payze_hook?authorization_token=token",
            "hookRefund": False
        }
    }
    headers = {
        "accept": "application/json",
        "content-type": "application/json"
    }

    response = requests.post(url, json=payload, headers=headers)

    return response.json()
