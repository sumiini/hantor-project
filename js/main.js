(() => {
  let yOffset = 0; //스크롤할 떄마다 변하는 pageYOffset을 저장하는 변수
  let prevScrollHeight = 0; // scroll height의 합을 저장할 변수
  let currentScene = 0; // 현재 활성화된 scene의 번호를 저장할 변수
  let enterNewScene = false; // 새로운 scene으로 바뀐 순간 true로 변경

  const sceneInfo = [
    {
      // content-section-0
      type: 'sticky',
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#content-section-0'),
        messageA: document.querySelector('#content-section-0 .main-message.a'),
        messageB: document.querySelector('#content-section-0 .main-message.b'),
        messageC: document.querySelector('#content-section-0 .main-message.c'),
        // backimg: document.querySelector('#content-section-0 .img.a'),
        canvas: document.querySelector('#image-canvas'),
        context: document.querySelector('#image-canvas').getContext('2d'),
        Images: []
      },
      values: {
        messageA_opacity_in: [0, 1, {start: 0.1, end: 0.2}], // message A의 투명도를 0에서 1로 바뀌도록 설정하기 위함
        messageA_opacity_out: [1, 0, {start: 0.3, end: 0.35}],
        messageA_translateY_in: [20, 0, {start: 0.1, end: 0.2}], // message A의 위치 살짝 이동
        messageA_translateY_out: [0, -20, {start: 0.3, end: 0.35}],

        messageB_opacity_in: [0, 1, {start: 0.4, end: 0.5}], // message B의 투명도 설정
        messageB_opacity_out: [1, 0, {start: 0.6, end: 0.65}],
        messageB_translateY_in: [20, 0, {start: 0.4, end: 0.5}], // message B의 위치 살짝 이동
        messageB_translateY_out: [0, -20, {start: 0.6, end: 0.65}],

        messageC_opacity_in: [0, 1, {start: 0.65, end: 1}], // message C의 투명도 설정
        // messageC_opacity_out: [1, 0, {start: 0.65, end: 0.7}],
        messageC_translateY_in: [20, 0, {start: 0.65, end: 1}], // message C의 위치 살짝 이동
        messageC_translateY_out: [0, -20, {start: 0.9, end: 1}],

        canvas_opacity: [0, 0.5, {start: 0, end: 1}],
        // backimg_opacity_in: [0, 0.5, {start: 0, end: 1}]

        // backimg_opacity_out: [0.3, 0, {start: 55, end: 1}],
        /*backimg_translateY_in: [20, 0, {start: 0, end: 1}],
        backimg_translateY_out: [0, -20, {start: 0.65, end: 1}]*/
      }
    },
    {
      // content-section-1
      type: 'normal',
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#content-section-1')
      }
    }
  ];

  function setCanvasImage(){
    let imgElem;

    imgElem = new Image();
    imgElem.src = `./images/img${7}.jpg`;
    sceneInfo[0].objs.Images.push(imgElem);
  }

  function checkMenu() {
    if(yOffset > 44){
      document.body.classList.add('local-nav-sticky');
    } else{
      document.body.classList.remove('local-nav-sticky');
    }
  }

  function setLayout(){
    // 각 scroll section의 높이를 세팅
    for(let i=0; i<sceneInfo.length; i++){
      if(sceneInfo[i].type === 'sticky'){
        sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
      } else if(sceneInfo[i].type === 'normal'){
        sceneInfo[i].scrollHeight = sceneInfo[i].objs.container.offsetHeight;
      }
      sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
    }
    yOffset = window.pageYOffset;
    // 새로고침 시에 현재 페이지 offset에 따라 몇 번쨰 스크롤 섹션인지 확인하기 위함
    let totalScrollHeight = 0;
    for(let i=0; i<sceneInfo.length; i++){
      totalScrollHeight += sceneInfo[i].scrollHeight;
      if(totalScrollHeight >= yOffset){
        currentScene = i;
        break;
      }
    }
    document.body.setAttribute('id', `show-scene-${currentScene}`);
    const heightRatio = window.innerHeight / 1334;
    sceneInfo[0].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
  }

  function calcValues(values, currentYOffset){
    let rv;
    // 현재 스크롤 섹션에서의 오프셋의 비율 구하기
    const scrollHeight = sceneInfo[currentScene].scrollHeight;
    const scrollRatio = currentYOffset/sceneInfo[currentScene].scrollHeight;

    if(values.length === 3){
      // start ~ end 사이의 시점에 애니메이션 실행
      const partScrollStart = values[2].start*scrollHeight;
      const partScrollEnd = values[2].end*scrollHeight;
      const partScrollHeight = partScrollEnd-partScrollStart;

      if(currentYOffset >= partScrollStart && currentYOffset <= partScrollEnd){
        rv = (currentYOffset-partScrollStart)/partScrollHeight * (values[1]-values[0]) + values[0];
      }
      else if (currentYOffset < partScrollStart) {
        rv = values[0];
      }
      else if (currentYOffset > partScrollEnd) {
        rv = values[1];
      }
    }
    else {
      rv = scrollRatio * (values[1]-values[0]) + values[0];
    }
    return rv;
  }

  function playAnimation(){
    const objs = sceneInfo[currentScene].objs;
    const values = sceneInfo[currentScene].values;
    const currentYOffset = yOffset-prevScrollHeight;
    const scrollHeight = sceneInfo[currentScene].scrollHeight;
    const scrollRatio = currentYOffset / scrollHeight;


    switch (currentScene) {
      case 0:
        objs.context.drawImage(objs.Images[0], 0, 0);
        objs.canvas.style.opacity = calcValues(values.canvas_opacity, currentYOffset);
        // if (scrollRatio <= 1) {
        //   objs.backimg.style.opacity = calcValues(values.backimg_opacity_in, currentYOffset);
        // }
        if (scrollRatio <= 0.27) {
          objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
          objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_in, currentYOffset)}%, 0)`;
        } else{
          objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
          objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_out, currentYOffset)}%, 0)`;
        }
        if (scrollRatio <= 0.57) {
          objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
          objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`;
        } else{
          objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
          objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_out, currentYOffset)}%, 0)`;
        }
        if (scrollRatio <= 1) {
          objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
          objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`;
        } else{
          // objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
          objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_out, currentYOffset)}%, 0)`;
        }
        break;
    }
  }

  function scrollLoop() {
    enterNewScene = false;
    prevScrollHeight = 0; // 스크롤 될 떄마다 for문이 4번이 반복되는데
                          // 이렇게 되는 경우 prevScrollHeight값이 기하급수적으로 증가하므로 0으로 초기화
    for(let i=0; i<currentScene; i++){
      prevScrollHeight += sceneInfo[i].scrollHeight;
    }
    if(yOffset > prevScrollHeight+sceneInfo[currentScene].scrollHeight){
      enterNewScene = true;
      currentScene++;
      // 현재 스크롤 섹션이 어딘지에 따라 body의 id 속성값을 업데이트하는 작업
      document.body.setAttribute('id', `show-scene-${currentScene}`);
    }
    if(yOffset < prevScrollHeight){
      enterNewScene = true;
      if(currentScene === 0) return;
      currentScene--;
      // 현재 스크롤 섹션이 어딘지에 따라 body의 id 속성값을 업데이트하는 작업
      document.body.setAttribute('id', `show-scene-${currentScene}`);
    }

    if (enterNewScene) return;

    playAnimation();
  }

  // 창의 세로 크기가 변할 때마다 setlayout 함수를 호출함으로써
  // 인터렉티브하게 적용될 수 있도록 창의 크기를 업데이트
  window.addEventListener('scroll', () => {
    yOffset = window.pageYOffset;
    scrollLoop();
    checkMenu();
  });
  window.addEventListener('load', setLayout);
  window.addEventListener('resize', setLayout);
  setCanvasImage();

})();
// 함수를 바로 호출
// 전역변수로 사용하지 않고 지역 변수 사용을 추천
