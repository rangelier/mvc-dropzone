(function ($) {
    $.fn.dragdrop = function (options) {
        //extend the default options with the user defined options.
        var opts = $.extend({}, $.fn.dragdrop.defaults, options);

        //create two empty variables to store the x and y positions.
        var xPos = 0;
        var yPos = 0;

        // iterate and reformat each matched element
        return this.each(function () {
            //get a reference to the dom element on wich the function is called.
            var obj = $(this);

            //get a reference to all draggable elements on the page.
            var dragElem = obj.find(".draggable");
            //get a reference to all droppable elements on the page.
            var dropElem = obj.find(".droppable");

            //check if action is undefined. If true display the default error message.
            if (opts.action === null || opts.action === undefined) {
                dropElem.text(opts.messages.error);
                return;
            }

            //set all elements draggable.
            dragElem.draggable({
                //sets the cursor type when the draggable elements is dragged.
                cursor: opts.styles.cursor,
                start: function (event, ui) {
                    //adds the hightlight class to the drop zone element.
                    dropElem.addClass(opts.styles.highlight);
                },
                stop: function (event, ui) {
                    //removes the highlight class from the drop zone.
                    dropElem.removeClass(opts.styles.highlight);
                },
                revert: function (event) {
                    //reset draggable element to its original position.
                    $(this).data("draggable").originalPosition = {
                        top: 0,
                        left: 0
                    };

                    //clears the drop zone text.
                    dropElem.text("");
                    //removes the dragging class from the draggable element.
                    $(this).removeClass(opts.styles.dragging);

                    return !event;
                }
            });
            //set all elements droppable.
            dropElem.droppable({
                activate: function (event, ui) {
                    //store the dragged element x and y position.
                    xPos = ui.draggable.position().left;
                    yPos = ui.draggable.position().top;

                    //set the dragging class.
                    ui.draggable.addClass(opts.styles.dragging);
                    //set the dropzone text.
                    dropElem.text(opts.messages.droppable);
                },
                drop: function (event, ui) {
                    //get a reference to the drop zone.
                    var zone = $(this);
                    //get a reference to the dragged element.
                    var draggedElem = ui.draggable;
                    //get the record id from the draggable element.
                    var recordId = ui.draggable.attr(opts.identifier);
                    //set the dropped message inside the zone.
                    zone.text(opts.messages.dropped);
                    //post the records with ajax to the specified controller action.
                    $.post(opts.action, { id: recordId }, function (response) {
                        //remove dragging class from element.
                        draggedElem.removeClass(opts.styles.dragging);
                        //reset the draggable element position.
                        draggedElem.offset({ left: xPos, top: yPos });
                        //set zone text after succesfull post.
                        zone.text(response);
                    }).error(function (xhr, statusText, errorType) {
                        if (opts.action == undefined || opts.action == null) {
                            zone.text(opts.errorText);
                        } else {
                            //set the error message inside the dropzone.
                            zone.text(statusText);
                        }
                        //remove dragging class from element.
                        draggedElem.removeClass(opts.styles.dragging);
                        //reset the draggable element position.
                        draggedElem.offset({ left: xPos, top: yPos });
                    });
                }
            });
        });
    };
    $.fn.dragdrop.defaults = {
        ajax: {
            type: "POST",
            contentType: "application/json",
            dataType: "json",
            error: function () {
            },
            success: function () {
            }
        },
        styles: {
            dragging: "dcf-dragging",
            highlight: "dcf-highlight",
            cursor: "move"
        },
        messages: {
            droppable: "Please drop your element here.",
            dropped: "Your element was dropped.",
            error: "Please provide a valid action method to call when the draggable item is dropped inside the zone."
        },
        identifier: 'data-id',
        action: null
    };
})(jQuery);