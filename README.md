# EcommerceWebsiteWithApi

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.0.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Tasks:

ref : 
    https://stackblitz.com/edit/angular-searchbar?file=app%2Fapp.component.ts
    (this is better for search )

    https://primeng.org/carousel
    (for slider )

    for login ui 
    (https://stackblitz.com/edit/angular-login-and-signup-form?file=src%2Fapp%2Fauth%2Flogin%2Flogin.component.html,src%2Fstyles.css)

    The Api 
    https://dummyjson.com/docs/products


Angular ecommerce through Api 

Tasks 1 : create a product page through fetching data from the Api and by using angular material only ( https://dummyjson.com/docs/products )

Tasks 2 : create  a navbar and add search categories option ( category should be called with the Api ) 

Tasks 3 : create a custom Paginator for the product in which we have option of displaying the perticular number of product and we have next and previous button so if we click on next it will show the new product and it wont display the old product ( it should be done with limit and skip Api ) 

Tasks 4 :  and we should have reset button so if we click on Reset it should reset everything as it was before 

Tasks 5 : now when we click on the product it should display the products Details in total New Page and the images should be Auto sliding 

Task 6 : below the above task there should also display the products in horizontal line and below that we should have reviews 

Tasks 7 : now we should Have Cart And we should Perform The CRUD ( Create , remove , update , delete ) this all will be done With Local Storage 

Tasks 8 : now we should modify the product details rather then fetching from the the Api so we should store all the products in Local Storage Make sure the home page is still displaying the product With Api just product details should be displayed with the LocalStorage so now whenever someone click on Add to cart We should Have Displaying the stock Number Go down same with cart someone Update the value the Stock should also update and it should be shown in the Product Details 

Task 9 : Now create a login and sign Up page and we should Store the Data  in Local Storage and We should Perform Validation Also And add a logout in Navbar

Task 10 : Now for each User the cart should Display Individual and when the userlogin his indivual cart product should be shown if Added And the CRUD also Should work means if someone removed the cart and logout and login again it should be remove 

Task 11 : Final Tasks Now add Authguard means without login User shouldn't be able to go through product or Cart 