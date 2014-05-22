/*
* tabRoll图片切换效果
* 
*/
// JavaScript Document
(function(){
	jQuery.fn.picshow = function(o){
		var o = jQuery.extend({
			 pause:5000,
			 fspd:500,
			 auto:true
		}, o||{});
		return this.each(function(){
			var jQuerycont = jQuery(".ps-cont > a", this), jQuerytitle = jQuery(".ps-title > h3", this), jQuerynav = jQuery(".ps-nav > a", this),
			len = jQuerycont.length;
			var interval = null, index = 0, isOver = true;
			if(o.auto){jQuerycont.hover(function(){clearInterval(interval);}, auto);}
			if(o.auto){
				jQuerynav.each(function(i){
					jQuery(this).hover(function(){
						clearInterval(interval);
						roll(i);
					}, auto);
				});
			}else{
				jQuerynav.each(function(i){
					jQuery(this).hover(function(){roll(i);});
				});
			}
			
			function auto(){
				clearInterval(interval);
				interval = setInterval(function(){ roll(index==(len-1) ? 0 : index+1);}, o.pause);
			}
			function roll(i){
				if(isOver){
					isOver = false;
					jQuerycont.hide();
					jQuerycont.eq(i).fadeIn(o.fspd, function(){ isOver = true; });
					jQuerynav.removeClass("hover");
					jQuerynav.eq(i).addClass("hover");
					jQuerytitle.hide();
					jQuerytitle.eq(i).show()
					index = i;
				}
			}
			//init
			jQuerycont.eq(index).show();
			jQuerynav.eq(index).addClass("hover");
			if(o.auto){auto();}
		});
	}
})(jQuery);

// JavaScript Document
(function(){
	jQuery.fn.tabs = function(o){
		var o = jQuery.extend({meth:"hover"}, o||{})
		return this.each(function(){
			var jQuerymenu = jQuery(this).children(".tab-menu").children("li"), jQuerycont = jQuery(this).children(".tab-cont").children(".cont");
			jQuerymenu.each(function(i){
				if(o.meth == "click"){
					jQuery(this).click(function(){ toggle(i) });				
				}else if(o.meth == "hover"){
					jQuery(this).hover(function(){ toggle(i) });
				}
			});
			function toggle(i){
				jQuerymenu.removeClass("hover");
				jQuerymenu.eq(i).addClass("hover");
				jQuerycont.removeClass("hover");
				jQuerycont.eq(i).addClass("hover");
			}
		});
	}
})(jQuery);

(function(){
	jQuery.fn.rollpic = function(o){
		var o = jQuery.extend({
			pause:5000,
			nspd:1000,
			uspd:300,
			vnum:5,
			snum:1,
			start:0,
			isH:true,
			auto:true
		}, o||{});
		
		return this.each(function(){
			var jQuerycont = jQuery(".sp-cont", this), 
			jQueryprev = jQuery(".next", this), jQuerynext = jQuery(".prev", this),
			jQuerya = jQuerycont.children("a"), len = jQuerya.length, v=o.vnum;
			if(len<v){return false;}
			jQuerycont.prepend(jQuerya.slice(len-v-1+1).clone(true)).append(jQuerya.slice(0,v).clone(true));
			o.start += v;
			var curr = o.start;
			
			var interval = null, a_dir = o.isH ? "marginLeft":"marginTop", c_dir = "left",
			aSize = o.isH ? jQuerya.outerWidth(true) : jQuerya.outerHeight(true), contDS = o.isH ? "width" : "height",
			itemLength = jQuerycont.children("a").size();
			jQuerycont.css(contDS, itemLength*aSize).css(a_dir, -(curr*(aSize+6)));
			
			var isOver = true;
			
			if(o.auto){
				jQuerycont.hover(function(){
					clearInterval(interval);
				}, function(){
					if(c_dir == "left"){
						interval = setInterval(function(){ roll(curr+o.snum)}, o.pause);
					}else if(c_dir == "right"){
						interval = setInterval(function(){ roll(curr-o.snum)}, o.pause);
					}
				});
			}
			if(jQueryprev){
				jQueryprev.click(function(){
					if(o.auto){clearInterval(interval)};
					if(isOver==true){roll(curr-o.snum, o.uspd);c_dir = "right";};
					if(o.auto){interval = setInterval(function(){ roll(curr-o.snum)}, o.pause)};
				});
			}
			if(jQuerynext){
				jQuerynext.click(function(){
					if(o.auto){clearInterval(interval)};
					if(isOver==true){roll(curr+o.snum, o.uspd); c_dir = "left";};
					if(o.auto){interval = setInterval(function(){ roll(curr+o.snum)}, o.pause)};
				});
			}
			if(o.auto){ interval = setInterval(function(){ roll(curr+o.snum)}, o.pause);}
			function roll(to, spd){
				if(isOver){
					var spd = spd || o.nspd
					isOver = false;
					if(to<=o.start-v-1){
							jQuerycont.css(a_dir, -((v+(len-v)+curr)*aSize)+"px");
							curr = (v+(len-v)+curr)-o.snum;
					}else if(to>=itemLength-v+1) {
							jQuerycont.css(a_dir, -( (v-(itemLength-v-curr)) * aSize ) + "px" );
							curr = (v-(itemLength-v-curr))+o.snum;
					}else curr = to;
					
					jQuerycont.animate(
							a_dir == "marginLeft" ? {"marginLeft": -(curr*(aSize+6)) } : {"marginTop": -(curr*aSize) } , spd, function(){isOver = true;}
					);
				}
				return false;
			};
			
		});
	}
})(jQuery);

