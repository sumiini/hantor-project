(()=>{

    let yOffset = 0;
    let prevScrollHeight = 0;
  
    const sceneInfo = [
      {
        type: 'normal',
        heightNum: 2,
        scrollHeight: 0,
        objs: {
          container: document.querySelector('.notice-content-section')
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
        
        sceneInfo[0].scrollHeight = sceneInfo[0].objs.container.offsetHeight;
        yOffset = window.pageYOffset;
  
        let totalScrollHeight = 0;
        totalScrollHeight += sceneInfo[0].scrollHeight;
        currentScene = 0;
    }
  
    function scrollLoop() {
      enterNewScene = false;
      prevScrollHeight = 0;
      prevScrollHeight += sceneInfo[0].scrollHeight;
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
  