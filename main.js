// Wait for the document to be fully loaded before running the script
document.addEventListener("DOMContentLoaded", function() {

    function valueSetter(){
        gsap.set("#nav a", {
            y: "-100%",
            opacity: 0,
        });
        gsap.set("#home .parent .child", {
            y: "100%",
        });
        gsap.set("#home .row img", {
            opacity: 0,
        });

        document.querySelectorAll("#Visual path, #Visual polyline").forEach(function (path) {
            path.style.strokeDasharray = path.getTotalLength() + 'px';
            path.style.strokeDashoffset = path.getTotalLength() + 'px';
        });
    }

    function revealToSpan(){
        document.querySelectorAll(".reveal").forEach(function(elem){
            //create two spans
            var parent = document.createElement("span");
            var child = document.createElement("span");
            
            //parent and child both sets their respective classes
            parent.classList.add("parent");
            child.classList.add("child");
            //span parent gets child  and child gets elem details
            child.innerHTML = elem.innerHTML;
            parent.appendChild(child);
    
            //elem replaces its value with parent span
            elem.innerHTML = "";
            elem.appendChild(parent);
    
        });
    }

    function loadAnimation(){
        var tl = gsap.timeline();

        tl
        .from("#loader .child span", {
            x: 100,
            delay: 0.1,
            stagger: 0.2,
            duration: 1.4,
            ease: Power3.easeInOut
        })
        .to(
            "#loader .parent .child", {
                y: "-100%",
                duration: 1,
                ease: Circ.easeInOut
        })
        .to(
            "#loader", {
                height: 0,            
                duration: 1,            
                ease: Expo.easeInOut
            }
        )
        .to(
            "#green", {
                height: "0",
                top: 0,
                duration: 1.2,
                delay: -.8,
                ease: Expo.easeInOut,
                onComplete: function() {
                    animateHomePage();
                }
            }
        );
        // .to(
        //     "#green", {
        //         height: 0,
        //         top: 0,
        //         duration: 0.8,
        //         delay: -.25,
        //         ease: Expo.easeInOut
        //     }
        // );
    }
    
    function animateSvg() {
        gsap.to("#Visual path, #Visual polyline", {
             strokeDashoffset: 0,
             duration: 1.5,
             ease: Expo.Power3,
         });
    }

    function animateHomePage(){
        var tl = gsap.timeline();

        tl
        .to("#nav a", {
            y: 0,
            opacity: 1,
            stagger: 0.05,
            ease: Expo.easeInOut
        })
        .to("#home .parent .child", {
            y:0,
            stagger: 0.1,
            delay:-1,
            duration: 1.5,
            ease: Expo.easeInOut,
        })
        .to("#home .row img", {
            opacity:1,
            ease: Expo.easeInOut,
            delay: -1,
            onComplete: function(){
                animateSvg();
            }
        })
    }
   
    function locoInitialize() {
        const scroll = new LocomotiveScroll({
            el: document.querySelector('#main'),
            smooth: true
        });
    }
    
    // function cardShow(){
    //     document.getElementsByClassName(".cnt")
    //     .forEach(function(cnt){
    //         cnt.addEventListener("mousemove", function(dets){
    //             document.getElementById("#cursor").style.opacity = 1;
    //             document.getElementById("#cursor").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px)`;
    //         })
    //     })
    // }
    
    
    

    function cardShow(){
        document.querySelectorAll(".cnt")
        .forEach(function(cnt){
            cnt.addEventListener("mousemove", function(dets){
                document.querySelector("#cursor").children[dets.target.dataset.index].style.opacity = 1;
                document.querySelector(".projectImg").style.filter = "grayscale()";
                document.querySelector(".projectImg").style.transition = "all 0.5s";
                document.querySelector("#before").children[dets.target.dataset.index].style.backgroundColor = "#b4bacf";
                document.querySelector("#before").children[dets.target.dataset.index].style.transition = "all 0.5s";
                document.querySelector("#cursor").children[dets.target.dataset.index].style.transform = `translate(${dets.clientX}px, ${dets.clientY}px)`;
                console.log(document.querySelector("#cursor").children[dets.target.dataset.index].style.transform = `translate(${dets.clientX}px, ${dets.clientY}px)`);
            });
            
    })
    }
    function cardHide(){
        document.querySelectorAll(".cnt")
        .forEach(function(cnt){
            cnt.addEventListener("mouseout", function(dets){
                document.querySelector("#cursor").children[dets.target.dataset.index].style.opacity = 0;
                document.querySelector(".projectImg").style.filter = "none";
                document.querySelector("#before").children[dets.target.dataset.index].style.backgroundColor = "#f2f2f2";
                // document.querySelector("#cursor").children[dets.target.dataset.index].style.transform = `translate(${dets.clientX}px, ${dets.clientY}px)`;
                // console.log(document.querySelector("#cursor").children[dets.target.dataset.index].style.transform = `translate(${dets.clientX}px, ${dets.clientY}px)`);
            });
        })
    }

    document.getElementById('contactForm').addEventListener('submit', function(event) {
        event.preventDefault();
    
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        const formResponse = document.getElementById('formResponse');
    
        if (name && email && message) {
            formResponse.textContent = 'Thank you! Your message has been sent.';
            formResponse.style.display = 'block';
            formResponse.style.color = '#28a745';
            document.getElementById('contactForm').reset();
    
            setTimeout(() => {
                formResponse.style.display = 'none';
            }, 5000);
        } else {
            formResponse.textContent = 'Please fill in all fields.';
            formResponse.style.display = 'block';
            formResponse.style.color = '#dc3545';
        }
    });
    
    function adjustCircleSize() {
        const circle = document.querySelector('.background-circle');
        const contactSection = document.getElementById('contact');
    
        if (circle && contactSection) {
            const scrollPosition = window.scrollY;
            const sectionTop = contactSection.offsetTop;
            const sectionHeight = contactSection.offsetHeight;
            const windowHeight = window.innerHeight;
    
            // Calculate the distance from the top of the contact section to the bottom of the viewport
            const distanceToSectionBottom = sectionTop + sectionHeight - scrollPosition;
    
            // Calculate scale based on the distance from the bottom of the contact section to the viewport bottom
            let scaleValue = distanceToSectionBottom / (sectionHeight + windowHeight);
    
            // Ensure scaleValue is between 0.5 and 1 (adjust as needed)
            // scaleValue = Math.max(scaleValue, 0.5);
            scaleValue = Math.min(scaleValue, 0.5);
    
            // Apply the scale to width and height of the circle
            circle.style.width = `${100 * scaleValue}vw`;
            circle.style.height = `${100 * scaleValue}vw`;
        }
    }
    

    window.addEventListener('scroll', adjustCircleSize); 
    
    revealToSpan();
    valueSetter();
    loadAnimation();
    locoInitialize();
    cardShow();
    cardHide();
});


 // function animateSvg() {
    //     document.querySelectorAll("#Visual>g").forEach(function (e) {
    //         var character = e.childNodes[1].e.childNodes[1];
    //         character.style.strokeDasharray = character.getTotalLength() + 'px';
    //         character.style.strokeDashoffset = character.getTotalLength() + 'px';
    //     })

    //     gsap.to("#Visual>g>g>path, #Visual>g>g>polyline", {
    //         strokeDashoffset: 0,
    //         duration: 2,
    //         ease: Expo.easeInOut,
    //         delay: 2
    //     })
    //}

