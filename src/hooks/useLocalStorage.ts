
// {
//   likes:{
//     1234:true
//   }
// }


export default function useLocalStorage(){
  let siteData;
  function setData(key, value){
    siteData[key] = value;
    localStorage.setItem("siteData",JSON.stringify(siteData));
  }

  function getData(key){
    if(siteData){
      let value = localStorage.getItem("siteData")||"{}";
      siteData = JSON.parse(value);
    }
    return siteData[key]
  }

  function isLiked(postId){
    let likes = getData("likes")
    return likes[postId];
  }

  function toggleLike(postId){
    let likes = getData("likes")
    likes[postId]  = !likes[postId];
    setData('likes', likes);
    return likes[postId];
  }

  return{
    setData,
    getData,
    isLiked,
    toggleLike,
  }
}
