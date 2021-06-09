$(function(){
	
	
	/* ==============================
	 * gnb 
	 * ============================== */




	 /* ==============================
	 * all-menu 
	 * ============================== */

	$('.all-menu a').click(function(){
		$('body').addClass('open_allmenu');
		$('.all-menu-wrap').fadeIn(500);
		return false;
	})
	$('.all-menu-wrap .all-menu-close').click(function(){
		$('body').removeClass('open_allmenu');
		$('.all-menu-wrap').fadeOut(500);
		return false;
	})
	
	$(window).load(function() {
		$('.list-bxslider').each(function() {
			var $id = $(this).attr("id"),
				$length = $(this).find('li').length;
			if($length > 1){
				$("#"+$id).bxSlider({
					mode:'vertical',
					auto:true,
					autoHover:true,
					pager:false,
					prevText:'이전',
					nextText:'다음'
				});
			}
		});
	});


	/* ==============================
	 * content 
	 * ============================== */
	// 팝업 컨트롤
	popupCtrl();

	// 탭 컨트롤
	tabMotion();

	//그래프 컨트롤
	graphMotion()
	
	/* qna */
	$('.qna .result-box a').click(function(){
		$('.qna .result-box').not($(this).parent()).removeClass('on').find('.view').slideUp();
		$(this).next().slideToggle().parent().toggleClass('on');
		return false;
	});
	
	/* customer */
	$('.personal-info-box a').click(function(){
		if($(this).hasClass('on')){
			$(this).find('.btn-view').text('+ 내용보기');
			$(this).removeClass('on').next().slideUp();
		}else{
			$(this).find('.btn-view').text('- 내용접기');
			$(this).addClass('on').next().slideDown();
		}
		return false;
	});
	
	$(':radio').each(function(){
		if($(this).is(':checked')){
			$(this).parent().addClass('on');
		};
	});
	
	$('.question-box .radio-list :radio').change(function(){
		if($(this).is(':checked')){
			$(this).parent().addClass('on').siblings().removeClass('on');
		};
	});
	
	/* kakaotalk */
	$('.kakaotalk .m_tab_title li').click(function(){
		var index = $(this).index();
		var width = $('.kakaotalk .m_tab_contents').width();
		$(this).addClass('on').siblings().removeClass('on');
		$('.kakaotalk .m_tab_contents > .slide-box').animate({'margin-left':-index*width});
		return false;
	});
	
	/* classroom */
	$('.bottom_menu_box .close_box').click(function(){
		var html = $(this).find('a').html();
		$(this).toggleClass('on');
		$('.classroom-visual').toggle();
		if($(this).hasClass('on')){
			$(this).find('a').html(html.replace('열기','닫기'));
		}else{
			$(this).find('a').html(html.replace('닫기','열기'));
		}
		return false;
	});

	//datepicker
	if($('.datepicker').size() > 0){
		$( '.datepicker' ).datepicker({
			closeText: '닫기',
			prevText: '이전 달',
			nextText: '다음 달',
			currentText: '오늘',			
			monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
            monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
			dayNames: ['일','월','화','수','목','금','토'],
            dayNamesShort: ['일','월','화','수','목','금','토'],
            dayNamesMin: ['일','월','화','수','목','금','토'],
			dateFormat: 'yy.mm.dd',
			showMonthAfterYear: true,
			changeMonth: true,
      		changeYear: true,
      		yearSuffix: '년',
			showOn: 'button',
			buttonText: '기간조회'
		});
	}

	

	/* 숫자 업시키는 클래스 .countUp, id값도 추가해야됨*/
	if($('.countUp').size()>0){
		$(window).load(function(){
			$('.countUp').counterUp({
				delay:10,
    			time:1000
			});
		})
	}
	
	/* classroom */
	$('.select_menu03 a').click(function(){
		$('.smart-memo').slideDown();
		$('html,body').animate({'scrollTop':0});
		return false;
	});
	
	$('.smart-memo .btn-close').click(function(){
		$(this).parent().slideUp();
		return false;
	});
	
	/* e-viewer*/
	$('.btn-setting').click(function(){
		$('.pop-d-day').fadeIn();
		return false;
	});
	$('.pop-d-day .btn-close').click(function(){
		$('.pop-d-day').fadeOut();
		return false;
	});

	$('.btn-smart-memo').click(function(){
		$('.pop-smart-memo').fadeIn();
		return false;
	});
	$('.pop-smart-memo .btn-close').click(function(){
		$('.pop-smart-memo').fadeOut();
		return false;
	});
});

