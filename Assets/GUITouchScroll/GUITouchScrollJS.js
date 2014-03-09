@script ExecuteInEditMode()

//Original Script in C from http://www.mindthecube.com/blog/2010/09/adding-iphone-touches-to-unitygui-scrollview/comment-page-1#comment-2935

public var optionsSkin : GUISkin; // this sets an optionSkin to load from skins
public var rowSelectedStyle : GUIStyle; //this sets the row style within the script, you can add more styles and skins.

// Internal variables for managing touches and drags
private var selected : int = -1;
private var scrollVelocity : float = 0f;
private var timeTouchPhaseEnded = 0f;
private var previousDelta : float = 0f;

public var scrollPosition : Vector2 ;

public var inertiaDuration : float = 0.75f;
// size of the window and scrollable list
public var numRows : int;
public var rowSize : Vector2;
public var windowMargin : Vector2;
public var listMargin : Vector2;
private var windowRect :Rect;   // calculated bounds of the window that holds the scrolling list
private var listSize : Vector2; // calculated dimensions of the scrolling list placed inside the window

function Update() //check for touch
{
	if (Input.touchCount != 1) //if this is a short touch
	{
		selected = -1;
		
		if ( scrollVelocity != 0.0f )
		{
			// slow down over time
			var t : float;
			t = Time.time;
			t = t - timeTouchPhaseEnded;
			t = t / inertiaDuration;
			var frameVelocity : float = Mathf.Lerp(scrollVelocity, 0, t);
			scrollPosition.y += frameVelocity * Time.deltaTime;
			
			// after N seconds, we’ve stopped
			if (t >= inertiaDuration) scrollVelocity = 0.0f;
		}
		return;
	}

	var touch : Touch = Input.touches[0];
	var	fInsideList = IsTouchInsideList(touch.position);

	if (touch.phase == TouchPhase.Began && fInsideList)
	{
		selected = TouchToRowIndex(touch.position);
		previousDelta = 0.0f;
		scrollVelocity = 0.0f;
	}
	else if (touch.phase == TouchPhase.Canceled || !fInsideList)
	{
		selected = -1;
		previousDelta = 0f;
	}
	else if (touch.phase == TouchPhase.Moved && fInsideList)
	{
		// dragging
		selected = -1;
		previousDelta = touch.deltaPosition.y;
		scrollPosition.y += touch.deltaPosition.y;
	}
	else if (touch.phase == TouchPhase.Ended && fInsideList)
	{
		// Was it a tap, or a drag-release?
		if ( selected > -1 )
		{
			Debug.Log("Player selected row " + selected);
		}
		else
		{
			// impart momentum, using last delta as the starting velocity
			// ignore delta = 10)
			scrollVelocity = touch.deltaPosition.y / touch.deltaTime;
			timeTouchPhaseEnded = Time.time;
		}
	}

}

function OnGUI () //this deals with the display
{
	GUI.skin = optionsSkin;
	
	windowRect = Rect(windowMargin.x, windowMargin.y,
						Screen.width - (2*windowMargin.x), Screen.height - (2*windowMargin.y)); //this draws the bg
	listSize = new Vector2(windowRect.width - 2*listMargin.x, windowRect.height - 2*listMargin.y);
	
	GUI.Window (0, windowRect, GUI.WindowFunction (DoWindow), "GUI Scrolling with Touches"); //this draws the frame
}

function DoWindow (windowID : int) //here you build the table
{
	var rScrollFrame :Rect = Rect(listMargin.x, listMargin.y, listSize.x, listSize.y);
	var rList :Rect = Rect(0, 0, rowSize.x, numRows*rowSize.y);
	
	scrollPosition = GUI.BeginScrollView (rScrollFrame, scrollPosition, rList, false, false);
	
	var rBtn :Rect = Rect(0, 0, rowSize.x, rowSize.y);
	
	for (var iRow : int = 0; 
		iRow < numRows;
		iRow++ )
	{
       	// draw call optimization: don't actually draw the row if it is not visible
        if ( rBtn.yMax >= scrollPosition.y && 
             rBtn.yMin <= (scrollPosition.y + rScrollFrame.height) )
       	{
			var fClicked : boolean = false;
			var rowLabel : String = "Row Number " + iRow; //this is what will be written in the rows
		
			if ( iRow == selected )
			{
				fClicked = GUI.Button(rBtn, rowLabel, rowSelectedStyle);
			}
			else
			{
				fClicked = GUI.Button(rBtn, rowLabel);
			}
			
			// Allow mouse selection, if not running on iPhone.
			if ( fClicked && Application.platform != RuntimePlatform.IPhonePlayer )
			{
				Debug.Log("Player mouse-clicked on row " + iRow);
			}
		}
	
		rBtn.y += rowSize.y;
	}
	GUI.EndScrollView();
}


function TouchToRowIndex(touchPos : Vector2) : int //this checks which row was touched
{
	var irow: int = -1;
	
	// clip touchPos to visible part of the list
	var listSize : Vector2 = Vector2(windowRect.width - 2*listMargin.x,
									 windowRect.height - 2*listMargin.y);
	var rScrollFrame :Rect = Rect(listMargin.x, listMargin.y, listSize.x, listSize.y);
	
	var yy :float = Screen.height - touchPos.y; // invert y coordinate
	yy += scrollPosition.y; // adjust for scroll position
	yy -= windowMargin.y;   // adjust for window y offset
	yy -= listMargin.y;     // adjust for scrolling list offset within the window
	irow = yy / rowSize.y;
	
	irow = Mathf.Min(irow, numRows); // they might have touched beyond last row
             
	return irow;
}

function IsTouchInsideList(touchPos : Vector2) : boolean
{
	var screenPos : Vector2 = new Vector2(touchPos.x, Screen.height - touchPos.y);  // invert y coordinate
	var rAdjustedBounds : Rect = new Rect(listMargin.x + windowRect.x, listMargin.y + windowRect.y, listSize.x, listSize.y);
	
	return rAdjustedBounds.Contains(screenPos);
}
