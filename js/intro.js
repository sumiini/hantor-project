(()=>{

  let yOffset = 0;
  let prevScrollHeight = 0;

  const sceneInfo = [
    {
      type: 'normal',
      heightNum: 2,
      scrollHeight: 0,
      objs: {
        container: document.querySelector('.intro-content-section')
      },
      values: {}
    }
  ];
  function checkMenu() {
    if(yOffset > 44){
      document.body.classList.add('local-menu-sticky');
    } else{
      document.body.classList.remove('local-menu-sticky');
    }
  }

  function setLayout(){

    for(let i=0; i<sceneInfo.length; i++){
      if(sceneInfo[i].type === 'sticky'){
        sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
      } else if(sceneInfo[i].type === 'normal'){
        sceneInfo[i].scrollHeight = sceneInfo[i].objs.container.offsetHeight;
      }
      sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
    }
    yOffset = window.pageYOffset;

    let totalScrollHeight = 0;
    for(let i=0; i<sceneInfo.length; i++){
      totalScrollHeight += sceneInfo[i].scrollHeight;
      if(totalScrollHeight >= yOffset){
        currentScene = i;
        break;
      }
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
  }

  window.addEventListener('load', ()=>{
    setLayout();

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

})();
