(function( $ ) {

    //
    // Nusu Alabuğa - 2017
    // Animation Revealer
    //
    // github.com/nusu
    //

    //
    // SAMPLE USAGE
    //
    // <body class="animated">
    //     <div class="container animate">
    //         <div class="element-speed ae-1"></div>
    //         <div class="element-speed ae-2 fromBottom"></div>
    //     </div>
    // </body>
    //
    // JS
    //
    // if( $(".animate").length > 0 ) $.fn.nuscroll();


    $.fn.nuscroll = function() {

        //get viewport size
        var windowHeight = $(window).height(),
            windowWidth = $(window).width(),
            initialScroll = $(window).scrollTop(),
            items = $(".animate"),
            scroll;
            window.effectSpeed = 800;
            window.cleanupDelay = 1450;

        // first run
        scroll = $(window).scrollTop();

        //show anything that is now in view (scroll + windowHeight)
        items.each( function(){
            if($(this).offset().top <= (scroll + windowHeight)){
                var elem = $(this);
                $(this).addClass('active');


                setTimeout(function(){
                   
                    elem.find("[class*='ae-']").addClass('done');
                
                }, window.effectSpeed + window.cleanupDelay );


            }
        });

        //on scroll
        $(window).scroll(function (event) {

            //get the current scroll position
            scroll = $(window).scrollTop();

            //show anything that is now in view (scroll + windowHeight)
            items.each( function(){
                if($(this).offset().top <= (scroll + windowHeight)){
                    var elem = $(this);
                    $(this).addClass('active');


                    setTimeout(function(){
                       
                        elem.find("[class*='ae-']").addClass('done');
                    
                    }, window.effectSpeed + window.cleanupDelay );


                }
            });

        });

        return this;

    };



}( jQuery ));
