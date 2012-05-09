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

1.  ajaxSettings
    1. type //'GET' or 'POST'
2.  styles
3.  messages
4.  identifier
    1. Identifies the attribute on wich the elements value is stored.
5.  action
    1. Get or sets the server side action method to call when a element is dropped inside the drop zone.
