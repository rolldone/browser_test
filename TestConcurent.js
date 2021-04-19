const HeadlessChrome = require('simple-headless-chrome')
 
const browser = new HeadlessChrome({
  headless: false, // If you turn this off, you can actually see the browser navigate with your instructions,
  chrome: {
    userDataDir: null// This can be null, so a tmp folder will be created and then destroyed
  }
})
var urls = [
  'https://cdn.pixabay.com/photo/2015/06/19/21/24/avenue-815297_960_720.jpg',
  'https://media.istockphoto.com/photos/urban-road-with-green-trees-picture-id473448304',
  'https://media.istockphoto.com/photos/cherry-blossom-picture-id164484408',
  'https://media.istockphoto.com/photos/sakura-cherry-blossom-picture-id524025876',
  'https://media.istockphoto.com/photos/magic-light-in-cherry-tree-park-picture-id471771360',
  'https://media.istockphoto.com/photos/seminariepark-in-gothenburg-picture-id1143334058',
  'https://media.istockphoto.com/photos/cherry-tree-flowers-with-a-bench-in-background-picture-id53116845',
  'https://media.istockphoto.com/photos/cherry-blossoms-close-up-picture-id636467586',
  'https://media.istockphoto.com/photos/cherry-blossom-japan-picture-id510079020'
];

var sizes = [
  100,200,300,400,500,600,700,800,900,1000
];

var requester = 'http://localhost:3000/image-loader';

async function navigateWebsite() {
  try {
    await browser.init()
    for(var a=0;a<2;a++){
      for(var b=0;b<sizes.length;b++){
        browser.newTab({ privateTab: false }).then(async function(url,size,mainTab){
          await mainTab.goTo(`${requester}?size=${size}&url=${url}`);
          await mainTab.resizeFullScreen();
        }.bind(this,urls[a],sizes[b]));
        /* const htmlTag = await mainTab.evaluate(function(selector) {
            const selectorHtml = document.querySelector(selector)
            return selectorHtml.innerHTML
        }, '.main'); */
      }
    }
     // returns innerHTML of first matching selector for class "main"
    // await browser.close()
  }catch(ex){
    console.error('ex',ex);
  }
}

navigateWebsite();