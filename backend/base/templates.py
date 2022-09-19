def generate_verification_template(username, verification_link):
    return f"""\
        <!DOCTYPE html>
        <html lang="en">

        <body>
            <div class="logo">
                <img src="https://cdn.discordapp.com/attachments/998476258360955015/1002077988617191515/Frame_4.png" alt=""
                    style="width:250px; display: block; margin-left: auto; margin-right: auto;">
            </div>
            <h1 style="text-align: center;">Welcome to CeramicArt</h1>
            <p style="text-align: center;">You are just one click away from getting started with CeramicArt. All you need to do
                is
                to verify your email address to activate your account </p>
            <div class="button"
                style="display: block; background-color: black; width: fit-content; padding: 10px 60px; margin-left: auto; margin-right: auto; cursor: pointer;">
                <a href="{verification_link}" style="color: white; text-decoration: none;">VERIFY YOUR ACCOUNT</a>
            </div>
            <p style="text-align: center;">This email was intended for <span
                    style="color:green; font-weight: bold;">{username}</span>, which is associated with a ceramicart.ge account
            </p>
            <p style="text-align: center;">© 2022 by CeramicArt. All Rights Reserved</p>
        </body>

        </html>"""
