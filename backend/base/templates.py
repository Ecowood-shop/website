def generate_verification_template(username, verification_link):
    return f"""\
        <!DOCTYPE html>
        <html lang="en">

        <body>
            <div class="logo">
                <img src="/altax.png" alt=""
                    style="width:250px; display: block; margin-left: auto; margin-right: auto;">
            </div>
            <h1 style="text-align: center;">Hi {username},</h1>
            <p style="text-align: center;">Thanks for getting started with our shop! 
                We need a little more information to complete your registration, including a confirmation of your email address.
                
            <div class="button" style="display: block; background-color: black; width: fit-content; padding: 10px 
            60px; margin-left: auto; margin-right: auto; cursor: pointer;"> <a href="{verification_link}" 
            style="color: white; text-decoration: none;">VERIFY YOUR ACCOUNT</a> 
            </div>
            <p style="text-align: center;">This email was intended for <span
                    style="color:green; font-weight: bold;">{username}</span>, which is associated with a altax.ge account
            </p>
            <p style="text-align: center;">© 2022 by Altax. All Rights Reserved</p>
        </body>

        </html>"""


def password_reset_template(username, verification_link):
    return f"""\
        <!DOCTYPE html>
        <html lang="en">

        <body>
            <div class="logo">
                <img src="/altax.png" alt=""
                    style="width:250px; display: block; margin-left: auto; margin-right: auto;">
            </div>
            <h1 style="text-align: center;">Hi {username},</h1>
            <p style="text-align: center;">
            <div class="button" style="display: block; background-color: black; width: fit-content; padding: 10px 
            60px; margin-left: auto; margin-right: auto; cursor: pointer;"> <a href="{verification_link}" 
            style="color: white; text-decoration: none;">Reset Your Password</a> 
            </div>
            <p style="text-align: center;">This email was intended for <span
                    style="color:green; font-weight: bold;">{username}</span>, which is associated with a altax.ge account
            </p>
            <p style="text-align: center;">© 2022 by Altax. All Rights Reserved</p>
        </body>

        </html>"""


def order_details_template(user, order, orderItems):
    items_html = ""
    user_info_html = ""

    for item in orderItems:
        items_html += f"""
                <tr>
                  <td style="padding: 10px;border: 1px solid #cccccc;text-align: left;">{item.product.name_geo}</td>
                  <td style="padding: 10px;border: 1px solid #cccccc;text-align: left;">{"{:.2f}".format(float(item.product.price - (item.product.price * item.product.get_discount(user).percentage / 100)))}</td>
                  <td style="padding: 10px;border: 1px solid #cccccc;text-align: left;">{item.variants.color.name}</td>
                  <td style="padding: 10px;border: 1px solid #cccccc;text-align: left;">{item.qty}</td>
                </tr>
              """

    if order.wants_delivery == True:
        user_info_html += f"""
            <div class="user-info">
                <p>მომხმარებელი: {order.shippingaddress.first_name + ", " + order.shippingaddress.last_name}</p>
                <p>მისამართი: {order.shippingaddress.address + " " + order.shippingaddress.city.location}</p>
                <p>ტელეფონის ნომერი: {order.shippingaddress.phone}</p>
                <p>მეილი: {user.email}</p>
                <hr>
                <p>ღირებულება: {"{:.2f}".format(float(order.totalPrice))}</p>
                <p>მიტანის საფასური: {"{:.2f}".format(float(order.shippingPrice))}</p>
            </div>
        """
    else:
        user_info_html += f"""
            <div class="user-info">
                <p>მომხმარებელი: {order.withoutshipping.name + ", " + order.withoutshipping.surname}</p>
                <p>პირადი ნომერი: {order.withoutshipping.personId}</p>
                <p>ტელეფონის ნომერი: {order.withoutshipping.phone}</p>
                <p>საწყობი: {order.withoutshipping.warehouse.location}</p>
                <p>მეილი: {user.email}</p>
                <hr>
                <p>ღირებულება: {"{:.2f}".format(float(order.totalPrice))}</p>
                <p>მიტანის საფასური: {"{:.2f}".format(float(order.shippingPrice))}</p>
            </div>
        """

    return f"""<!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Order Confirmation</title>

      </head>
      <body style="font-family: Arial, sans-serif;font-size: 14px;line-height: 1.5;color: #333333;background-color: #f7f7f7;margin: 0;padding: 0;">
        <div class="container" style="max-width: 600px;margin: 0 auto;padding: 20px;background-color: #ffffff;box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);border-radius: 5px;">
          <h1 style="font-size: 24px;font-weight: bold;color: #333333;margin: 0 0 20px;">Order Confirmation</h1>
            {user_info_html}
          <div class="product-list">
            <table style="width: 100%;border-collapse: collapse;margin-bottom: 20px;">
              <thead>
                <tr>
                  <th style="padding: 10px;border: 1px solid #cccccc;text-align: left;background-color: #f2f2f2;font-weight: bold;">პროდუქტი</th>
                  <th style="padding: 10px;border: 1px solid #cccccc;text-align: left;background-color: #f2f2f2;font-weight: bold;">ღირებულება</th>
                  <th style="padding: 10px;border: 1px solid #cccccc;text-align: left;background-color: #f2f2f2;font-weight: bold;">ფერი</th>
                  <th style="padding: 10px;border: 1px solid #cccccc;text-align: left;background-color: #f2f2f2;font-weight: bold;">რაოდენობა</th>
                </tr>
              </thead>
              <tbody>
                   {items_html}
              </tbody>
            </table>
            <p class="total" style="font-weight: bold;font-size: 18px;margin-top: 20px;padding-top: 20px;border-top: 2px solid #cccccc;text-align: right;">Total: {"{:.2f}".format(float(order.totalPrice) + float(order.shippingPrice))}</p>
          </div>
        </div>
      </body>
    </html>"""
