import requests

apiKey = "FCDBCD4DE11A4907B16E56512B277FCC"
apiSecret = "9E1A4ADDB66D47C89E0D911078565618"


def justPay(amount, orderID, language):
    url = "https://payze.io/api/v1"

    payload = {
        "method": "justPay",
        "apiKey": apiKey,
        "apiSecret": apiSecret,
        "data": {
            "amount": amount,
            "currency": "GEL",
            "callback": "https://66be-5-152-125-16.ngrok-free.app/order/" + str(orderID),
            "callbackError": "https://www.facebook.com/profile.php?id=100071892284909",
            "preauthorize": False,
            "lang": language,
            "hookUrl": "https://corp.com/payze_hook?authorization_token=token",
            "hookUrlV2": "https://66be-5-152-125-16.ngrok-free.app/api/orders/payment/status/",
            "hookRefund": False
        }
    }

    headers = {
        "accept": "application/json",
        "content-type": "application/json"
    }

    response = requests.post(url, json=payload, headers=headers)

    return response.json()


def transactionInformation(transactionID):
    url = "https://payze.io/api/v1"

    payload = {
        "method": "getTransactionInfo",
        "apiKey": apiKey,
        "apiSecret": apiSecret,
        "data": {"transactionId": transactionID}
    }
    headers = {
        "accept": "application/json",
        "content-type": "application/json"
    }

    response = requests.post(url, json=payload, headers=headers)

    if response.status_code == 200:
        payment_info = response.json()
        return payment_info['response']['status'] == 'Committed'
    else:
        return False