//调用
jQuery("#picShow").picshow();
jQuery(".tabs").tabs({meth:"hover"});
jQuery(".scroll-pic").rollpic();
jQuery("#showlist li").hover( function(){
	jQuery("#showlist li").removeClass("hover");
	jQuery(this).addClass("hover");
	var src=jQuery(this).find("img").attr("src").replace("images","images/pic");
	var t=jQuery(this).find("h4").text();
	var wen=jQuery(this).find("p").text();
	jQuery("#show").find("img").attr("src",src);
	jQuery("#show").find("h4").text(t);
	jQuery("#show").find("p").text(wen);

});

/*
* 浮动客服
*/
(function(){
		jQuery("#avatar-close").click(function(){
			jQuery(".avatar-extend").remove();
		});
})(jQuery);

/*
* 首页大图轮换
*/
(function(){
		setInterval_homePagePicChg_picChg_picAndbtn = setInterval("homePagePicChg_picChg_picAndbtn()", 2000);
		homePagePicChg_hoverOnBTn();
})(jQuery);

function homePagePicChg_picChg_picAndbtn()
{
    var recommendCount = jQuery(".homePagePicChg-picChg div").length;

    var showingDiv = jQuery(".homePagePicChg-picChg div").filter(function(){
        return jQuery(this).attr("class").match(/\bhomePagePicChg_picShow\b/g);
    });
    
    var showingIndex = jQuery(".homePagePicChg-picChg div").index(showingDiv);
    
    var comingShowIndex = showingIndex + 1;
    if(comingShowIndex > recommendCount - 1)
    {
        comingShowIndex = 0;
    }
    else
    {
        
    }
    
    jQuery(".homePagePicChg-picChg div")
        .removeClass("homePagePicChg_picShow").removeClass("homePagePicChg_PicHide")
        .addClass("homePagePicChg_PicHide")
        .eq(comingShowIndex)
        .removeClass("homePagePicChg_PicHide")
        .addClass("homePagePicChg_picShow");
    jQuery(".homePagePicChg-picChgBtn div")
        .removeClass("homePagePicChg_Btnhover").removeClass("homePagePicChg_BtnNotHover")
        .addClass("homePagePicChg_BtnNotHover")
        .eq(comingShowIndex)
        .removeClass("homePagePicChg_BtnNotHover")
        .addClass("homePagePicChg_Btnhover");
}

function  homePagePicChg_hoverOnBTn()
{
    jQuery(".homePagePicChg-picChgBtn div").hover(function(){
        clearInterval(setInterval_homePagePicChg_picChg_picAndbtn);
				
        var hoverIndex = jQuery(".homePagePicChg-picChgBtn div").index(jQuery(this));
        //alert(hoverIndex);
        jQuery(".homePagePicChg-picChg div")
            .removeClass("homePagePicChg_picShow").removeClass("homePagePicChg_PicHide")
            .addClass("homePagePicChg_PicHide")
            .eq(hoverIndex)
            .removeClass("homePagePicChg_PicHide")
            .addClass("homePagePicChg_picShow");
        jQuery(".homePagePicChg-picChgBtn div")
            .removeClass("homePagePicChg_Btnhover").removeClass("homePagePicChg_BtnNotHover")
            .addClass("homePagePicChg_BtnNotHover")
            .eq(hoverIndex)
            .removeClass("homePagePicChg_BtnNotHover")
            .addClass("homePagePicChg_Btnhover");           
    },
    function(){
            setInterval_homePagePicChg_picChg_picAndbtn = setInterval("homePagePicChg_picChg_picAndbtn()", 2000);
    });
}