'use strict';
const userNameInput = document.getElementById('user-name');
const assesmentButton = document.getElementById('assessment');
const resultDivision = document.getElementById('result-area');
const tweetDivision = document.getElementById('tweet-area');

assesmentButton.onclick = function() {
  const userName = userNameInput.value;
  if(userName.length !== 0){
    resultDivision.innerText =''; //作成前にタグを空にする
    console.log(userName);
    const header = document.createElement('h3');//h3タグを作る
    header.innerText = '診断結果';//中身の文章の設定
    resultDivision.appendChild(header);//divの子要素として追加
    const paragraph = document.createElement('p');//pタグを作る
    const result = assesment(userName);//診断結果を取得
    paragraph.innerText = result;
    resultDivision.appendChild(paragraph);

    //ツイートエリアの作成
    tweetDivision.innerText ='';
    const anchor = document.createElement('a');
    const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag=あなたのいいところ&ref_src=twsrc%5Etfw';
    anchor.setAttribute('href',hrefValue);
    anchor.setAttribute('class','twitter-hashtag-button');
    anchor.setAttribute('data-text',result);
    anchor.innerText = 'Tweet #あなたのいいところ';

    tweetDivision.appendChild(anchor);

    const script = document.createElement('script');
    script.setAttribute('src','https://platform.twitter.com/widgets.js');
    tweetDivision.appendChild(script);

  }else{
    console.log('入力なし');
    return;//処理終了
  }
}


const answers = [
  '###userName###のいいところは声です。###userName###の特徴的な声は皆を惹きつけ、心に残ります。',
  '###userName###のいいところはまなざしです。###userName###に見つめられた人は、気になって仕方がないでしょう。',
  '###userName###のいいところは情熱です。###userName###の情熱に周りの人は感化されます。',
  '###userName###のいいところは厳しさです。###userName###の厳しさがものごとをいつも成功に導きます。',
  '###userName###のいいところは知識です。博識な###userName###を多くの人が頼りにしています。',
  '###userName###のいいところはユニークさです。###userName###だけのその特徴が皆を楽しくさせます。',
  '###userName###のいいところは用心深さです。###userName###の洞察に、多くの人が助けられます。',
  '###userName###のいいところは見た目です。内側から溢れ出る###userName###の良さに皆が気を惹かれます。',
  '###userName###のいいところは決断力です。###userName###がする決断にいつも助けられる人がいます。',
  '###userName###のいいところは思いやりです。###userName###に気をかけてもらった多くの人が感謝しています。',
  '###userName###のいいところは感受性です。###userName###が感じたことに皆が共感し、わかりあうことができます。',
  '###userName###のいいところは節度です。強引すぎない###userName###の考えに皆が感謝しています。',
  '###userName###のいいところは好奇心です。新しいことに向かっていく###userName###の心構えが多くの人に魅力的に映ります。',
  '###userName###のいいところは気配りです。###userName###の配慮が多くの人を救っています。',
  '###userName###のいいところはその全てです。ありのままの###userName###自身がいいところなのです。',
  '###userName###のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる###userName###が皆から評価されています。',
];
/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果
 */

function assesment(userName){
  // ToDo
  let sumOfCharCode = 0;
  for(let i = 0; i < userName.length; i++){
    sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
  }
  //文字コード番号の合計を回答の数を割って添え字の数値を求めます
  const index = sumOfCharCode % answers.length;
  const result = answers[index];
  const resultUserName = result.replaceAll('###userName###' , userName)

  return resultUserName;
}
console.log(assesment('太郎'));
console.log(assesment('次郎'));
console.log(assesment('太郎'));

console.assert(
  assesment('太郎') === '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。'
) ;

console.assert(
  assesment('太郎') === assesment('太郎'),'同じ名前で診断した場合に同じ名前になっていません'
);

userNameInput.onkeydown = function(event){
  if(event.key === 'Enter'){
    assesmentButton.onclick();//ボタンをクリックしたときと同じ処理を実行
  
  }
}