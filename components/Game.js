AFRAME.registerComponent("game-play",{
    schema:{
        elementId : {type: "string", default: "#ring1"}
    },

    init:function(){
        var duration = 120
        const timerEl = document.querySelector("#timer")
        this.startTimer(duration, timerEl)
    },

    isCollided:function(elementId){
        const element = document.querySelector(elementId)

        element.addEventListener("collide", e=>{
        //includes() finds whether the one string is the part of the other string value

        if(elementId.includes("#ring")){
           console.log(elementId+"collision")
           element.setAttribute("visible", false )
           this.updateScore()
           this.updateTargets()
        }
        else if(elementId.includes("#bird")){
            console.log(elementId+"collision")
            this.gameOver()
            
        }
        })
    },
    update:function(){
        this.isCollided(ths.data.elementId)
    },
    
    startTimer:function(duration, timerEl){
        //parseInt() is the JavaScript function which can be used to convert any string to integer numbers.
        var minutes, seconds
        setInterval( ()=>{
            if(duration>=0){
                minutes = parseInt(duration/60)
                seconds = parseInt(duration%60)
                
                if(minutes < 10){
                    minutes = "0" + minutes
                }
                
                if(seconds < 10){
                    seconds = "0" + seconds
                }
                timerEl.setAttribute("text",{value:minutes + ":" + seconds} )
                duration -= 1
            }
            else {this.gameOver()}
        }, 1000  )
    },

    updateTargets:function(){
        const element = document.querySelector("#targets")
        var count = element.getAttribute("text").value
        var currentTargets = parseInt(count)
        currentTargets -= 1
        element.setAttribute("text",{value:currentTargets})
    },

    updateScore:function(){
        const element = document.querySelector("#score")
        var count = element.getAttribute("text").value
        var currentScore = parseInt(count)
        currentScore += 50
        console.log(currentScore)
        element.setAttribute("text",{value:currentScore})
    },

    gameOver:function(){
        var planeEl = document.querySelector("#plane_model")
        var element = document.querySelector("#game_over_text")
        element.setAttribute("visible", true)
        planeEl.setAttribute("dynamic-body", {mass: 1})
    }


})