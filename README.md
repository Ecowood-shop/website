# website

# TODO:
    Back
    1. CORS_ALLOWED_ORIGINS - არის დასაზუსტებელი. ამ ეტაპზე ვიყენებ CORS_ALLOW_ALL_ORIGINS, რომელიც 
        ყველას აძლევს საშუალებას HTTP-რექუესთი გამოგზავნოს. 
        (origins that are authorized to make cross-site HTTP requests. The origins in this setting will 
        be allowed, and the requesting origin will be echoed back to the client in the 
        Access-Control-Allow-Origin header).

        Fetching Data-ში განიხილავს ის ბიჭი ამ მონაკვეთს 

    2. ბაზაში default ად რო სურათს იმიჯი მიცეს ეს უნდა ჩასწორდეს მოდელებში 
       image = models.ImageField(null=True, blank=True, default='/placeholder.png')

    3. Products - როცა ვამატებ Discount - არის required, მიუხედავად იმისა რო nullable მაქ მითითებული

    4. View-ში Login-ისას წვდომა მაქ დაუშიფრავ პაროლებზე და ეგრე უნდა იყოს?
