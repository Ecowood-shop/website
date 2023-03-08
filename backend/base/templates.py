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
