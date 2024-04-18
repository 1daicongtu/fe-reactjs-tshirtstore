<h1 align="center">
  <br>
  <img src="https://i.imgur.com/Hc92VcL.png" alt="" width="250">
  <br>
  T-Shirt Store
  <br>
  <h4 align="center">
    <a href="https://fe-reactjs-tshirtstore.vercel.app/">View Demo</a>
  <span> · </span>
    <a href="#contactid">Report Bug</a>
  </h4>  
</h1>

## 🚩 Table of Contents

- [Build With](#built-with)
- [Installation](#installation)
- [Features](#features)
  + [Sign in and Sign up account](#sign-in-and-sign-up-account)
  + [Quick view](#quick-view)
  + [Cart](#cart)
  + [Compare list](#compare-list)
  + [Product Detail / Review product / Statistic review](#product-detail-/-review-product-/-statistic-review)
  + [Stores / Store Detail](#store-/-store-detail)
  + [More...](#more...)
- [Contact](#contact)


### Built With

![React](https://img.shields.io/badge/react-%2320232a.svg?logo=react&logoColor=%2361DAFB&style=for-the-badge)
![React Router](https://img.shields.io/badge/React_Router-CA4245?logo=react-router&logoColor=white&style=for-the-badge)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?logo=redux&logoColor=white&style=for-the-badge)
![Axios](https://img.shields.io/badge/Axios-5A29E4.svg?style=for-the-badge&logo=Axios&logoColor=white)
![CssModule](https://img.shields.io/badge/CSS%20Modules-000000.svg?style=for-the-badge&logo=CSS-Modules&logoColor=white)
![ReactRouter](https://img.shields.io/badge/React%20Router-CA4245.svg?style=for-the-badge&logo=React-Router&logoColor=white)
![Sass](https://img.shields.io/badge/Sass-CC6699.svg?style=for-the-badge&logo=Sass&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?logo=javascript&logoColor=%23F7DF1E&style=for-the-badge)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?logo=express&logoColor=%2361DAFB&style=for-the-badge)
![Node.js ](https://img.shields.io/badge/node.js-6DA55F?logo=node.js&logoColor=white&style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?logo=mongodb&logoColor=white&style=for-the-badge)

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/nguyenhieu1435/fe-reactjs-tshirtstore
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Run app
   ```sh
   npm start

### Features
* Sign in and Sign up account
   - Users can sign in or sign up to post-review the product. More than when you sign in, you can view your cart, wishlist, and compare lists you have added in the past.
   ![image](https://github.com/nguyenhieu1435/fe-reactjs-tshirtstore/assets/70377398/b51c2b01-0317-499f-84c8-1b482c60f29d)
   ![image](https://github.com/nguyenhieu1435/fe-reactjs-tshirtstore/assets/70377398/5f5fe6a5-3500-4c72-bfee-f18c66318f0a)
   ![loginregister-tablet](https://github.com/nguyenhieu1435/fe-reactjs-tshirtstore/assets/70377398/4dbabe9d-b403-47c6-bad9-1021b7522b01)
   ![loginregister](https://github.com/nguyenhieu1435/fe-reactjs-tshirtstore/assets/70377398/4a06f053-cc68-42ee-88bf-0fc8cdceef96)
  - If you don't sign in, the application will get a wishlist, compare list, and cart in local storage. When you login, the application will save data in local storage into the server database and    clear local storage.
   ![login-success](https://github.com/nguyenhieu1435/fe-reactjs-tshirtstore/assets/70377398/6639de8b-f3c8-4e10-b607-2555c93dcf22)
* Quick view
  - You don't need to click on product details to view the product.  When you click on the QuickView icon, the application will show product details you can buy or add to your cart, which is so        convenient!
  ![image](https://github.com/nguyenhieu1435/fe-reactjs-tshirtstore/assets/70377398/bd87f3d9-deb2-4a39-b6ab-2bf857ad9de1)
  ![image](https://github.com/nguyenhieu1435/fe-reactjs-tshirtstore/assets/70377398/e535089f-f537-491b-8a06-789aed6b3455)
  ![image](https://github.com/nguyenhieu1435/fe-reactjs-tshirtstore/assets/70377398/6317a471-0197-407b-a2e3-3aae15b5321e)
  ![QuickView](https://github.com/nguyenhieu1435/fe-reactjs-tshirtstore/assets/70377398/3d7db479-1d79-45e6-be29-792e9b74b0a3)
* Cart
  - When you add a product to your cart, if you are logged in, the application will save that product to the server database; otherwise, the application will save it to local storage. You can modify products in the cart list modal.
  ![image](https://github.com/nguyenhieu1435/fe-reactjs-tshirtstore/assets/70377398/250a7d5f-4fd7-4fdb-8cf3-d8d76f0bee7e)
  ![cart](https://github.com/nguyenhieu1435/fe-reactjs-tshirtstore/assets/70377398/940a87ea-8771-402d-8443-55d7d295c572)
* Compare list
  - When you have more than one item in the compare list, you can compare the products in the compare list. The maximum length of the compare list is 4, and if you add a new item, the application will delete the oldest item.
  ![image](https://github.com/nguyenhieu1435/fe-reactjs-tshirtstore/assets/70377398/1b66912c-987b-40cf-bf10-90c2c97e7992)
  ![image](https://github.com/nguyenhieu1435/fe-reactjs-tshirtstore/assets/70377398/eb91679d-4544-4bc7-a97e-715439934123)
* Product Detail / Review product / Statistic review
  - You can post a review of the product (you don't need to sign in). If you do not sign in, you must input your name and email address to post a review. Otherwise, if you log in to the application, auto-write your name and email address. You can add images to a review. The application will perform a statistical review to show an average star for each product.
  ![image](https://github.com/nguyenhieu1435/fe-reactjs-tshirtstore/assets/70377398/1bbac070-e6d3-4d89-81a7-595beb6d1017)
  ![image](https://github.com/nguyenhieu1435/fe-reactjs-tshirtstore/assets/70377398/ca8c4f84-a07b-43cb-a89e-6abe88d24a76)
  ![image](https://github.com/nguyenhieu1435/fe-reactjs-tshirtstore/assets/70377398/4c4b938d-7a6c-473c-beab-8d4410853955)
  ![product](https://github.com/nguyenhieu1435/fe-reactjs-tshirtstore/assets/70377398/2c068c47-1581-4ef0-bf95-29a72f44ad91)
  
* Stores / Store Detail
  ![image](https://github.com/nguyenhieu1435/fe-reactjs-tshirtstore/assets/70377398/8ec6c05e-6f3f-458c-a1e1-338d559d090e)
  ![stores](https://github.com/nguyenhieu1435/fe-reactjs-tshirtstore/assets/70377398/da369509-104c-462c-b9eb-37ec80e2ed0b)
  ![image](https://github.com/nguyenhieu1435/fe-reactjs-tshirtstore/assets/70377398/1697d31d-4e87-417f-83f5-76b20703ef81)
  ![store-detail](https://github.com/nguyenhieu1435/fe-reactjs-tshirtstore/assets/70377398/282a26b8-304b-4789-b352-40e0c8302808)

* More...



### Contact
<div id="contactid"></div>
Nguyễn Văn Hiếu - hieurio12@gmail.com

Project Link: https://github.com/nguyenhieu1435/fe-reactjs-tshirtstore / https://github.com/nguyenhieu1435/tshirt-store-nodejs

[![GitHub Streak](https://github-readme-streak-stats.herokuapp.com?user=nguyenhieu1435&theme=vue-dark&date_format=j%2Fn%5B%2FY%5D)](https://git.io/streak-stats)

<img align="center" src="https://github-readme-stats.vercel.app/api?username=nguyenhieu1435&show_icons=true&include_all_commits=true&theme=cobalt&hide_border=true" alt="My github stats" /> 

<img align="center" src="https://github-readme-stats.vercel.app/api/top-langs/?username=nguyenhieu1435&layout=compact&theme=cobalt&hide_border=true" />
