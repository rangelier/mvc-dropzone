mvc-dropzone
============

This simple jQuery plugin will enable DOM elements to be dragged and dropped inside a drop zone.
The action method wich is provided when initializing the plugin, will be called for each element that is dropped inside the drop zone.

#Example

## Client
    <script type="text/javascript">
    $(function(){
      $("body").dragdrop({
        action: "/home/create"
      });
    });
    </script>
    
    //this element will be draggable and can be dropped inside the drop zone.
    <div class="draggable" data-id="1"></div> 
    
    //this element will behave as the drop zone for all the draggable elements.
    <div class="droppable"></div>
    
## Server
    //the action method that will be called when a element is dropped inside the zone
    [HttpPost]
    public JsonResult Create(int id)
    {
        return Json("It works like a charm!", JsonRequestBehavior.AllowGet);
    }

#Dependencies
1.  jQuery xxx
2.  jQuery UI

#Options

*  **ajaxSettings**
    * type // GET or POST
*  **styles**
    * dragging // Get or sets the css class of the draggable element
    * highlight // Get or sets the css class wich formats the drop zone when a element can be dropped.
    * cursor // Get or sets the cursor type to use when the drag start e.q. crosshair,move,pointer
*  **messages**
    * droppable // Get or sets the message when a element is droppable.
    * dropped // Get or sets the message to display when a element is dropped inside the drop zone.
    * error // Get or sets the error message wich will be displayed inside the drop zone if an error occurs.
*  **identifier** // The name of the attribute where the elements key value is stored.
*  **action** // Get or sets the server side action method to call when a element is dropped inside the drop zone.
