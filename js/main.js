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
        messageD: document.querySelector('#content-section-0 .main-message.d'),
        canvas: document.querySelector('#image-canvas'),
        context: document.querySelector('#image-canvas').getContext('2d'),
        Images: []
      },
      values: {
        messageA_opacity_in: [0, 1, {start: 0.1, end: 0.2}], 
        messageA_opacity_out: [1, 0, {start: 0.25, end: 0.3}],
        messageA_translateY_in: [20, 0, {start: 0.1, end: 0.2}],
        messageA_translateY_out: [0, -20, {start: 0.25, end: 0.3}],

        messageB_opacity_in: [0, 1, {start: 0.35, end: 0.45}],
        messageB_opacity_out: [1, 0, {start: 0.5, end: 0.55}],
        messageB_translateY_in: [20, 0, {start: 0.35, end: 0.45}],
        messageB_translateY_out: [0, -20, {start: 0.5, end: 0.55}],
        
        messageC_opacity_in: [0, 1, {start: 0.6, end: 0.7}],
        messageC_opacity_out: [1, 0, {start: 0.75, end: 0.8}],
        messageC_translateY_in: [20, 0, {start: 0.6, end: 0.7}],
        messageC_translateY_out: [0, -20, {start: 0.75, end: 0.8}],

        messageD_opacity_in: [0, 1, {start: 0.85, end: 1}],
        messageD_translateY_in: [20, 0, {start: 0.85, end: 1}],
        messageD_translateY_out: [0, -20, {start: 0.9, end: 1}],

        canvas_opacity: [0, 0.6, {start: 0, end: 1}]
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
      document.body.classList.add('local-menu-sticky');
    } else{
      document.body.classList.remove('local-menu-sticky');
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
    sceneInfo[0].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio*1.25})`;
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

        if (scrollRatio <= 0.22) {
          objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
          objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_in, currentYOffset)}%, 0)`;
        } else{
          objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
          objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_out, currentYOffset)}%, 0)`;
        }

        if (scrollRatio <= 0.47) {
          objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
          objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`;
        } else{
          objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
          objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_out, currentYOffset)}%, 0)`;
        }

        if (scrollRatio <= 0.72) {
          objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
          objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`;
        } else{
          objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
          objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_out, currentYOffset)}%, 0)`;
        }

        if (scrollRatio <= 1) {
          objs.messageD.style.opacity = calcValues(values.messageD_opacity_in, currentYOffset);
          objs.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD_translateY_in, currentYOffset)}%, 0)`;
        } else{
          objs.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD_translateY_out, currentYOffset)}%, 0)`;
        }
        break;
    }
  }

  function scrollLoop() {
    enterNewScene = false;
    prevScrollHeight = 0;
    for(let i=0; i<currentScene; i++){
      prevScrollHeight += sceneInfo[i].scrollHeight;
    }

    if(yOffset > prevScrollHeight+sceneInfo[currentScene].scrollHeight){
      enterNewScene = true;
      currentScene++;
      document.body.setAttribute('id', `show-scene-${currentScene}`);
    }

    if(yOffset < prevScrollHeight){
      enterNewScene = true;
      if(currentScene === 0) return;
      currentScene--;
      document.body.setAttribute('id', `show-scene-${currentScene}`);
    }

    if (enterNewScene) return;

    playAnimation();
  }
  // 창의 세로 크기가 변할 때마다 setlayout 함수를 호출함으로써
  // 인터렉티브하게 적용될 수 있도록 창의 크기를 업데이트
  window.addEventListener('load', ()=>{
    setLayout();

    let tempYOffset = yOffset;
    let tempScrollCount = 0;

    if(yOffset > 0){
      let siId = setInterval(() => {
        window.scrollTo(0, tempYOffset);
        tempYOffset+=5;
  
        if(tempScrollCount > 20){
          clearInterval(siId);
        }
        tempScrollCount++;
      }, 20);
    }

    window.addEventListener('scroll', () => {
      yOffset = window.pageYOffset;
      scrollLoop();
      checkMenu();
    });

    window.addEventListener('resize', ()=>{
      if(window.innerWidth > 900){
        window.location.reload();
      }
  
    });
  
    window.addEventListener('orientationchange', ()=>{
      scrollTo(0, 0);
      setTimeout(()=>{
        window.location.reload();
      });
    });
  });
  setCanvasImage();
})();
// 함수를 바로 호출
// 전역변수로 사용하지 않고 지역 변수 사용을 추천
