
if(!window.JSFX)
	JSFX=new Object();
JSFX.ImageZoomRunning = false;

JSFX.zoomOn = function(img, zoomStep, maxZoom)
{
	if(img)
	{
		if(!zoomStep)
		{
			if(img.mode == "EXPAND")
				zoomStep = img.height/10;
			else
				zoomStep = img.width/10;
		}

		if(!maxZoom)
		{
			if(img.mode == "EXPAND")
				maxZoom = img.height/4;
			else
				maxZoom = img.width/4;
		}


		if(img.state == null)
		{
			img.state = "OFF";
			img.index = 0;
			img.orgWidth =  img.width;
			img.orgHeight = img.height;
			img.zoomStep = zoomStep;
			img.maxZoom  = maxZoom;
		}

		if(img.state == "OFF")
		{
			img.state = "ZOOM_IN";
			start_zooming();
		}
		else if( img.state == "ZOOM_IN_OUT"
			|| img.state == "ZOOM_OUT")
		{
			img.state = "ZOOM_IN";
		}
	}
}
JSFX.zoomIn = function(img, zoomStep, maxZoom)
{
	img.mode = "ZOOM";
	JSFX.zoomOn(img, zoomStep, maxZoom);
}
JSFX.stretchIn = function(img, zoomStep, maxZoom)
{
	img.mode = "STRETCH";
	JSFX.zoomOn(img, zoomStep, maxZoom);
}
JSFX.expandIn = function(img, zoomStep, maxZoom)
{
	img.mode = "EXPAND";
	JSFX.zoomOn(img, zoomStep, maxZoom);
}

JSFX.zoomOut = function(img)
{
	if(img)
	{
		if(img.state=="ON")
		{
			img.state="ZOOM_OUT";
			start_zooming();
		}
		else if(img.state == "ZOOM_IN")
		{
			img.state="ZOOM_IN_OUT";
		}
	}
}

function start_zooming()
{
	if(!JSFX.ImageZoomRunning)
		ImageZoomAnimation();
}

JSFX.setZoom = function(img)
{
	if(img.mode == "STRETCH")
	{
		img.width  = img.orgWidth  + img.index;
		img.height = img.orgHeight;
	}
	else if(img.mode == "EXPAND")
	{
		img.width  = img.orgWidth;
		img.height = img.orgHeight + img.index;
	}
	else
	{
		img.width  = img.orgWidth   + img.index;
		img.height = img.orgHeight  + (img.index * (img.orgHeight/img.orgWidth));
	}
}
/*******************************************************************
*
* Function    : ImageZoomAnimation
*
* Description : This function is based on the Animate function
*		    of animate2.js (animated rollovers from www.roy.whittle.com).
*		    Each zoom object has a state. This function
*		    modifies each object and (possibly) changes its state.
*****************************************************************/
function ImageZoomAnimation()
{
	JSFX.ImageZoomRunning = false;
	for(i=0 ; i<document.images.length ; i++)
	{
		var img = document.images[i];
		if(img.state)
		{
			if(img.state == "ZOOM_IN")
			{
				img.index+=img.zoomStep;
				if(img.index > img.maxZoom)
					img.index = img.maxZoom;

				JSFX.setZoom(img);

				if(img.index == img.maxZoom)
					img.state="ON";
				else
					JSFX.ImageZoomRunning = true;
			}
			else if(img.state == "ZOOM_IN_OUT")
			{
				img.index+=img.zoomStep;
				if(img.index > img.maxZoom)
					img.index = img.maxZoom;

				JSFX.setZoom(img);
	
				if(img.index == img.maxZoom)
					img.state="ZOOM_OUT";
				JSFX.ImageZoomRunning = true;
			}
			else if(img.state == "ZOOM_OUT")
			{
				img.index-=img.zoomStep;
				if(img.index < 0)
					img.index = 0;

				JSFX.setZoom(img);

				if(img.index == 0)
					img.state="OFF";
				else
					JSFX.ImageZoomRunning = true;
			}
		}
	}
	/*** Check to see if we need to animate any more frames. ***/
	if(JSFX.ImageZoomRunning)
		setTimeout("ImageZoomAnimation()", 40);
}