// gsap.from("g path", {
//     strokeDasharray: 64.68521881103516,
//     strokeOffset: 64.68521881103516,
//     duration: 1,
//     ease: Power3
// });



    // let hoverHome = document.querySelector(".home");

    // let animation = gsap.to(".home", {
    //     fontSize: "2.5vw",
    //     duration: 0.5,
        
    // });

    // hoverHome.addEventListener("mouseenter", () => animation.play());
    // hoverHome.addEventListener("mouseleave", () => animation.reverse());

//   // Select all navigation links
// var navLinks = document.querySelectorAll("#home #nav a");

// // Add event listeners to each navigation link
// navLinks.forEach(function(navLink) {
//     var hoverTl = gsap.timeline({ paused: true }); // Create a GSAP timeline for each link

//     // Add animations to the timeline
//     hoverTl.to(navLink, {
//         fontSize: "2.5vw", // Increase font size on hover
//         duration: 0.5, // Animation duration
//         ease: Power1.easeInOut // Easing function
//     }).eventCallback("onStart", function() {
//         // Set the scale of all other icons to 1
//         navLinks.forEach(function(otherNavLink) {
//             if (otherNavLink !== navLink) {
//                 gsap.set(otherNavLink, { scale: 1 });
//             }
//         });
//     });

//     navLink.addEventListener("mouseenter", function() {
//         hoverTl.play(); // Play the GSAP timeline on mouse enter
//     });

//     navLink.addEventListener("mouseleave", function() {
//         hoverTl.reverse(); // Reverse the GSAP timeline on mouse leave
//     });

// });



