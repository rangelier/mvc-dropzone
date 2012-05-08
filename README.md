mvc-dropzone
============

This simple jQuery plugin will enable DOM elements to be dragged and dropped inside a drop zone.
The action method wich is provided inside the document ready function will be called for each element that is dropped inside the drop zone.

#Example
    
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
    