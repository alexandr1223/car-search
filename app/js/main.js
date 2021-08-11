document.addEventListener("DOMContentLoaded", function(event) {

    $('img.img-svg').each(function(){
        var $img = $(this);
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');
        $.get(imgURL, function(data) {
        var $svg = $(data).find('svg');
        if(typeof imgClass !== 'undefined') {
        $svg = $svg.attr('class', imgClass+' replaced-svg');
        }
        $svg = $svg.removeAttr('xmlns:a');
        if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
        $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
        }
        $img.replaceWith($svg);
        }, 'xml');
    }); 

    function menu(menuBtn, block, close) {
        if (document.querySelector(menuBtn)) {
            document.querySelector(menuBtn).addEventListener('click', () => {
                document.querySelector(block).style.cssText = 'left: 0';
                document.body.style.overflow = "hidden"
            })
            document.querySelector(close).addEventListener('click', () => {
                document.body.style.overflow = "auto"
                document.querySelector(block).style.cssText = 'left: -100%';
            })
        }
    } 
    // menu('', '', '');

    $(document).ready(function() {
        $('.car__for').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            fade: true,
            asNavFor: '.car__nav'
        });
        $('.car__nav').slick({
            slidesToShow: 5,
            slidesToScroll: 1,
            asNavFor: '.car__for',
            arrows: true,
            centerMode: true,
            focusOnSelect: true
        });
    })


    var numberOfSelects = $('select').length;

    // Iterate over each select element
    $('select').each( function() {
        
        // Cache the number of options
        var $this = $(this),
            numberOfOptions = $(this).children('option').length;
        
        // Hides the select element
        $this.addClass('hidden');
        
        // Wrap the select element in a div
        $this.wrap('<div class="select" />');
        
        // Insert a styled div to sit over the top of the hidden select element
        $this.after('<div class="styledSelect"></div>');
        
        // Cache the styled div
        var $styledSelect = $this.next('div.styledSelect');
        
        // Show the first select option in the styled div
        $styledSelect.text($this.children('option').eq(0).text());
        
        // Insert an unordered list after the styled div and also cache the list
        var $list = $('<ul />', {
            'class' : 'options'
        }).insertAfter($styledSelect);
        
        // Insert a list item into the unordered list for each select option
        for(var i = 0; i < numberOfOptions; i++) {
            $('<li />', {
                text: $this.children('option').eq(i).text()
            }).appendTo($list);
        }
        
        // Cache the list items
        var $listItems = $list.children('li');
        
        // Show the unordered list when the styled div is clicked (also hides it if the div is clicked again)
        $styledSelect.click( function(e) {
            e.stopPropagation();
            $('div.styledSelect.active').each( function() {
                $(this).removeClass('active')
                    .next('ul.options').filter(':not(:animated)').slideUp(250);   
            });
            /* Use this instead of the .each() method when dealing with a large number of elements:
            for(var i = 0; i < numberOfSelects; i++) {
                if($('div.styledSelect').eq(i).hasClass('active') === true) {
                    $('div.styledSelect').eq(i).removeClass('active')
                        .next('ul.options').filter(':not(:animated)').slideUp(250);
                }
            } */
            $(this).toggleClass('active')
                .next('ul.options').filter(':not(:animated)').slideToggle(250);
        });
        
        // Hides the unordered list when a list item is clicked and updates the styled div to show the selected list item
        // Updates the select element to have the value of the equivalent option
        $listItems.click( function(e) {
            e.stopPropagation();
            $styledSelect.text($(this).text())
                .removeClass('active');
            $this.val($(this).text().toLowerCase());
            $list.filter(':not(:animated)').slideUp(250);
        });
        
        // Hides the unordered list when clicking outside of it
        $(document).click( function() {
            $styledSelect.removeClass('active');
            $list.filter(':not(:animated)').slideUp(250);
        });
        
    });


});