/* popup */
function popupCtrl(){
	$('.pop_open').click(function() {
        var _this =$(this);
        var $href = _this.attr('href');		
		popShow($href)
		return false;
    });

    $('.pop_close').click(function() {
		var $bg = $(this).parents('.popup_bg');
		popHide($bg)
		return false;
	});
}
function popShow(tar) {
	$(tar).fadeIn(500);
	$('body').css({'overflow':'hidden'});
}

function popHide(tar) {
	var $pop
	if(tar == undefined){
		$pop = '.popup_bg';
	}else{
		$pop = tar
	}	
	
	$($pop).fadeOut(500);
	$('body').removeAttr('style');
}


/* tab */
function tabMotion(){
	$('.ui-tab a').click(function() {
		var href = $(this).attr('href');
		if(!$(this).parent().hasClass('on')){			
			$(href).show().siblings('.tab_cont').hide();
			$(this).parent().addClass('on').siblings().removeClass('on');
		}		
		return false;
    });

	$('.ui-tab').each(function() {
		$(this).children('li').eq(0).find('a').trigger('click');
	});
}


/* graph */
function graphMotion(){
	if($('.loding-act').size() > 0){
		//http://kottenator.github.io/jquery-circle-progress/
		var lodingActVal = parseInt($('.loding-act .loding-txt span').text());
		$('.loding-act').circleProgress({
		  value: lodingActVal/100, //변수값
		  startAngle:-Math.PI / 2, //스타트 지점설정
		  fill : { color:"red"}, //색상값
		  emptyFill:'#fff', //뒷 색상값
		  size:120 // 전체 사이즈 
		}).on('circle-animation-progress', function(event, progress) {
		  $(this).find('.loding-txt').html('진도율 <br /><span>' + parseInt(lodingActVal * progress) + '%</span>');
		});
	}

	if($('.class-process').size() > 0){
		var minVal = parseInt($('.class-process .loding-txt .min').text());
		var maxVal = parseInt($('.class-process .loding-txt .max').text());
		function circleAction(val,max){
			$('.class-process').circleProgress({
			  value: val/max, //변수값
			  startAngle:-Math.PI / 2, //스타트 지점설정
			  fill : { color:"#e64c60"}, //색상값
			  emptyFill:'#fff', //뒷 색상값
			  size:200 // 전체 사이즈 
			}).on('circle-animation-progress', function(event, progress) {
			  $(this).find('.loding-txt').html('수강종료 <br /><span>D-' + parseInt(val * progress) + '</span>');
			});
		}
		circleAction(minVal,maxVal);

		$('.class-info .my-class a').click(function(){
			var min = parseInt($(this).find('.min').text());
			var max = parseInt($(this).find('.max').text());
			circleAction(min,max);
			return false;
		});
	}

	if($('.teacher-circle-graph').size() > 0){
		var first = $('.teacher-tap2').find('.btn_graph').first(),
			firstVal = first.data('value'),
			firstMax = first.data('max');
		function circleAction2(val,max){
			$('.teacher-circle-graph > div').circleProgress({
			  value: val/max, //변수값
			  startAngle:-Math.PI / 2, //스타트 지점설정
			  fill : { color:"#2657ab"}, //색상값
			  emptyFill:'#21222b', //뒷 색상값
			  size:220 // 전체 사이즈 
			}).on('circle-animation-progress', function(event, progress) {
			  $(this).find('.txt strong').html(parseInt(val * progress));
			});
		}

		$('.teacher-circle-graph').waypoint(function(){
			circleAction2(firstVal,firstMax);
		}, { offset: '100%', triggerOnce: true });
		

		$('.teacher-tap2 .btn_graph').click(function(){
			var min = $(this).data('value'),
				max = $(this).data('max');
			circleAction2(min,max);
			return false;
		});
	}

	/* 세로 그래프 bar 클래스 .ui-graph-bar */
	if($('.ui-graph-bar').size()>0){
		$(window).load(function(){
			$('.ui-graph-bar').each(function(index, el) {
				var $height = $(this).data('value');
				$(this).waypoint(function(){
					$(this).animate({height:$height+'%'},1000);
				}, { offset: '100%', triggerOnce: true });
			});
		})
	}
}