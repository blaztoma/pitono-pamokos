(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
require("./../rur.js");
require("./../world_api/things.js");

// the following requirements are for automatic transformations
// via the ".transform" attribute
require("./../world_api/background_tile.js");
require("./../world_api/bridges.js");
require("./../world_api/pushables.js");
require("./../world_api/obstacles.js");
require("./../world_api/objects.js");

var home_message, obj, tile;

tile = {name: "mud",
    url: RUR.BASE_URL + '/src/images/mud.png',
    message: "I'm stuck in mud.",
    fatal: "mud",
    info: "Mud: Reeborg <b>cannot</b> detect this and will get stuck if it moves to this location."
};
RUR.add_new_thing(tile);

tile = {name: "soil",
    url: RUR.BASE_URL + '/src/images/mud.png',
    info: "Soil: usually safe, but looks identical to mud."
};
RUR.add_new_thing(tile);

tile = {name: "ice",
    url: RUR.BASE_URL + '/src/images/ice.png',
    info: "Ice: Reeborg <b>cannot</b> detect this and <em>might</em> slide and move to the next location if it moves to this location."
};
RUR.add_new_thing(tile);

tile = {name: "grass",
    url: RUR.BASE_URL + '/src/images/grass.png',
    info: "Grass: usually safe."
};
RUR.add_new_thing(tile);

tile = {name: "grass_top_left",
    url: RUR.BASE_URL + '/src/images/grass_top_left.png',
    info: "Grass: usually safe."
};
RUR.add_new_thing(tile);

tile = {name: "grass_top_right",
    url: RUR.BASE_URL + '/src/images/grass_top_right.png',
    info: "Grass: usually safe."
};
RUR.add_new_thing(tile);

tile = {name: "grass_bottom_left",
    url: RUR.BASE_URL + '/src/images/grass_bottom_left.png',
    info: "Grass: usually safe."
};
RUR.add_new_thing(tile);

tile = {name: "grass_bottom_right",
    url: RUR.BASE_URL + '/src/images/grass_bottom_right.png',
    info: "Grass: usually safe."
};
RUR.add_new_thing(tile);

tile = {name: "pale_grass",
    url: RUR.BASE_URL + '/src/images/pale_grass.png',
    info: "Grass: usually safe.",
};
RUR.add_new_thing(tile);

tile = {name: "gravel",
    url: RUR.BASE_URL + '/src/images/gravel.png',
    info: "Gravel: usually safe."
};
RUR.add_new_thing(tile);

tile = {
    name:"water",
    images: [RUR.BASE_URL + '/src/images/water.png',
        RUR.BASE_URL + '/src/images/water2.png',
        RUR.BASE_URL + '/src/images/water3.png',
        RUR.BASE_URL + '/src/images/water4.png',
        RUR.BASE_URL + '/src/images/water5.png',
        RUR.BASE_URL + '/src/images/water6.png'],
    info: "Water: Reeborg <b>can</b> detect this but will get damaged if it moves to this location.",
    fatal: "water",
    detectable: true,
    message: "I'm in water!"
};
RUR.add_new_thing(tile);

tile = {name: "bricks",
    url: RUR.BASE_URL + '/src/images/bricks.png',
    info: "brick wall: Reeborg <b>can</b> detect this but will hurt himself if he attemps to move through it.",
    message: "Crash!",
    detectable: true,
    fatal: "bricks",
    solid: true
};
RUR.add_new_thing(tile);


// fire adapted from https://commons.wikimedia.org/wiki/File:Icon-Campfire.svg
tile = {name: "fire",
    images: [RUR.BASE_URL + '/src/images/fire.png',
        RUR.BASE_URL + '/src/images/fire1.png',
        RUR.BASE_URL + '/src/images/fire2.png'],
    info: "fire: Reeborg <b>can</b> detect this but will hurt himself if he attemps to move through it.",
    message: "My joints are melting!",
    detectable: true,
    fatal: "fire"
};
RUR.add_new_thing(tile);

// flame burst adapted from fire above
tile = {name: "flame burst",
    images: [RUR.BASE_URL + "/src/images/flame1.png",
             RUR.BASE_URL + "/src/images/flame2.png",
             RUR.BASE_URL + "/src/images/flame3.png",
             RUR.BASE_URL + "/src/images/flame4.png",
             RUR.BASE_URL + "/src/images/flame5.png",
             RUR.BASE_URL + "/src/images/flame6.png"],
  selection_method: "cycle remove",
  x_offset: -4,
  y_offset: -8
};

RUR.add_new_thing(tile);

// logs adapted from fire above
tile = {name: "logs",
    url: RUR.BASE_URL + '/src/images/logs.png',
    info: "Some harmless, slightly burnt logs",
};
RUR.add_new_thing(tile);

// smoke adapted from https://opengameart.org/content/animated-fireball

tile = {name: "smoke",
    images: [RUR.BASE_URL + "/src/images/smoke1.png",
             RUR.BASE_URL + "/src/images/smoke2.png",
             RUR.BASE_URL + "/src/images/smoke3.png",
             RUR.BASE_URL + "/src/images/smoke4.png",
             RUR.BASE_URL + "/src/images/smoke5.png",
             RUR.BASE_URL + "/src/images/smoke6.png"],
  selection_method: "cycle remove",
  y_offset: -8
};

RUR.add_new_thing(tile);


/*--- home tiles ---*/

home_message = ": Reeborg <b>can</b> detect this tile using at_goal().";

tile = {name: "green_home_tile",
    url: RUR.BASE_URL + '/src/images/green_home_tile.png',
    info: "green_home_tile" + home_message,
    detectable: true
};
RUR.add_new_thing(tile);

tile = {name: "house",
    url: RUR.BASE_URL + '/src/images/house.png',
    info: "house" + home_message,
    detectable: true
};
RUR.add_new_thing(tile);

tile = {name: "racing_flag",
    url: RUR.BASE_URL + '/src/images/racing_flag.png',
    info: "racing_flag" + home_message,
    detectable: true
};
RUR.add_new_thing(tile);

/* --- default objects  -----*/

_add_object_type = function (name) {
    "use strict";
    var url, url_goal;
    url = RUR.BASE_URL + '/src/images/' + name + '.png';
    url_goal = RUR.BASE_URL + '/src/images/' + name + '_goal.png';
    RUR.add_new_thing({"name": name, "url": url, "goal": {"url": url_goal}});
};

_add_object_type("token");
RUR.THINGS.token.info = "tokens are Reeborg's favourite thing.";
_add_object_type("star");
_add_object_type("triangle");
_add_object_type("square");
_add_object_type("strawberry");
_add_object_type("banana");
_add_object_type("apple");
_add_object_type("leaf");
_add_object_type("carrot");
_add_object_type("dandelion");
_add_object_type("daisy");
_add_object_type("tulip");
_add_object_type("east");
_add_object_type("north");
RUR.THINGS.east.x_offset = 38;
RUR.THINGS.east.y_offset = -2;
RUR.THINGS.north.x_offset = -2;
RUR.THINGS.north.y_offset = -2;

// goal walls treated above
function _add_static_wall(name, x_offset, y_offset) {
    "use strict";
    var url;
    url = RUR.BASE_URL + '/src/images/' + name + '.png';
    RUR.add_new_thing({"name": name, "url": url,
                     "x_offset": x_offset, "y_offset": y_offset});
}
_add_static_wall("east_border", 38, -2);
_add_static_wall("east_grid", 39, -2);
_add_static_wall("east_edit", 38, -2);

_add_static_wall("north_border", -2, -2);
_add_static_wall("north_grid", -2, -1);
_add_static_wall("north_edit", -2, -2);

_add_object_type("box");
RUR.THINGS.box.name = "box";
RUR.THINGS.box.transform = [
    {conditions: [[RUR.is_background_tile, "water"],
                  [RUR.is_pushable, "box"],
                  [RUR.is_bridge, "bridge", "not"]],
     actions: [[RUR.remove_pushable, "box"],
              [RUR.add_bridge, "bridge"]]
    },
    {conditions: [[RUR.is_background_tile, "mud"],
                  [RUR.is_pushable, "box"],
                  [RUR.is_bridge, "bridge", "not"]],
     actions: [[RUR.remove_pushable, "box"],
              [RUR.add_bridge, "bridge"]]
    },
    {conditions: [[RUR.is_background_tile, "fire"],
                  [RUR.is_pushable, "box"]],
     actions: [[RUR.remove_pushable, "box"],
               [RUR.add_obstacle, "flame burst"]]
    },
    {conditions: [[RUR.is_obstacle, "fire"],
                  [RUR.is_pushable, "box"]],
     actions: [[RUR.remove_pushable, "box"],
               [RUR.add_obstacle, "flame burst"]]
    }
];

tile = {
    name: "bucket",
    info: "A bucket full of water.",
    url: RUR.BASE_URL + '/src/images/water_bucket.png',
    transform: [
        {conditions: [[RUR.is_background_tile, "fire"],
                    [RUR.is_object, "bucket"]],
        actions: [[RUR.remove_object, "bucket"],
                [RUR.remove_background_tile, "fire"],
                [RUR.add_obstacle, "logs"], // added as obstacle so that "info"
                [RUR.add_obstacle, "smoke"]] // can be shown when clicking on canvas.
        },
        {conditions: [[RUR.is_obstacle, "fire"],
                    [RUR.is_object, "bucket"]],
        actions: [[RUR.remove_object, "bucket"],
                [RUR.remove_obstacle, "fire"],
                [RUR.add_obstacle, "logs"],
                [RUR.add_obstacle, "smoke"]]
        },
        {conditions: [[RUR.is_object, "bulb"],
                    [RUR.is_object, "bucket"]],
        actions: [[RUR.remove_object, "bucket"],
                [RUR.remove_object, "bulb"],
                [RUR.add_object, "tulip"]]
        }
    ]
};
RUR.add_new_thing(tile);


tile = {
    name: "bulb",
    info: "Tulip bulb: might grow into a nice tulip with some water from a bucket.",
    url: RUR.BASE_URL + '/src/images/seed.png'
};
RUR.add_new_thing(tile);

tile = {
    name: "bridge",
    info: "Bridge:Reeborg <b>can</b> detect this and will know that it allows safe passage over water.",
    url: RUR.BASE_URL + '/src/images/bridge.png',
    protections: ["water", "mud"]
};
RUR.add_new_thing(tile);

tile = {"name": 'beeper',
    "selection_method": 'ordered',
    "images": [RUR.BASE_URL + '/src/images/beeper0.png',
            RUR.BASE_URL + '/src/images/beeper1.png',
            RUR.BASE_URL + '/src/images/beeper2.png',
            RUR.BASE_URL + '/src/images/beeper3.png'],
    "goal": {'url': RUR.BASE_URL + '/src/images/beeper_goal.png'}
};
RUR.add_new_thing(tile);

add_fence = function (name) {
    var obj = {};
    obj.name = name;
    obj.fatal = "fence";
    obj.solid = true;
    obj.detectable = true;
    obj.message = "I hit a fence!";
    obj.info = "Fence: Reeborg <b>can</b> detect this but will be stopped by it.";
    obj.url = RUR.BASE_URL + '/src/images/' + name + '.png';
    RUR.add_new_thing(obj);
};

add_fence("fence_right");
add_fence("fence_left");
add_fence("fence_double");
add_fence("fence_vertical");


},{"./../rur.js":44,"./../world_api/background_tile.js":75,"./../world_api/bridges.js":76,"./../world_api/objects.js":80,"./../world_api/obstacles.js":81,"./../world_api/pushables.js":82,"./../world_api/things.js":84}],2:[function(require,module,exports){
/* Dialog used by the Interactive world editor to add objects to the world.
*/

require("./../rur.js");
require("./../world_api/objects.js");
require("./../drawing/visible_world.js");
var msg = require("./../../lang/msg.js");

msg.record_id("number-of-objects", "Number of objects:");
msg.record_id("maximum-text", "Maximum:");
msg.record_id("add-object-explain", "ADD OBJECT EXPLAIN");
msg.record_id("input-add-number");
msg.record_id("maximum-number");
msg.record_id("dialog-add-object");
msg.record_title("ui-dialog-title-dialog-add-object", "Add object in the world");

exports.dialog_add_object = dialog_add_object = $("#dialog-add-object").dialog({
    autoOpen: false,
    height: 400,
    width: 500,
    modal: true,
    buttons: {
        OK: function () {
            set_nb_object();
        },
        Cancel: function() {
            dialog_add_object.dialog("close");
        }
    },
    close: function() {
        add_object_form[0].reset();
    }
});

function set_nb_object () {
    "use strict";
    RUR.add_object(RUR.state.specific_object, RUR.state.x, RUR.state.y,
        {min: parseInt($("#input-add-number").val(), 10),
         max: parseInt($("#maximum-number").val(), 10),
         replace: true});
    RUR.vis_world.refresh_world_edited();
    dialog_add_object.dialog("close");
    return true;
}

add_object_form = dialog_add_object.find("form").on("submit", function( event ) {
    event.preventDefault();
    set_nb_object();
});

},{"./../../lang/msg.js":95,"./../drawing/visible_world.js":10,"./../rur.js":44,"./../world_api/objects.js":80}],3:[function(require,module,exports){

require("./../libs/jquery.ui.dialog.minmax.js");
require("./../rur.js");
var update_titles = require("./../../lang/msg.js").update_titles;


RUR.create_and_activate_dialogs = function(button, element, add_options, special_fn) {
    var options = {
    minimize: true,
    maximize: false,
    autoOpen: false,
    width: 800,
    height: 600,
    position: {my: "center", at: "center", of: window},
    beforeClose: function( event, ui ) {
            button.addClass("blue-gradient").removeClass("active-element");
            if (special_fn !== undefined){
                special_fn();
            }
        }
    };
    for (var attrname in add_options) {
        options[attrname] = add_options[attrname];
    }

    button.on("click", function(evt) {
        element.dialog(options);
        button.toggleClass("blue-gradient");
        button.toggleClass("active-element");
        if (button.hasClass("active-element")) {
            element.dialog("open");
        } else {
            element.dialog("close");
        }
        if (special_fn !== undefined && element.dialog("isOpen")){
            special_fn();
        }
        update_titles();
    });
};

$(document).ready( function () {
    RUR.create_and_activate_dialogs($("#more-menus-button"), $("#more-menus"), {height:700});
    RUR.create_and_activate_dialogs($("#special-keyboard-button"), $("#special-keyboard"),
            {autoOpen:false, width:750,  height:330, maximize: false, position:"left"});

    $("#Reeborg-concludes").dialog({minimize: false, maximize: false, autoOpen:false, width:500, dialogClass: "concludes",
                                    position:{my: "left", at: "left", of: $("#editor-panel")}});
    $("#Reeborg-shouts").dialog({minimize: false, maximize: false, autoOpen:false, width:500, dialogClass: "alert",
                                    position:{my: "left", at: "left", of: $("#editor-panel")}});
    $("#Reeborg-writes").dialog({minimize: false, maximize: false, autoOpen:false, width:800, height:350,
                                    position:{my: "bottom", at: "bottom-20", of: window}});

    // TODO: see if Reeborg-explores is still needed
    $("#Reeborg-explores").dialog({minimize: false, maximize: false, autoOpen:false, width:600,
                                    position:{my: "center", at: "center", of: $("#robot-canvas")}});
    $("#Reeborg-proclaims").dialog({minimize: false, maximize: false, autoOpen:false, width:800, height:400, dialogClass: "proclaims",
                                    position:{my: "bottom", at: "bottom-80", of: window}});
    $("#Reeborg-watches").dialog({minimize: false, maximize: false, autoOpen:false, width:600, height:400, dialogClass: "watches",
                                    position:{my: "bottom", at: "bottom-140", of: window}});

});

},{"./../../lang/msg.js":95,"./../libs/jquery.ui.dialog.minmax.js":17,"./../rur.js":44}],4:[function(require,module,exports){
require("./../rur.js");
require("./../programming_api/exceptions.js");
require("./../utils/key_exist.js");
require("./../translator.js");
require("./../utils/validator.js");
require("./../utils/supplant.js");

require("./../drawing/visible_world.js");
var msg = require("./../../lang/msg.js");

msg.record_id("give-number-of-objects", "Number of objects:");
msg.record_id("unlimited-text", "Unlimited:");
msg.record_id("give-object-explain", "GIVE OBJECT EXPLAIN");
msg.record_id("input-give-number");
msg.record_id("unlimited-number");
msg.record_id("dialog-give-object");
msg.record_title("ui-dialog-title-dialog-give-object", "Give object to robot");

exports.dialog_give_object = dialog_give_object = $("#dialog-give-object").dialog({
    autoOpen: false,
    height: 400,
    width: 500,
    modal: true,
    buttons: {
        OK: function () {
            give_object();
        },
        Cancel: function() {
            dialog_give_object.dialog("close");
        }
    },
    close: function() {
        give_object_form[0].reset();
    }
});
give_object = function () {
    "use strict";
    var query, give_number_result, unlimited_number_result;
    give_number_result = parseInt($("#input-give-number").val(), 10);
    unlimited_number_result = $("#unlimited-number").prop("checked");
    if (unlimited_number_result){
        query = "infinite";
    } else {
        query = give_number_result;
    }
    RUR.give_object_to_robot(RUR.state.specific_object, query);
    RUR.vis_world.refresh_world_edited();
    dialog_give_object.dialog("close");
    return true;
};
give_object_form = dialog_give_object.find("form").on("submit", function( event ) {
    event.preventDefault();
    give_object();
});


/** @function give_object_to_robot
 * @memberof RUR
 * @instance
 * @summary Give a specified number of object to a robot (body). If the robot,
 *     is not specified, the default robot is used.
 *
 *
 * @param {string} obj The name of the object type ; e.g. "token"
 * @param {integer} nb - Number of objects at that location;
 *           a value of zero is used to remove objects.
 * @param {robot.body} [robot_body]
 */

RUR.give_object_to_robot = function (obj, nb, robot) {
    var _nb, world=RUR.get_current_world(), translated_arg=RUR.translate_to_english(obj);

    if (RUR.KNOWN_THINGS.indexOf(translated_arg) == -1){
        throw new RUR.ReeborgError(RUR.translate("Unknown object").supplant({obj: obj}));
    }

    obj = translated_arg;
    if (robot === undefined){
        robot = world.robots[0];
    }
    RUR.utils.ensure_key_for_obj_exists(robot, "objects");

    _nb = RUR.utils.filterInt(nb); // required for the menu-driven world editor
    if (_nb == "infinite") {
        robot.objects[obj] = _nb;
    } else if (_nb >= 0) {
        if (_nb !== 0) {
            robot.objects[obj] = _nb;
        } else if (robot.objects[obj] !== undefined) {
            delete robot.objects[obj];
        }
    } else {
        RUR.show_feedback("#Reeborg-shouts", nb + RUR.translate(" is not a valid value!"));
    }
};

},{"./../../lang/msg.js":95,"./../drawing/visible_world.js":10,"./../programming_api/exceptions.js":28,"./../rur.js":44,"./../translator.js":46,"./../utils/key_exist.js":66,"./../utils/supplant.js":71,"./../utils/validator.js":72}],5:[function(require,module,exports){
require("./../drawing/visible_world.js");
require("./../world_api/objects.js");
require("./../rur.js");

var msg = require("./../../lang/msg.js");

msg.record_id("dialog-goal-object");
msg.record_title("ui-dialog-title-dialog-goal-object", "Set goal number for object");
msg.record_id("dialog-goal-object-explain", "dialog-goal-object-explain");
msg.record_id("input-goal-number-text", "Number of objects");
msg.record_id("all-objects-text", "All such objects");

exports.dialog_goal_object = dialog_goal_object = $("#dialog-goal-object").dialog({
    autoOpen: false,
    height: 400,
    width: 500,
    modal: true,
    buttons: {
        OK: function () {
            goal_objects();
        },
        Cancel: function() {
            dialog_goal_object.dialog("close");
        }
    },
    close: function() {
        goal_objects_form[0].reset();
    }
});
goal_objects = function () {
    "use strict";
    var goal = true;
    if ( $("#all-objects").prop("checked") ){
        goal =  "all";
    }
    RUR.add_object(RUR.state.specific_object, RUR.state.x, RUR.state.y,
        {min: parseInt($("#input-goal-number").val(), 10),
         goal: goal, replace: true})
    RUR.vis_world.refresh_world_edited();
    dialog_goal_object.dialog("close");
    return true;
};
goal_objects_form = dialog_goal_object.find("form").on("submit", function( event ) {
    event.preventDefault();
    goal_objects();
});

},{"./../../lang/msg.js":95,"./../drawing/visible_world.js":10,"./../rur.js":44,"./../world_api/objects.js":80}],6:[function(require,module,exports){
require("./../drawing/visible_world.js");
var msg = require("./../../lang/msg.js");

msg.record_id("color-selection-text", "Colour:");
msg.record_id("colour-selection");
msg.record_id("dialog-select-colour");
msg.record_title("ui-dialog-title-dialog-select-colour", "Enter a colour");

exports.dialog_select_colour = dialog_select_colour = $("#dialog-select-colour").dialog({
    autoOpen: false,
    height: 400,
    width: 500,
    modal: true,
    buttons: {
        OK: function () {
            select_colour();
        },
        Cancel: function() {
            dialog_select_colour.dialog("close");
        }
    }
});

dialog_select_colour.find("form").on("submit", function( event ) {
    event.preventDefault();
    select_colour();
});

select_colour = function () {
    var colour = $("#colour-selection").val();
    if (!colour) {
        colour = false;
    }
    dialog_select_colour.dialog("close");
    RUR._CALLBACK_FN(colour);
    RUR.vis_world.draw_all();
};

},{"./../../lang/msg.js":95,"./../drawing/visible_world.js":10}],7:[function(require,module,exports){
require("./../drawing/visible_world.js");
var msg = require("./../../lang/msg.js");
var dialog;

msg.record_id("dialog-set-background-image");
msg.record_title("ui-dialog-title-dialog-set-background-image", "Background image");

exports.dialog_set_background_image = dialog = $("#dialog-set-background-image").dialog({
    autoOpen: false,
    height: 400,
    width: 500,
    modal: true,
    buttons: {
        OK: function () {
            set_background_image();
        },
        Cancel: function() {
            dialog.dialog("close");
        }
    }
});
dialog.find("form").on("submit",
    function( event ) {
        event.preventDefault();
        set_background_image();
});
set_background_image = function () {
    var url = $("#image-url").val();
    if (!url) {
        url = '';
    }
    RUR.get_current_world().background_image = url;
    RUR.BACKGROUND_IMAGE.src = url;
    RUR.BACKGROUND_IMAGE.onload = RUR.vis_world.draw_all;
    dialog.dialog("close");
};

},{"./../../lang/msg.js":95,"./../drawing/visible_world.js":10}],8:[function(require,module,exports){
require("./../rur.js");
require("./../drawing/visible_world.js"); // for RUR.set_world_size

var msg = require("./../../lang/msg.js");
var set_dimension_form;


function trim_world (new_max_x, new_max_y, old_max_x, old_max_y) {
    var x, y, coords, world=RUR.get_current_world();
    // remove stuff from outside new boundaries

    for (x = new_max_x+1; x <= old_max_x; x++) {
        for (y = 1; y <= old_max_y; y++) {
            coords = x + "," + y;
            remove_all_at_location(coords);
        }
    }
    for (x = 1; x <= old_max_x; x++) {
        for (y = new_max_y+1; y <= old_max_y; y++) {
            coords = x + "," + y;
            remove_all_at_location(coords);
        }
    }
    if (world.possible_initial_positions !== undefined) {
        delete world.possible_initial_positions;
    }
    if (world.goal !== undefined) {
        if (world.goal.possible_final_positions !== undefined) {
            delete world.goal.possible_final_positions;
        }
    }
}

function remove_all_at_location (coords) {
    var world = RUR.get_current_world();
    // trading efficiency for clarity
    if (world.tiles !== undefined) {
        if (world.tiles[coords] !== undefined){
            delete world.tiles[coords];
        }
    }
    if (world.bridge !== undefined) {
        if (world.bridge[coords] !== undefined){
            delete world.bridge[coords];
        }
    }
    if (world.decorative_objects !== undefined) {
        if (world.decorative_objects[coords] !== undefined){
            delete world.decorative_objects[coords];
        }
    }
    if (world.obstacles !== undefined) {
        if (world.obstacles[coords] !== undefined){
            delete world.obstacles[coords];
        }
    }
    if (world.pushables !== undefined) {
        if (world.pushables[coords] !== undefined){
            delete world.pushables[coords];
        }
    }
    if (world.walls !== undefined) {
        if (world.walls[coords] !== undefined){
            delete world.walls[coords];
        }
    }
    if (world.objects !== undefined) {
        if (world.objects[coords] !== undefined){
            delete world.objects[coords];
        }
    }
    if (world.goal !== undefined) {
        if (world.goal.walls !== undefined) {
            if (world.goal.walls[coords] !== undefined){
                delete world.goal.walls[coords];
            }
        }
        if (world.goal.objects !== undefined) {
            if (world.goal.objects[coords] !== undefined){
                delete world.goal.objects[coords];
            }
        }
    }
}

msg.record_id("dialog-set-dimensions");
msg.record_title("ui-dialog-title-dialog-set-dimensions", "Set the world's dimensions");
msg.record_id("set-dimensions-explain", "set-dimensions-explain");
msg.record_id("input-max-x-text", "Maximum x value:");
msg.record_id("input-max-y-text", "Maximum y value:");
msg.record_id("use-small-tiles-text", "Use small tiles");

RUR.dialog_set_dimensions = $("#dialog-set-dimensions").dialog({
    autoOpen: false,
    height: 400,
    width: 500,
    modal: true,
    buttons: {
        OK: function () {
            set_dimension();
        },
        Cancel: function() {
            RUR.dialog_set_dimensions.dialog("close");
        }
    },
    close: function() {
        set_dimension_form[0].reset();
    }
});
function set_dimension () {
    "use strict";
    var max_x, max_y, world = RUR.get_current_world();
    max_x = parseInt($("#input-max-x").val(), 10);
    max_y = parseInt($("#input-max-y").val(), 10);
    world.small_tiles = $("#use-small-tiles").prop("checked");

    trim_world(max_x, max_y, RUR.MAX_X, RUR.MAX_Y);   // remove extra objects
    RUR.set_world_size(max_x, max_y);
    RUR.dialog_set_dimensions.dialog("close");
    return true;
}
set_dimension_form = RUR.dialog_set_dimensions.find("form").on("submit", function( event ) {
    event.preventDefault();
    set_dimension();
});

},{"./../../lang/msg.js":95,"./../drawing/visible_world.js":10,"./../rur.js":44}],9:[function(require,module,exports){

require("./../rur.js");
require("./../utils/validator.js");
var record_id = require("./../../lang/msg.js").record_id;
record_id("robot0");
record_id("robot1");
record_id("robot2");
record_id("robot3");

RUR.vis_robot = {};
RUR.vis_robot.images = {};

// we will keep track if we have loaded all images
RUR.vis_robot.loaded_images = 0;
RUR.vis_robot.nb_images = 0;

// enable changing defaults for unit tests or if put on different server location
RUR.BASE_URL = RUR.BASE_URL || '';

function set_images(images) {
    "use strict"
    var default_images, robot, model = images.model;

    default_images = {east: RUR.BASE_URL + '/src/images/robot_e.png',
        north: RUR.BASE_URL + '/src/images/robot_n.png',
        west: RUR.BASE_URL + '/src/images/robot_w.png',
        south: RUR.BASE_URL + '/src/images/robot_s.png'
    }

    if (RUR.KNOWN_ROBOT_MODELS.indexOf(model) == -1) {
        RUR.KNOWN_ROBOT_MODELS.push(model);
    }

    if (RUR.vis_robot.images[model] === undefined) {
        RUR.vis_robot.images[model] = {};
        robot = RUR.vis_robot.images[model];
        robot.robot_e_img = new Image();
        robot.robot_n_img = new Image();
        robot.robot_w_img = new Image();
        robot.robot_s_img = new Image();
    } else {
        robot = RUR.vis_robot.images[model];
    }

    if (robot.robot_e_img.src != images.east) {
        robot.robot_e_img.src = images.east || default_images.east;
        robot.e_url = images.east || '/src/images/robot_e.png';
        robot.robot_e_img.onload = RUR.onload_new_image;
        RUR.state.reset_default_robot_images_needed = true;
    }
    if (robot.robot_n_img.src != images.north) {
        robot.robot_n_img.src = images.north || default_images.north;
        robot.n_url = images.north || '/src/images/robot_n.png';
        robot.robot_n_img.onload = RUR.onload_new_image;
        RUR.state.reset_default_robot_images_needed = true;
    }
    if (robot.robot_w_img.src != images.west) {
        robot.robot_w_img.src = images.west || default_images.west;
        robot.w_url = images.west || '/src/images/robot_w.png';
        robot.robot_w_img.onload = RUR.onload_new_image;
        RUR.state.reset_default_robot_images_needed = true;
    }
    if (robot.robot_s_img.src != images.south) {
        robot.robot_s_img.src = images.south || default_images.south;
        robot.s_url = images.south || '/src/images/robot_s.png';
        robot.robot_s_img.onload = RUR.onload_new_image;
        RUR.state.reset_default_robot_images_needed = true;
    }
}

RUR.reset_default_robot_images = function () {
    "use strict"
    var saved_model;
    set_images({model: "classic"}); // classic; uses default
    set_images({model: "2d red rover",
        east: RUR.BASE_URL + '/src/images/rover_e.png',
        north: RUR.BASE_URL + '/src/images/rover_n.png',
        west: RUR.BASE_URL + '/src/images/rover_w.png',
        south: RUR.BASE_URL + '/src/images/rover_s.png'
    });
    set_images({model: "3d red rover",
        east: RUR.BASE_URL + '/src/images/plain_e.png',
        north: RUR.BASE_URL + '/src/images/plain_n.png',
        west: RUR.BASE_URL + '/src/images/plain_w.png',
        south: RUR.BASE_URL + '/src/images/plain_s.png'
    });
    set_images({model: "solar panel",
        east: RUR.BASE_URL + '/src/images/sp_e.png',
        north: RUR.BASE_URL + '/src/images/sp_n.png',
        west: RUR.BASE_URL + '/src/images/sp_w.png',
        south: RUR.BASE_URL + '/src/images/sp_s.png'
    });

    $("#robot0 img").attr("src", RUR.vis_robot.images["classic"].robot_e_img.src);
    $("#robot1 img").attr("src", RUR.vis_robot.images["2d red rover"].robot_e_img.src);
    $("#robot2 img").attr("src", RUR.vis_robot.images["3d red rover"].robot_e_img.src);
    $("#robot3 img").attr("src", RUR.vis_robot.images["solar panel"].robot_e_img.src);

    // handle situation where the user had saved values from old naming styles
    saved_model = localStorage.getItem("robot_default_model");
    if (saved_model==0 || saved_model==1 || saved_model==2 || saved_model==3) {
        saved_model = RUR.reeborg_default_model;
        localStorage.setItem("robot_default_model", saved_model);
    }
    RUR.user_selected_model = saved_model;
    RUR.select_default_robot_model(saved_model);

    // additional robot images from rur-ple
    set_images({model: "blue",
        east: RUR.BASE_URL + '/src/images/blue_robot_e.png',
        north: RUR.BASE_URL + '/src/images/blue_robot_n.png',
        west: RUR.BASE_URL + '/src/images/blue_robot_w.png',
        south: RUR.BASE_URL + '/src/images/blue_robot_s.png'
    });
    set_images({model: "purple",
        east: RUR.BASE_URL + '/src/images/purple_robot_e.png',
        north: RUR.BASE_URL + '/src/images/purple_robot_n.png',
        west: RUR.BASE_URL + '/src/images/purple_robot_w.png',
        south: RUR.BASE_URL + '/src/images/purple_robot_s.png'
    });
    set_images({model: "green",
        east: RUR.BASE_URL + '/src/images/green_robot_e.png',
        north: RUR.BASE_URL + '/src/images/green_robot_n.png',
        west: RUR.BASE_URL + '/src/images/green_robot_w.png',
        south: RUR.BASE_URL + '/src/images/green_robot_s.png'
    });
    set_images({model: "light blue",
        east: RUR.BASE_URL + '/src/images/light_blue_robot_e.png',
        north: RUR.BASE_URL + '/src/images/light_blue_robot_n.png',
        west: RUR.BASE_URL + '/src/images/light_blue_robot_w.png',
        south: RUR.BASE_URL + '/src/images/light_blue_robot_s.png'
    });
    set_images({model: "yellow",
        east: RUR.BASE_URL + '/src/images/yellow_robot_e.png',
        north: RUR.BASE_URL + '/src/images/yellow_robot_n.png',
        west: RUR.BASE_URL + '/src/images/yellow_robot_w.png',
        south: RUR.BASE_URL + '/src/images/yellow_robot_s.png'
    });
    RUR.state.reset_default_robot_images_needed = false;
};

RUR.select_default_robot_model = function (model) {
    "use strict";
    var robot;

    if ( !(model == "classic" || model == "2d red rover"
           || model == "3d red rover" || model == "solar panel")){
        model = RUR.reeborg_default_model;
    }
    // the user could click on the robot model buttons when there are
    // no robot present in the world.
    try {
        robot = RUR.get_current_world().robots[0];
        robot.model = model;
        RUR.user_selected_model = model;
    } catch (e) {}

    RUR.vis_robot.e_img = RUR.vis_robot.images[model].robot_e_img;
    RUR.vis_robot.n_img = RUR.vis_robot.images[model].robot_n_img;
    RUR.vis_robot.w_img = RUR.vis_robot.images[model].robot_w_img;
    RUR.vis_robot.s_img = RUR.vis_robot.images[model].robot_s_img;
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.refresh();
    }
    localStorage.setItem("robot_default_model", model);
};
$("#robot0").on("click", function (evt) {
    RUR.select_default_robot_model("classic");
});

$("#robot1").on("click", function (evt) {
    RUR.select_default_robot_model("2d red rover");
});

$("#robot2").on("click", function (evt) {
    RUR.select_default_robot_model("3d red rover");
});

$("#robot3").on("click", function (evt) {
    RUR.select_default_robot_model("solar panel");
});

RUR.reset_default_robot_images();
// the following is to try to ensure that the images are loaded before the "final"
// original drawing is made

RUR.vis_robot.e_img.onload = function () {
    RUR.vis_robot.loaded_images += 1;
};
RUR.vis_robot.nb_images += 1;
RUR.vis_robot.w_img.onload = function () {
    RUR.vis_robot.loaded_images += 1;
};
RUR.vis_robot.nb_images += 1;
RUR.vis_robot.n_img.onload = function () {
    RUR.vis_robot.loaded_images += 1;
};
RUR.vis_robot.nb_images += 1;
RUR.vis_robot.s_img.onload = function () {
    RUR.vis_robot.loaded_images += 1;
};
RUR.vis_robot.nb_images += 1;

/**@function animate_robot
 * @memberof RUR
 * @instance
 *
 * @desc Robot animation is done by cycling through a list of robot models,
 * each model having 4 images (one for each orientation).
 *
 * @param {array} models A list of robot models. If the list contains a single
 * model, the animation is stopped.
 * @param {object} robot_body A robot_body object.
 */

RUR.animate_robot = function (models, robot_body) {
    "use strict"
    if (robot_body === undefined) {
        robot_body = RUR.get_current_world().robots[0];
    }
    if (models.length > 1) {
        robot_body.models_cycle = models;
        robot_body.model_index = 0;
    } else {
        robot_body.models_cycle = null;
        robot_body.model = models[0];
    }
    RUR.record_frame("animate robot", robot_body.__id);
    RUR.state.animated_robots = true;
};

function update_model(robot) { // robot == robot.body
    var default_robot, nb_models = robot.models_cycle.length;

    if (robot.model_index == undefined) {
        robot.model_index = 0;
    }
    robot.model = robot.models_cycle[robot.model_index];

    default_robot = RUR.get_current_world().robots[0];
    if (default_robot.__id == robot.__id) {
        RUR.user_selected_model = undefined;  // overrides the user's choice
    }
    // do we cycle through the value; a model number of -1 ends a cycle
    if (robot.model_index == nb_models-2){
        if (robot.models_cycle[robot.model_index+1] == -1){
            return;
        }
    }
    robot.model_index += 1;
    robot.model_index %= nb_models;
    return;
};


RUR.vis_robot.draw = function (robot) {
    "use strict";
    var x, y, width, height, image, default_robot;
    if (!robot) {
        console.warn("RUR.vis_robot.draw called with no robot.");
        return;
    }

    // handling legacy Code
    if (robot.orientation !== undefined) {
        robot._orientation = robot.orientation;
        robot.orientation = null;
    }
    if (robot.x > RUR.MAX_X || robot.y > RUR.MAX_Y) {
        return;
    }

    // all images are taken to be centered on a tile 40x40, which are scaled
    //  appropriately
    width = RUR.TILE_SIZE * RUR.SCALE;
    height = RUR.TILE_SIZE * RUR.SCALE;

    x = robot.x*RUR.WALL_LENGTH + RUR.WALL_THICKNESS/2;
    y = RUR.HEIGHT - (robot.y+1)*RUR.WALL_LENGTH + RUR.WALL_THICKNESS/2;

    if (robot.models_cycle) {
        update_model(robot);
    }

    if (robot.model == undefined) {
        robot.model = RUR.reeborg_default_model;
    } else if (RUR.KNOWN_ROBOT_MODELS.indexOf(robot.model) == -1) {
        console.warn("robot model not defined: " + robot.model);
        robot.model = RUR.reeborg_default_model;
    }

    if (RUR.user_selected_model !== undefined) {
        default_robot = RUR.get_current_world().robots[0];
        if (default_robot.__id == robot.__id ) {
            robot.model = RUR.user_selected_model;
        }
    }

    switch(robot._orientation){
        case RUR.EAST:
            image = RUR.vis_robot.images[robot.model].robot_e_img;
            break;
        case RUR.NORTH:
            image = RUR.vis_robot.images[robot.model].robot_n_img;
            break;
        case RUR.WEST:
            image = RUR.vis_robot.images[robot.model].robot_w_img;
            break;
        case RUR.SOUTH:
            image = RUR.vis_robot.images[robot.model].robot_s_img;
            break;
        case -1:
            RUR.vis_robot.draw_random(robot);
            break;
        default:
            image = RUR.vis_robot.e_img;
        }
    if (robot._orientation != -1){
        RUR.ROBOT_CTX.drawImage(image, x, y, width, height);
    }
    if (RUR.state.editing_world){
        return;
    }
    RUR.vis_robot.draw_trace_history(robot);
};


// drawing random orientation robot
RUR.vis_robot.draw_random = function (robot) {
    "use strict";
    var x, y, width, height, image, random_orientation;
    if (!robot) {
        console.warn("RUR.vis_robot.draw_random called with no robot.");
        return;
    }

    if (!(robot._orientation == -1 || robot.orientation == -1)) {
        console.warn("RUR.vis_robot.draw_random but orientation != -1.");
        return;
    }
    if (robot.x > RUR.MAX_X || robot.y > RUR.MAX_Y) {
        return;
    }

    // all images are taken to be centered on a tile 40x40, which are scaled
    //  appropriately
    width = RUR.TILE_SIZE * RUR.SCALE;
    height = RUR.TILE_SIZE * RUR.SCALE;

    x = robot.x*RUR.WALL_LENGTH + RUR.WALL_THICKNESS/2;
    y = RUR.HEIGHT - (robot.y+1)*RUR.WALL_LENGTH + RUR.WALL_THICKNESS/2;

    random_orientation = Math.floor(Math.random() * 4)
    switch(random_orientation){
        case RUR.EAST:
            if (robot.model !== undefined){
                image = RUR.vis_robot.images[robot.model].robot_e_img;
            } else {
                image = RUR.vis_robot.e_img;
            }
            break;
        case RUR.NORTH:
            if (robot.model !== undefined){
                image = RUR.vis_robot.images[robot.model].robot_n_img;
            } else {
                image = RUR.vis_robot.n_img;
            }
            break;
        case RUR.WEST:
            if (robot.model !== undefined){
                image = RUR.vis_robot.images[robot.model].robot_w_img;
            } else {
                image = RUR.vis_robot.w_img;
            }
            break;
        case RUR.SOUTH:
            if (robot.model !== undefined){
                image = RUR.vis_robot.images[robot.model].robot_s_img;
            } else {
                image = RUR.vis_robot.s_img;
            }
            break;
        default:
            image = RUR.vis_robot.e_img;
            console.warn("default should not happen in RUR.vis_robot.draw_random.");
        }
    RUR.ROBOT_ANIM_CTX.drawImage(image, x, y, width, height);
    RUR.state.random_robot = true;
};


RUR.vis_robot.draw_trace_history  = function(robot) {
    var segment;
    for (segment of robot._trace_history) { //jshint ignore:line
        RUR.vis_robot.draw_trace_segment(segment);
    }
};

RUR.vis_robot.draw_trace_segment = function (segment) {
    "use strict";
    var ctx = RUR.TRACE_CTX;
    ctx.strokeStyle = segment["color"];
    ctx.lineWidth = segment["thickness"];
    ctx.lineCap = "round";

    ctx.beginPath();
    ctx.moveTo(segment["prev_x"], segment["prev_y"]);
    ctx.lineTo(segment["x"], segment["y"]);
    ctx.stroke();
};

/** @function new_robot_images
 * @memberof RUR
 * @instance
 *
 * @desc Create new images for the robot.
 *
 * **Suggestion**: use in the Onload editor, so that images can be fetched
 * as soon as the world is loaded.
 *
 * **Python**: You _can_ use `new_robot_images` without the `RUR` prefix. For the
 * French version, you can use `nouvelles_images_de_robot`. However, the
 * function described here is preferable as it can be used with either
 * Javascript or Python.
 *
 * @param {images} images A Javascript object (similar to a Python dict) that
 * holds the relevant attributes.
 *
 * @param {string} [images.model]  The model name of the robot. Integer values
 * will be accepted as well except for -1 which will raise an error. If the
 * model is not specified, the value `"anonymous"` will be used.
 *
 * @param {string} [images.east]  A url for the source of the image to be used
 * for the robot in the East orientation. If it is not specified, the
 * default "classic" image will be used.
 *
 * @param {string} [images.north]  Similar to `images.east`.
 * @param {string} [images.west]  Similar to `images.east`.
 * @param {string} [images.south]  Similar to `images.east`.
 *
 */

RUR.new_robot_images = function (images) {
    if (images.model !== undefined) {
        if (images.model == -1) {
            throw new RUR.ReeborgError(RUR.translate("Robot model cannot be -1."));
        }
    } else {
        images.model = "anonymous";
    }
    set_images(images);
};

/** @function show_all_robots
 * @memberof RUR
 * @instance
 *
 * @summary This method shows all known robot models in a table.
 *
 */
RUR.show_all_robots = function () {
    var info, model, east, north, west, south, e_url, w_url, s_url, n_url;
    info = "<table border='1'><tr><th>model</th><th>east</th><th>north</th><th>west</th><th>south</th></tr>";

    for (model in RUR.vis_robot.images) {
        if (RUR.vis_robot.images.hasOwnProperty(model)) {
            east = RUR.vis_robot.images[model].robot_e_img.src;
            north = RUR.vis_robot.images[model].robot_n_img.src;
            west = RUR.vis_robot.images[model].robot_w_img.src;
            south = RUR.vis_robot.images[model].robot_s_img.src;
            e_url = RUR.vis_robot.images[model].e_url;
            n_url = RUR.vis_robot.images[model].n_url;
            w_url = RUR.vis_robot.images[model].w_url;
            s_url = RUR.vis_robot.images[model].s_url;

            info += "<tr><td>" +  model + "</td>";
            info += "<td><img src = '" + east + "'><br>" + e_url + "</td>";
            info += "<td><img src = '" + north + "'><br>" + n_url + "</td>";
            info += "<td><img src = '" + west + "'><br>" + w_url + "</td>";
            info += "<td><img src = '" + south + "'><br>" + s_url + "</td></tr>";
        }
    }

    info += "</table>";
    RUR._print_html_(info, true); // true will replace existing content
    return null; // for the python repl
};


},{"./../../lang/msg.js":95,"./../rur.js":44,"./../utils/validator.js":72}],10:[function(require,module,exports){
require("./../rur.js");
require("./../translator.js");
require("./../world_api/things.js"); // why ?

//TODO add overlay object (like sensor)

RUR.vis_world = {};

RUR.vis_world.refresh_world_edited = function () {
    RUR.vis_world.draw_all();
    RUR.world_get.world_info();
};

/** @function set_world_size
 * @memberof RUR
 * @instance
 *
 * @desc Change the size of the world
 *
 * @param {integer} max_x The width of the world. Internally, we use
 * `cols` instead of `max_x`.
 * @param {integer} max_y The height of the world. Internally, we use
 * `rows` instead of `max_y`.
 */

RUR.set_world_size = function (max_x, max_y) {
    "use strict";
    var height, width, canvas, world;
    set_scale();

    if (max_x !== undefined && max_y !== undefined) {
        height = (max_y + 1.5) * RUR.WALL_LENGTH;
        width = (max_x + 1.5) * RUR.WALL_LENGTH;
        RUR.MAX_Y = max_y;
        RUR.MAX_X = max_x;
    } else {
        height = (RUR.MAX_Y + 1.5) * RUR.WALL_LENGTH;
        width = (RUR.MAX_X + 1.5) * RUR.WALL_LENGTH;
    }

    world = RUR.get_current_world();
    world.rows = RUR.MAX_Y;
    world.cols = RUR.MAX_X;

    if (height !== RUR.HEIGHT || width !== RUR.WIDTH) {
        for (canvas of RUR.CANVASES) { //jshint ignore:line
            canvas.width = width;
            canvas.height = height;
        }
        RUR.HEIGHT = height;
        RUR.WIDTH = width;
    }

    RUR.vis_world.draw_all();
};

function set_scale () {
    if (RUR.get_current_world().small_tiles) {
        RUR.WALL_LENGTH = RUR.DEFAULT_WALL_LENGTH/2;
        RUR.WALL_THICKNESS = RUR.DEFAULT_WALL_THICKNESS/2;
        RUR.SCALE = 0.5;
        RUR.BACKGROUND_CTX.font = "8px sans-serif";
    } else {
        RUR.WALL_LENGTH = RUR.DEFAULT_WALL_LENGTH;
        RUR.WALL_THICKNESS = RUR.DEFAULT_WALL_THICKNESS;
        RUR.SCALE = 1;
        RUR.BACKGROUND_CTX.font = "bold 12px sans-serif";
    }
}

// retaining compatibility with some of Vincent Maille's worlds.
RUR.vis_world.compute_world_geometry = RUR.set_world_size;

RUR.vis_world.draw_all = function () {
    "use strict";
    var ctx, world = RUR.get_current_world();
    if (world.blank_canvas) { // for game environment
        if (RUR.state.editing_world) {
            RUR.show_feedback("#Reeborg-shouts",
                                RUR.translate("Editing of blank canvas is not supported."));
            return;
         }
        clearTimeout(RUR.ANIMATION_FRAME_ID);
        RUR.ANIMATION_FRAME_ID = undefined;
        for (ctx of RUR.ALL_CTX) {
            ctx.clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);
        }
        return;
    }

    RUR.BACKGROUND_CTX.clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);
    if (RUR.get_current_world().background_image !== undefined) {
        draw_background_image(RUR.BACKGROUND_IMAGE);
    } else {
        draw_grid_walls(RUR.BACKGROUND_CTX);
    }

    draw_coordinates();
    RUR.animated_images = false;
    RUR.vis_world.refresh();
};


RUR.vis_world.clear_all_ctx = function () {
    // useful for graphics.py
    for (var ctx of RUR.ALL_CTX) {
        ctx.clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);
    }
};


RUR.vis_world.refresh = function () {
    "use strict";
    var canvas, canvases, goal, world = RUR.get_current_world();

    if (world.blank_canvas) {
        return;
    }
    // This is not the most efficient way to do things; ideally, one
    // would keep track of changes (e.g. addition or deletion of objects)
    // and only redraw when needed.  However, it is not critical at
    // the moment
    canvases = ["TILES_CTX", "BRIDGE_CTX", "DECORATIVE_OBJECTS_CTX",
                "OBSTACLES_CTX", "GOAL_CTX", "OBJECTS_CTX",
                "PUSHABLES_CTX", "TRACE_CTX", "WALL_CTX", "ROBOT_CTX"];
    for (canvas of canvases) {
        RUR[canvas].clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);
    }

    draw_border(RUR.WALL_CTX);
    draw_tiles(world.tiles, RUR.TILES_CTX);
    draw_tiles(world.bridge, RUR.BRIDGE_CTX);
    draw_tiles(world.decorative_objects, RUR.DECORATIVE_OBJECTS_CTX);
    draw_tiles(world.obstacles, RUR.OBSTACLES_CTX);
    draw_tiles(world.pushables, RUR.PUSHABLES_CTX);
    draw_tiles(world.walls, RUR.WALL_CTX);
    draw_tiles(world.objects, RUR.OBJECTS_CTX);
    if (world._CORRECT_PATH && world._CORRECT_PATH.length > 0) {
        try {
            draw_correct_path(world._CORRECT_PATH, world._CORRECT_PATH_COLOR);
        } catch (e) {
            console.warn("problem with draw_correct_path", e);
        }
    }
    draw_info();     // on ROBOT_CTX
    if (RUR.ROBOT_ANIMATION_FRAME_ID) {
        clearTimeout(RUR.ROBOT_ANIMATION_FRAME_ID);
    }
    draw_robots();  // on ROBOT_CTX; also draws the trace

    // Animated images are redrawn according to their own schedule
    // If we have not drawn any yet, we should see if we need to draw some
    if (!RUR.animated_images) {
        draw_animated_images();
    }

    if (RUR.state.editing_world || RUR.state.visible_grid) {
        // make them appear above background and tiles but below foreground walls.
        draw_grid_walls(RUR.GOAL_CTX, RUR.state.editing_world);
    }

    if (world.goal !== undefined){
        goal = true;
        if (world.goal.pushables !== undefined){
            draw_tiles(world.goal.pushables, RUR.GOAL_CTX, goal);
        }
        if (world.goal.objects !== undefined){
            draw_tiles(world.goal.objects, RUR.GOAL_CTX, goal);
        }
        if (world.goal.walls !== undefined){
            draw_tiles(world.goal.walls, RUR.GOAL_CTX, goal);
        }
        if (world.goal.position !== undefined) {
            draw_goal_position(world.goal);
        }
    }

};

function draw_coordinates () {
    "use strict";
    var x, y, ctx = RUR.BACKGROUND_CTX, grid_size=RUR.WALL_LENGTH;

    // for some reason, background font gets reset to "10px sans-serif"
    // when a session starts, this after I explicitly set it to
    // something else, and never set it to 10px anywhere in my code.
    // The code included here fixes this.
    if (RUR.get_current_world().small_tiles) {
        RUR.BACKGROUND_CTX.font = "8px sans-serif";
    } else {
        RUR.BACKGROUND_CTX.font = "bold 12px sans-serif";
    }

    ctx.fillStyle = RUR.COORDINATES_COLOR;
    y = RUR.HEIGHT + 5 - grid_size/2;
    for(x=1; x <= RUR.MAX_X; x++){
        ctx.fillText(x, (x+0.5)*grid_size, y);
    }
    x = grid_size/2 -5;
    for(y=1; y <= RUR.MAX_Y; y++){
        ctx.fillText(y, x, RUR.HEIGHT - (y+0.3)*grid_size);
    }

    ctx.fillStyle = RUR.AXIS_LABEL_COLOR;
    ctx.fillText("x", RUR.WIDTH/2, RUR.HEIGHT - 10);
    ctx.fillText("y", 5, RUR.HEIGHT/2 );
}

function draw_grid_walls (ctx, edit){
    "use strict";
    var i, j, image_e, image_n, wall_e, wall_n, draw_only_path, x, y,
        x_offset_e, x_offset_n, y_offset_e, y_offset_n;

    if (RUR.SCALE == 0.5) {  // small wall, adjust grid walls to be less visible
        ctx.save();
        ctx.globalAlpha = 0.3;
    } else if (!edit) {
        ctx.save();
        ctx.globalAlpha = 0.5;
    }

    if (edit) {
        wall_e = RUR.THINGS["east_edit"];
        wall_n = RUR.THINGS["north_edit"];
    } else {
        wall_e = RUR.THINGS["east_grid"];
        wall_n = RUR.THINGS["north_grid"];
    }

    image_e = wall_e.image;
    x_offset_e = wall_e.x_offset;
    y_offset_e = wall_e.y_offset;

    image_n = wall_n.image;
    x_offset_n = wall_n.x_offset;
    y_offset_n = wall_n.y_offset;

    /* draw_grid_wall is called initially to draw the grid on the background
       drawing context.
       If may also be called to draw on the goal drawing context (above the tile)
       if we are editing the world **or** if RUR.state.visible_grid evaluates
       to RUR.PATH_ONLY.
       
       If RUR.state.visible_grid is equal to RUR.PATH_ONLY
       and a desired path named RUR.public.path has been defined, then we only
       draw the grid on that desired path.

       If RUR.state.visible_grid is true but not equal to RUR.PATH_ONLY 
       OR if RUR.public.path is not defined 
       (or is not used for something that can be treated as
       as path below, raising an Error), 
       then we draw the grid everywhere.
     */

    draw_only_path = false;
    if (!edit && // always draw when edit
        RUR.state.visible_grid == RUR.PATH_ONLY && 
        RUR.public !== undefined && // should always be the case
        RUR.public.path !== undefined) { // world creator appears to have created a desired path
            draw_only_path = true;
        } 

    if (draw_only_path) {
        try {
            for (i=0; i < RUR.public.path.length; i++) {
                x = RUR.public.path[i][0];
                y = RUR.public.path[i][1];
                // draw all four grid "walls" surrounding each position
                draw_single_object(image_e, x, y, ctx, x_offset_e, y_offset_e);
                draw_single_object(image_e, x-1, y, ctx, x_offset_e, y_offset_e);
                draw_single_object(image_n, x, y, ctx, x_offset_n, y_offset_n);                
                draw_single_object(image_n, x, y-1, ctx, x_offset_n, y_offset_n);                
            }
        } catch (e) {
            draw_only_path = false;
        }
    }

    if (!draw_only_path) { // no path or previous attempt failed
        for (i = 1; i <= RUR.MAX_X; i++) {
            for (j = 1; j <= RUR.MAX_Y; j++) {
                // when drawing full grid, only need to draw East and North
                // grid "wall" for each location
                draw_single_object(image_e, i, j, ctx, x_offset_e, y_offset_e);
                draw_single_object(image_n, i, j, ctx, x_offset_n, y_offset_n);
            }
        }
    }


    if (RUR.SCALE == 0.5 || !edit) {
        ctx.restore();
    }
}

function draw_border (ctx) {
    "use strict";
    var j, image, wall, x_offset, y_offset;
    wall = RUR.THINGS["east_border"];
    image = wall.image;
    x_offset = wall.x_offset;
    y_offset = wall.y_offset;

    for (j = 1; j <= RUR.MAX_Y; j++) {
        draw_single_object(image, 0, j, ctx, x_offset, y_offset);
    }
    for (j = 1; j <= RUR.MAX_Y; j++) {
        draw_single_object(image, RUR.MAX_X, j, ctx, x_offset, y_offset);
    }

    wall = RUR.THINGS["north_border"];
    image = wall.image;
    x_offset = wall.x_offset;
    y_offset = wall.y_offset;

    for (j = 1; j <= RUR.MAX_X; j++) {
        draw_single_object(image, j, 0, ctx, x_offset, y_offset);
    }
    for (j = 1; j <= RUR.MAX_X; j++) {
        draw_single_object(image, j, RUR.MAX_Y, ctx, x_offset, y_offset);
    }
}


function draw_robots () {
    "use strict";
    var body, robot, robots = RUR.get_current_world().robots;
    if (!robots || robots[0] === undefined) {
        return;
    }
    for (robot=0; robot < robots.length; robot++){
        body = robots[robot];
        if (body._orientation == RUR.RANDOM_ORIENTATION) {
            continue;
        }
        if (body.possible_initial_positions !== undefined && body.possible_initial_positions.length > 1){
            draw_robot_clones(body);
        } else {
            RUR.vis_robot.draw(body); // draws trace automatically
        }
    }

    if (RUR.state.animated_robots) {
        RUR.ROBOT_ANIMATION_FRAME_ID = setTimeout(draw_robots,
            RUR.ROBOT_ANIMATION_TIME);
    }
}

function draw_random_robots (robots) {
    "use strict";
    var body, robot;
    if (!robots || robots[0] === undefined) {
        return;
    }
    for (robot=0; robot < robots.length; robot++){
        body = robots[robot];
        if (body._orientation != RUR.RANDOM_ORIENTATION) {
            continue;
        }
        if (body.possible_initial_positions !== undefined && body.possible_initial_positions.length > 1){
            draw_robot_clones(body, true);
        } else {
            RUR.vis_robot.draw_random(body);
        }
    }
}


function draw_robot_clones (robot, random){
    "use strict";
    var i, clone;
    if (random) {
        RUR.ROBOT_ANIM_CTX.save();
        RUR.ROBOT_ANIM_CTX.globalAlpha = 0.4;
    } else {
        RUR.ROBOT_CTX.save();
        RUR.ROBOT_CTX.globalAlpha = 0.4;
    }

    for (i=0; i < robot.possible_initial_positions.length; i++){
        clone = JSON.parse(JSON.stringify(robot));
        clone.x = robot.possible_initial_positions[i][0];
        clone.y = robot.possible_initial_positions[i][1];
        clone._prev_x = clone.x;
        clone._prev_y = clone.y;
        if (random) {
            RUR.vis_robot.draw_random(clone);
        } else {
            RUR.vis_robot.draw(clone);
        }
    }
    if (random) {
        RUR.ROBOT_ANIM_CTX.restore();
    } else {
        RUR.ROBOT_CTX.restore();
    }
}



function draw_goal_position (goal) {
    "use strict";
    var image, i, coord, x_offset, y_offset, ctx;

    ctx = RUR.GOAL_CTX;

    if (goal.position.image !== undefined &&
        typeof goal.position.image === 'string' &&
        RUR.THINGS[goal.position.image] !== undefined){
        image = RUR.THINGS[goal.position.image].image;
        x_offset = RUR.THINGS[goal.position.image].x_offset;
        y_offset = RUR.THINGS[goal.position.image].y_offset;
    } else {    // For anyone wondering, this step might be needed only when using older world
                // files that were created when there was not a choice
                // of image for indicating the home position.
                // In that case, it is ok to have x_offset and y_offset undefined.
        image = RUR.THINGS["green_home_tile"].image;
    }
    if (goal.possible_final_positions !== undefined && goal.possible_final_positions.length > 1){
        ctx.save();
        ctx.globalAlpha = 0.5;
        for (i=0; i < goal.possible_final_positions.length; i++){
                coord = goal.possible_final_positions[i];
                draw_single_object(image, coord[0], coord[1], ctx, x_offset, y_offset);
        }
        ctx.restore();
    } else {
        draw_single_object(image, goal.position.x, goal.position.y, ctx, x_offset, y_offset);
    }
}


function draw_tiles (tiles, ctx, goal){
    "use strict";
    var i, j, coords, keys, key, image, tile, colour, t, tile_array;
    if (tiles === undefined) {
        return;
    }

    keys = Object.keys(tiles);
    for (key=0; key < keys.length; key++){
        coords = keys[key].split(",");
        i = parseInt(coords[0], 10);
        j = parseInt(coords[1], 10);
        if (tiles[keys[key]] !== undefined) {
            tile_array = tiles[keys[key]];
            if (Object.prototype.toString.call(tile_array) == "[object Object]") {
                tile_array = Object.keys(tile_array);
            }
            for (t=0; t<tile_array.length; t++) {
                tile = RUR.THINGS[tile_array[t]];
                if (tile === undefined || tile.color) {
                    if (tile === undefined) {
                        colour = tiles[keys[key]];
                    } else {
                        colour = tile.color;
                    }
                    draw_coloured_tile(colour, i, j, ctx);
                    continue;
                } else if (goal) {
                    image = tile.goal.image;
                    if (image === undefined){
                        console.warn("problem in draw_tiles; tile =", tile, ctx);
                        throw new RUR.ReeborgError("Problem in draw_tiles; goal image not defined.");
                    }
                    draw_single_object(image, i, j, ctx, tile.x_offset, tile.y_offset);
                } else if (tile.choose_image === undefined){
                    image = tile.image;
                    if (image === undefined){
                        console.warn("problem in draw_tiles; tile =", tile, ctx);
                        throw new RUR.ReeborgError("Problem in draw_tiles; image not defined.");
                    }
                    draw_single_object(image, i, j, ctx, tile.x_offset, tile.y_offset);
                }
            }
        }
    }
}

function draw_animated_images (){
    "use strict";
    var i, flag, anims, canvas, canvases, obj, ctx, world = RUR.get_current_world();
    clearTimeout(RUR.ANIMATION_FRAME_ID);

    canvases = ["TILES_ANIM_CTX", "BRIDGE_ANIM_CTX", "DECORATIVE_OBJECTS_ANIM_CTX",
                "OBSTACLES_ANIM_CTX", "GOAL_ANIM_CTX", "OBJECTS_ANIM_CTX",
                "PUSHABLES_ANIM_CTX", "ROBOT_ANIM_CTX"];
    for (canvas of canvases) {
        RUR[canvas].clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);
    }

    RUR.state.random_robot = false;
    draw_random_robots(world.robots);
    flag = RUR.state.random_robot; // flag is true when animated images are drawn on a given cycle

    anims = [[world.tiles, RUR.TILES_ANIM_CTX],
             [world.bridge, RUR.BRIDGE_ANIM_CTX],
             [world.decorative_objects, RUR.DECORATIVE_OBJECTS_ANIM_CTX],
             [world.obstacles, RUR.OBSTACLES_ANIM_CTX],
             [world.goal, RUR.GOAL_ANIM_CTX],
             [world.objects, RUR.OBJECTS_ANIM_CTX],
             [world.pushables, RUR.PUSHABLES_ANIM_CTX]];

    for (i=0; i < anims.length; i++) {
        obj = anims[i][0];
        if (obj) {
            ctx = anims[i][1];
            /* Important: flag must come after draw_anim to avoid
               short-circuit evaluation which would result in draw_anim
               being called only once.
            */
            flag = draw_anim(obj, ctx) || flag;
        }
    }

    if (flag) {
        RUR.ANIMATION_FRAME_ID = setTimeout(draw_animated_images,
            RUR.ANIMATION_TIME);
    }

    // make it known globally for refresh() whether or not we have drawn
    // animated images
    RUR.animated_images = flag;
}

function draw_anim (objects, ctx) {
    "use strict";
    var i, j, i_j, coords, flag, k, n, obj, obj_here,
        recording_state, remove_flag, images_to_remove=[];

    flag = false;
    coords = Object.keys(objects);
    for (k=0; k < coords.length; k++){
        i_j = coords[k].split(",");
        i = parseInt(i_j[0], 10);
        j = parseInt(i_j[1], 10);

        obj_here = objects[coords[k]];
        if (Object.prototype.toString.call(obj_here) == "[object Object]") {
            obj_here = Object.keys(obj_here);
        }

        if (Object.prototype.toString.call(obj_here) == "[object Array]") {
            for (n=0; n < obj_here.length; n++) {
                obj = RUR.THINGS[obj_here[n]];
                if (obj === undefined) {
                    continue;
                } else if (obj.choose_image !== undefined){
                    remove_flag = _draw_single_animated(obj, coords[k], i, j, ctx, obj.x_offset, obj.y_offset);
                    if (remove_flag == RUR.END_CYCLE) {
                        images_to_remove.push([i, j, obj.name, ctx]);
                    }
                    flag = true;
                }
            }
        } else {
            console.warn("Problem: unknown type in draw_anim; canvas =", ctx.canvas);
            console.warn("obj_here = ", obj_here, "objects = ", objects);
        }
    }

    // removing object normally result in the recording of a
    // frame since we normally want the display to be updated
    // to reflect the removal. Here, we are updating the display,
    // and we do not want to trigger new frames recording: at this
    // stage, we are playing back the recorded frames.
    recording_state = RUR.state.do_not_record;
    RUR.state.do_not_record = true;
    for (k=0; k < images_to_remove.length; k++){
        __remove_animated_object(images_to_remove[k]);
    }
    RUR.state.do_not_record = recording_state;
    return flag;
}

function __remove_animated_object(args) {
    var x, y, name, ctx;
    x = args[0];
    y = args[1];
    name = args[2];
    ctx = args[3];

    switch (ctx) {
        case RUR.TILES_ANIM_CTX:
            RUR.remove_background_tile(name, x, y);
            break;
        case RUR.OBSTACLES_ANIM_CTX:
            RUR.remove_obstacle(name, x, y);
            break;
        default:
            console.warn("unknown ctx in __remove_animated_object.");
    }
}

function _draw_single_animated (obj, coords, i, j, ctx, x_offset, y_offset){
    var image, id = coords + ctx.canvas.id + obj.name;
    // each image is uniquely identified by its "id".
    image = obj.choose_image(id);
    if (image === undefined){
        console.warn("problem in _draw_single_animated; obj =", obj);
        throw new RUR.ReeborgError("Problem in _draw_single_animated at" + coords);
    } else if (image == RUR.END_CYCLE) {
        return RUR.END_CYCLE;
    }
    draw_single_object(image, i, j, ctx, x_offset, y_offset);
    return false;
}

function draw_coloured_tile (colour, i, j, ctx) {
    var thick = RUR.WALL_THICKNESS, grid_size = RUR.WALL_LENGTH;
    var x, y;
    if (i > RUR.MAX_X || j > RUR.MAX_Y){
        return;
    }
    x = i*grid_size + thick/2;
    y = RUR.HEIGHT - (j+1)*grid_size + thick/2;
    ctx.fillStyle = colour;
    ctx.fillRect(x, y, grid_size, grid_size);
}

function draw_single_object (image, i, j, ctx, x_offset, y_offset) {
    var x, y, offset=RUR.WALL_THICKNESS/2, grid_size=RUR.WALL_LENGTH;
    if (x_offset === undefined) {
        x_offset = 0;
    }
    if (y_offset === undefined) {
        y_offset = 0;
    }
    x_offset *= RUR.SCALE;
    y_offset *= RUR.SCALE;
    x = i*grid_size + offset + x_offset;
    y = RUR.HEIGHT - (j+1)*grid_size + offset + y_offset;
    try{
        if (RUR.SCALE == 0.5) {
            ctx.drawImage(image, x, y, image.width/2, image.height/2);
        } else {
            ctx.drawImage(image, x, y);
        }
    } catch (e) {
        console.warn("problem in draw_single_object", image, ctx, e);
    }
}


function draw_background_image (image) {
    // we draw the image so that it fills the entire world
    var thick=RUR.WALL_THICKNESS/2, grid_size=RUR.WALL_LENGTH,
        image_width, image_height, world_width, world_height,
        x, y, ctx=RUR.BACKGROUND_CTX;

    world_width = RUR.MAX_X*grid_size;  // space to
    world_height = RUR.MAX_Y*grid_size; // be filled

    image_width = image.width;
    image_height = image.height;

    if (image_width > world_width) {
        image_width = world_width;  // crop
    }
    if (image_height > world_height) {
        image_height = world_height;
    }

    y = RUR.HEIGHT - (RUR.MAX_Y+1)*grid_size + thick; // location of top ...
    x = grid_size + thick;                            // ... left corner

    try{
        ctx.drawImage(image, 0, 0, image_width, image_height,
                             x, y, world_width, world_height);
    } catch (e) {
        console.warn("problem in draw_background_image", image, ctx, e);
    }
}

function compile_info () {
    // compiles the information about objects and goal found at each
    // grid location, so that we can determine what should be
    // drawn - if anything.
    var world = RUR.get_current_world();
    RUR.vis_world.information = {};
    RUR.vis_world.goal_information = {};
    RUR.vis_world.goal_present = false;
    if (world.goal !== undefined && world.goal.objects !== undefined) {
        compile_partial_info(RUR.get_current_world().goal.objects,
            RUR.vis_world.goal_information, 'goal');
            RUR.vis_world.goal_present = true;
    }

    if (world.objects !== undefined) {
        compile_partial_info(world.objects, RUR.vis_world.information, 'objects');
    }
}

function compile_partial_info (objects, information, type){
    "use strict";
    var coords, obj, quantity, color, goal_information;
    if (type=="objects") {
        color = "black";
        goal_information = RUR.vis_world.goal_information;
    } else {
        color = "blue";
    }

    for (coords in objects) {
        if (objects.hasOwnProperty(coords)){
            // objects found here
            for(obj in objects[coords]){
                if (objects[coords].hasOwnProperty(obj)){
                    if (information[coords] !== undefined){
                        // already at least one other object there
                        information[coords] = [undefined, "?"];  // assign impossible object
                    } else {
                        quantity = objects[coords][obj];
                        if (quantity.toString().indexOf("-") != -1) {
                            quantity = "?";
                        } else if (quantity == "all") {
                            quantity = "?";
                        } else {
                            try{
                                quantity = parseInt(quantity, 10);
                            } catch (e) {
                                quantity = "?";
                                console.warn("WARNING: this should not happen in compile_info");
                            }
                        }
                        if (RUR.vis_world.goal_present && typeof quantity == 'number' && goal_information !== undefined) {
                            if ( goal_information[coords] !== undefined &&  goal_information[coords][1] == objects[coords][obj]) {
                            information[coords] = [obj, objects[coords][obj], RUR.GREEN];
                            } else {
                                information[coords] = [obj, objects[coords][obj], RUR.RED];
                            }
                        } else {
                            information[coords] = [obj, quantity, color];
                        }
                    }
                }
            }
        }
    }
}

function draw_info () {
    var i, j, coords, keys, key, info, ctx;
    var scale = RUR.WALL_LENGTH, Y = RUR.HEIGHT;

    if (RUR.state.do_not_draw_info) {
        return;
    }

    compile_info();
    if (RUR.vis_world.information === undefined &&
        RUR.vis_world.goal_information === undefined) {
        return;
    }
    // make sure it appears on top of everything (except possibly robots)
    ctx = RUR.ROBOT_CTX;
    ctx.font = RUR.BACKGROUND_CTX.font;

    if (RUR.vis_world.information !== undefined) {
        keys = Object.keys(RUR.vis_world.information);
        for (key=0; key < keys.length; key++){
            coords = keys[key].split(",");
            i = parseInt(coords[0], 10);
            j = parseInt(coords[1], 10);
            info = RUR.vis_world.information[coords][1];
            if (i <= RUR.MAX_X && j <= RUR.MAX_Y){
                ctx.fillStyle = RUR.vis_world.information[coords][2];
                // information drawn to left side of object
                ctx.fillText(info, (i+0.2)*scale, Y - (j)*scale);
            }
        }
    }

    if (RUR.vis_world.goal_information !== undefined) {
        keys = Object.keys(RUR.vis_world.goal_information);
        for (key=0; key < keys.length; key++){
            coords = keys[key].split(",");
            i = parseInt(coords[0], 10);
            j = parseInt(coords[1], 10);
            info = RUR.vis_world.goal_information[coords][1];
            if (i <= RUR.MAX_X && j <= RUR.MAX_Y){
                ctx.fillStyle = RUR.vis_world.goal_information[coords][2];
                // information drawn to right side of object
                ctx.fillText(info, (i+0.8)*scale, Y - (j)*scale);
            }
        }
    }
}


function draw_correct_path (path, color) {
    "use strict";
    var i, x, y, arrow_offset, offset, prev_x, prev_y, ctx = RUR.OBJECTS_CTX; // below RUR.TRACE_CTX
    var grid_x, grid_y, prev_grid_x, prev_grid_y, current_segment, segments = new Set();
    ctx.strokeStyle = color;
    ctx.lineCap = "round";

    if(RUR.get_current_world().small_tiles) {
        offset = 12;
        arrow_offset = 5;
        ctx.lineWidth = 1;
        ctx.setLineDash([2, 2]);
    } else {
        offset = 25;
        arrow_offset = 8;
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
    }
    grid_x = path[0][0];
    grid_y = path[0][1];

    x = grid_x * RUR.WALL_LENGTH + offset;
    y = RUR.HEIGHT - (grid_y + 1) * RUR.WALL_LENGTH + offset;

    ctx.beginPath();
    ctx.moveTo(x, y);
    prev_grid_x = grid_x;
    prev_grid_y = grid_y;


    for (i=1; i < path.length; i++){
        grid_x = path[i][0];
        grid_y = path[i][1];
        x = grid_x * RUR.WALL_LENGTH + offset;
        y = RUR.HEIGHT - (grid_y + 1) * RUR.WALL_LENGTH + offset;
        // We need to avoid redrawing over a previously drawn dashed path
        // as this messes up the dash pattern.
        // We first create string that identify uniquely any path segment, irrespective of
        // the direction in which it is traversed
        if (grid_x < prev_grid_x) {
            current_segment = grid_x +"," + prev_grid_x + "," + grid_y + "," + grid_y;
        } else if (grid_x > prev_grid_x) {
            current_segment = prev_grid_x +"," + grid_x + "," + grid_y + "," + grid_y;
        } else if (grid_y < prev_grid_y) {
            current_segment = grid_x +"," + grid_x + "," + grid_y + "," + prev_grid_y;            
        } else {
            current_segment = grid_x +"," + grid_x + "," + prev_grid_y + "," + grid_y;            
        }
        if (segments.has(current_segment)) {
            ctx.moveTo(x, y)
        } else {
            ctx.lineTo(x, y);
            segments.add(current_segment);
        }
        prev_grid_x = grid_x;
        prev_grid_y = grid_y;
    }
    ctx.stroke();
    ctx.setLineDash([]);

    // draw arrows.
    ctx.lineWidth = 1;
    x = path[0][0] * RUR.WALL_LENGTH + offset;
    y = RUR.HEIGHT - (path[0][1] + 1) * RUR.WALL_LENGTH + offset;
    for (i=1; i < path.length; i++){
        prev_x = x;
        prev_y = y;
        x = path[i][0] * RUR.WALL_LENGTH + offset;
        y = RUR.HEIGHT - (path[i][1] + 1) * RUR.WALL_LENGTH + offset;
        draw_arrow(x, y, prev_x, prev_y, ctx, arrow_offset);
    }
}


function draw_arrow(x, y, prev_x, prev_y, ctx, arrow_offset) {
    var len = ctx.lineWidth * 4;
    ctx.beginPath();
    if (x == prev_x) { // vertical arrow
        if (y > prev_y) {
            x -= arrow_offset;
        } else {
            x += arrow_offset;
        }
        y = (y + prev_y)/2; 
        if (y > prev_y) {
            y += arrow_offset;
            ctx.moveTo(x, y);
            ctx.lineTo(x-len, y-len);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x+len, y-len);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x, y - 2*arrow_offset);
            ctx.stroke();            
        } else {
            y -= arrow_offset;
            ctx.moveTo(x, y);            
            ctx.lineTo(x-len, y+len);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x+len, y+len);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x, y + 2*arrow_offset);
            ctx.stroke();              
        }
    } else {
        if (x > prev_x) {
            y += arrow_offset;
        } else {
            y -= arrow_offset;
        }
        x = (x + prev_x)/2;
        if (x > prev_x) {
            x += arrow_offset;
            ctx.moveTo(x, y);            
            ctx.lineTo(x-len, y-len);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x-len, y+len);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x - 2* arrow_offset, y);
            ctx.stroke();  
        } else {
            x -= arrow_offset
            ctx.moveTo(x, y);
            ctx.lineTo(x+len, y-len);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x+len, y+len);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + 2* arrow_offset, y);
            ctx.stroke();              
        }
    }
}

},{"./../rur.js":44,"./../translator.js":46,"./../world_api/things.js":84}],11:[function(require,module,exports){
function betterTab(cm) {
  if (cm.somethingSelected()) {
    cm.indentSelection("add");
  } else {
    cm.replaceSelection(cm.getOption("indentWithTabs") ? "\t" :
      Array(cm.getOption("indentUnit") + 1).join(" "), "end", "+input");
  }
}

function shiftTab(cm) {
  cm.execCommand("indentLess");
}

window.editor = CodeMirror.fromTextArea(document.getElementById('code'), {
  mode: {
    name: "python",
    version: 3
  },
  tabMode: 'indent',
  lineNumbers: true,
  theme: 'reeborg-dark',
  indentUnit: 4,
  viewportMargin: Infinity
});
editor.setOption("extraKeys", {
  Tab: betterTab,
  "Shift-Tab": shiftTab
});

window.library = CodeMirror.fromTextArea(document.getElementById('library-code'), {
  mode: {
    name: "python",
    version: 3
  },
  tabMode: 'indent',
  lineNumbers: true,
  theme: 'reeborg-dark',
  indentUnit: 4,
  viewportMargin: Infinity
});
library.setOption("extraKeys", {
  Tab: betterTab,
  "Shift-Tab": shiftTab
});

window.extra_editor = CodeMirror.fromTextArea(document.getElementById('extra-code'), {
  mode: {
    name: "python",
    version: 3
  },
  lineNumbers: true,
  readOnly: true,
  theme: 'reeborg-readonly',
  indentUnit: 4,
  viewportMargin: Infinity
});


window.pre_code_editor = CodeMirror.fromTextArea(document.getElementById('pre-code'), {
  mode: {
    name: "python",
    version: 3
  },
  tabMode: 'indent',
  lineNumbers: true,
  theme: 'reeborg-dark',
  indentUnit: 4,
  viewportMargin: Infinity
});
pre_code_editor.setOption("extraKeys", {
  Tab: betterTab,
  "Shift-Tab": shiftTab
});
window.post_code_editor = CodeMirror.fromTextArea(document.getElementById('post-code'), {
  mode: {
    name: "python",
    version: 3
  },
  tabMode: 'indent',
  lineNumbers: true,
  theme: 'reeborg-dark',
  indentUnit: 4,
  viewportMargin: Infinity
});
post_code_editor.setOption("extraKeys", {
  Tab: betterTab,
  "Shift-Tab": shiftTab
});

window.description_editor = CodeMirror.fromTextArea(document.getElementById('description'), {
  mode: {
    name: "htmlmixed"
  },
  tabMode: 'indent',
  lineNumbers: true,
  theme: 'reeborg-dark',
  indentUnit: 4,
  viewportMargin: Infinity
});
description_editor.setOption("extraKeys", {
  Tab: betterTab,
  "Shift-Tab": shiftTab
});

window.onload_editor = CodeMirror.fromTextArea(document.getElementById('onload-editor'), {
  mode: {
    name: "javascript"
  },
  tabMode: 'indent',
  lineNumbers: true,
  theme: 'reeborg-dark',
  indentUnit: 4,
  viewportMargin: Infinity
});
onload_editor.setOption("extraKeys", {
  Tab: betterTab,
  "Shift-Tab": shiftTab
});

},{}],12:[function(require,module,exports){

require("./../rur.js");
require("./create.js");
require("./../programming_api/blockly.js");
var msg = require("./../../lang/msg.js");

function _update_from_editor(world, name, _editor) {
    if ($("#add-"+name+"-to-world-btn").hasClass("blue-gradient")) {
        delete world[name];
    } else {
        world[name] = _editor.getValue();
    }
}

RUR.update_world_from_editors = function (world) {
    _update_from_editor(world, "blockly",RUR.blockly);
    _update_from_editor(world, "editor", editor);
    _update_from_editor(world, "library", library);
    _update_from_editor(world, "pre", pre_code_editor);
    _update_from_editor(world, "post", post_code_editor);
    _update_from_editor(world, "description", description_editor);
    _update_from_editor(world, "onload", onload_editor);
    return world;
};

function show_update_editor_dialog(world, editor_name, _editor) {
    if (world[editor_name] != _editor.getValue()) {
        dialog_update_editors_from_world.dialog("open");
    }
}

function set_button (name, content_present) {
    if (content_present &&
        $("#add-" + name + "-to-world-btn").hasClass("blue-gradient")) {
            $("#add-" + name + "-ok").show();
            $("#add-" + name + "-not-ok").hide();
            $("#add-" + name + "-to-world-btn").removeClass("blue-gradient");
            $("#add-" + name + "-to-world-btn").addClass("active-element");
    } else if (!content_present &&
        ! $("#add-" + name + "-to-world-btn").hasClass("blue-gradient")) {
        $("#add-" + name + "-ok").hide();
        $("#add-" + name + "-not-ok").show();
        $("#add-" + name + "-to-world-btn").addClass("blue-gradient");
        $("#add-" + name + "-to-world-btn").removeClass("active-element");
    }
}

function _update_user_editor (world, name, ed) {
    try {
        if (test_utils !== undefined) return;
    } catch (e) {}
    // For blockly when not running tests,
    // the user is given the choice to update the content or to keep their own.
    // This used to be the case as well for "editor" and library, but
    // we have found that this was too error prone.
    if (world[name]) {
        set_button("name", true);
        $("#update-"+name+"-content").show();
        show_update_editor_dialog(world, name, ed);
    } else {
        set_button("name", false);
        $("#update-"+name+"-content").hide();
    }
}

function _update_world_editor (world, name, ed) {
    // For editors defining the world: pre, post, description, onload.
    content = world[name];
    if (content) {
        if (typeof content != "string") {
            content = content.join("\n");
        }
        set_button(name, true);
        ed.setValue(content);
    } else {
        set_button(name, false);
        ed.setValue('\n');
    }
}

RUR.update_editors = function (world) {
    _update_user_editor(world, "blockly", RUR.blockly);
    _update_world_editor (world, "pre", pre_code_editor);
    _update_world_editor (world, "post", post_code_editor);
    _update_world_editor (world, "description", description_editor);
    _update_world_editor (world, "onload", onload_editor);
};

msg.record_id("update-blockly-content");
msg.record_id("update-blockly-content-text", "UPDATE BLOCKLY CONTENT");
msg.record_id("update-blockly-content-btn", "UPDATE BLOCKLY BUTTON");
msg.record_id("dialog-update-editors-from-world");
msg.record_title("ui-dialog-title-dialog-update-editors-from-world", "Contents from World");

dialog_update_editors_from_world = $("#dialog-update-editors-from-world").dialog({
    autoOpen: false,
    height: 400,
    width: 500,
    modal: true,
    buttons: {
        Cancel: function() {
            dialog_update_editors_from_world.dialog("close");
        }
    }
});

$("#update-blockly-content-btn").on("click", function(evt) {
    RUR.blockly.setValue(RUR.get_current_world().blockly);
    $("#update-blockly-content").hide();
    if  (!$("#update-editor-content").is(":visible") &&
         !$("#update-library-content").is(":visible")
        ){
        dialog_update_editors_from_world.dialog("close");
    }
});

},{"./../../lang/msg.js":95,"./../programming_api/blockly.js":25,"./../rur.js":44,"./create.js":11}],13:[function(require,module,exports){
require("./../rur.js");
//TODO: review requirements
require("./../recorder/recorder.js");
require("./../editors/update.js");
require("./../world_utils/import_world.js");
require("./../ui/world_select.js");
require("./../permalink/permalink.js");
require("./../translator.js");
require("./../programming_api/exceptions.js");
require("./../ui/stop.js");
require("./../utils/supplant.js");

RUR._load_world_from_program = function (url, shortname) {
    "use strict";
    var selected, possible_url, new_world=false;
    RUR.file_io_status = undefined;

    //this is only for the Javascript version; Python will intercept
    // a missing argument before this is called.
    if (url === undefined) {
        throw new RUR.ReeborgError(RUR.translate("World() needs an argument."));
    }

    if (shortname === undefined) {
        shortname = url;
        possible_url = RUR.world_selector.url_from_shortname(shortname);
        if (possible_url !== undefined){
            url = possible_url;
        }
    }

    selected = RUR.world_selector.get_selected();

    if (selected.shortname.toLowerCase() === shortname.toLowerCase()) {
        // We never pay attention to the return value in the main program.
        // However, it is useful for testing purpose.
        return "no world change";
    } else if (selected.url === url && shortname != selected.shortname) {
        RUR.world_selector.replace_shortname(url, shortname);
        return;
    } else if (RUR.world_selector.url_from_shortname(shortname)!==undefined){
        url = RUR.world_selector.url_from_shortname(shortname);
    }  else {
        new_world = shortname;
    }

    RUR.load_world_file(url, shortname);
    if (RUR.file_io_status === "no link") {
        RUR.show_feedback("#Reeborg-shouts", RUR.translate("Could not find link: ") + url);
        throw new RUR.ReeborgError(RUR.translate("Could not find link: ") + url);
    } else if (RUR.file_io_status === "success") {
        RUR.state.prevent_playback = true;
        if (new_world) {
            RUR.world_selector.append_world({url:url, shortname:new_world});
        }
        RUR.world_selector.set_url(url);
        RUR.stop();
        throw new RUR.ReeborgOK(RUR.translate("World selected").supplant({world: shortname}));
    }
};

RUR._last_url_loaded = undefined;
RUR._last_shortname_loaded = undefined;

RUR.load_world_file = function (url, shortname) {
    /** Loads a bare world file (json) or more complex permalink */
    "use strict";
    var data;
    RUR.file_io_status = undefined;

    if (!shortname) {
        shortname = url;
    }

    if (RUR._last_url_loaded &&
        RUR._last_url_loaded == url &&
        RUR._last_shortname_loaded &&
        RUR._last_shortname_loaded == shortname) {
            return;
    } else {
        RUR._last_url_loaded = url;
        RUR._last_shortname_loaded = shortname;
    }
    if (!url) {
        RUR.file_io_status = "no link";
        return;
    }

    if (url.substring(0,11) === "user_world:"){
        data = localStorage.getItem(url);
        if (data === null) {
            RUR.file_io_status = "no link";
            return;
        }
        RUR.world_utils.import_world(data);
        RUR.file_io_status = "success";
        RUR.frames = [];
    } else {
        $.ajax({url: url,
            async: false,
            error: function(e){
                RUR.file_io_status = "no link";
            },
            success: function(data){
                RUR.state.world_url = url;
                RUR.state.world_name = shortname;
                if (typeof data == "string" && data.substring(0,4) == "http"){
                    // TODO: the function below no longer exists; so something
                    // is definitely not right as I just commented it out
                    // RUR.permalink.update(data, shortname);
                    RUR.reload();
                } else {
                    RUR.world_utils.import_world(data);
                }
                RUR.permalink.update_URI();
                RUR.file_io_status = "success";
            }
        });
    }
};

},{"./../editors/update.js":12,"./../permalink/permalink.js":21,"./../programming_api/exceptions.js":28,"./../recorder/recorder.js":39,"./../rur.js":44,"./../translator.js":46,"./../ui/stop.js":59,"./../ui/world_select.js":63,"./../utils/supplant.js":71,"./../world_utils/import_world.js":88}],14:[function(require,module,exports){
/*  Handler of special on-screen keyboard
*/

require("./../rur.js");
require("./../dialogs/create.js");
require("./../ui/editors_tabs.js");
require("./../translator.js");
var msg = require("./../../lang/msg.js");

RUR.kbd = {};

RUR.kbd.set_programming_language = function (lang) {
    $("#kbd-python-btn").hide();
    $("#kbd-py-console-btn").hide();
    $("#kbd-javascript-btn").hide();
    switch (lang) {
        case "python":
            if (RUR.state.input_method==="py-repl"){
                $("#kbd-py-console-btn").show();
            } else {
                $("#kbd-python-btn").show();
            }
            break;
        case "javascript":
            $("#kbd-javascript-btn").show();
            break;
    }
    RUR.kbd.select();
};

RUR.kbd.insert_statement = function (txt){
    if (RUR.state.programming_language == "javascript") {
        RUR.kbd.insert(txt + ";");
    } else {
        RUR.kbd.insert(txt);
    }
    RUR.kbd.enter();
};

RUR.kbd.insert_in_console = function (txt) {
    var console = $("#py-console");
    console.val(console.val() + txt);
    console.focus();
};

RUR.kbd.insert = function (txt){
    "use strict";
    var doc, cursor, pos;
    if (RUR.state.input_method==="py-repl") {
        RUR.kbd.insert_in_console(txt);
        return;
    }

    if ($("#tabs").tabs('option', 'active') === 0) {
        doc = editor;
    } else {
        doc = library;
    }
    cursor = doc.getCursor();
    pos = { // create a new object to avoid mutation of the original selection
       line: cursor.line,
       ch: cursor.ch // set the character position to the end of the line
   };
    doc.replaceRange(txt, pos); // adds a new line
    doc.focus();
};

RUR.kbd.undo = function () {
    "use strict";
    var doc;
    if ($("#tabs").tabs('option', 'active') === 0) {
        doc = editor;
    } else {
        doc = library;
    }
    doc.undo();
    doc.focus();
};

RUR.kbd.redo = function () {
    "use strict";
    var doc;
    if ($("#tabs").tabs('option', 'active') === 0) {
        doc = editor;
    } else {
        doc = library;
    }
    doc.redo();
    doc.focus();
};

RUR.kbd.enter = function () {
    "use strict";
    var doc, ev;
    if (RUR.state.input_method==="py-repl") {
        ev = {};
        ev.keyCode = 13;
        ev.preventDefault = function () {};
        myKeyPress(ev);
        return;
    }
    if ($("#tabs").tabs('option', 'active') === 0) {
        doc = editor;
    } else {
        doc = library;
    }
    doc.execCommand("newlineAndIndent");
    doc.focus();
};

RUR.kbd.tab = function () {
    "use strict";
    var doc;
    if (RUR.state.input_method==="py-repl") {
        RUR.kbd.insert_in_console('    ');
        return;
    }

    if ($("#tabs").tabs('option', 'active') === 0) {
        doc = editor;
    } else {
        doc = library;
    }
    doc.execCommand("indentMore");
    doc.focus();
};

RUR.kbd.shift_tab = function () {
    "use strict";
    var doc;
    if ($("#tabs").tabs('option', 'active') === 0) {
        doc = editor;
    } else {
        doc = library;
    }
    doc.execCommand("indentLess");
    doc.focus();
};

RUR.kbd.select = function (choice) {
    "use strict";
    $(".kbd-command").hide();
    $(".kbd-condition").hide();
    $(".kbd-objects").hide();
    $(".kbd-python").hide();
    $(".kbd-py-console").hide();
    $(".kbd-javascript").hide();
    $(".kbd-special").hide();
    $(".no-console").hide();
    if ($("#kbd-command-btn").hasClass("active-element")) {
        $("#kbd-command-btn").removeClass("active-element");
        $("#kbd-command-btn").addClass("blue-gradient");
    } else if ($("#kbd-condition-btn").hasClass("active-element")) {
        $("#kbd-condition-btn").removeClass("active-element");
        $("#kbd-condition-btn").addClass("blue-gradient");
    } else if ($("#kbd-python-btn").hasClass("active-element")) {
        $("#kbd-python-btn").removeClass("active-element");
        $("#kbd-python-btn").addClass("blue-gradient");
    } else if ($("#kbd-py-console-btn").hasClass("active-element")) {
        $("#kbd-py-console-btn").removeClass("active-element");
        $("#kbd-py-console-btn").addClass("blue-gradient");
    } else if ($("#kbd-javascript-btn").hasClass("active-element")) {
        $("#kbd-javascript-btn").removeClass("active-element");
        $("#kbd-javascript-btn").addClass("blue-gradient");
    } else if ($("#kbd-objects-btn").hasClass("active-element")) {
        $("#kbd-objects-btn").removeClass("active-element");
        $("#kbd-objects-btn").addClass("blue-gradient");
    } else if ($("#kbd-special-btn").hasClass("active-element")) {
        $("#kbd-special-btn").removeClass("active-element");
        $("#kbd-special-btn").addClass("blue-gradient");
    }
    switch (choice) {
        case "kbd-condition":
            $(".kbd-condition").show();
            $("#kbd-condition-btn").removeClass("blue-gradient");
            $("#kbd-condition-btn").addClass("active-element");
            break;
        case "kbd-objects":
            $(".kbd-objects").show();
            $("#kbd-objects-btn").removeClass("blue-gradient");
            $("#kbd-objects-btn").addClass("active-element");
            break;
        case "kbd-python":
            $(".kbd-python").show();
            $("#kbd-python-btn").removeClass("blue-gradient");
            $("#kbd-python-btn").addClass("active-element");
            break;
        case "kbd-py-console":
            $(".kbd-py-console").show();
            $("#kbd-py-console-btn").removeClass("blue-gradient");
            $("#kbd-py-console-btn").addClass("active-element");
            break;
        case "kbd-javascript":
            $(".kbd-javascript").show();
            $("#kbd-javascript-btn").removeClass("blue-gradient");
            $("#kbd-javascript-btn").addClass("active-element");
            break;
        case "kbd-special":
            $(".kbd-special").show();
            $("#kbd-special-btn").removeClass("blue-gradient");
            $("#kbd-special-btn").addClass("active-element");
            break;
        case "kbd-command":  // jshint ignore:line
        default:
            $(".kbd-command").show();
            $("#kbd-command-btn").removeClass("blue-gradient");
            $("#kbd-command-btn").addClass("active-element");
    }

    if (RUR.state.programming_language == "python") {
        $(".only_py").show();
        if (RUR.state.input_method==="py-repl") {
            $(".no-console").hide();
        }
        $(".only_js").hide();
    } else {
        $(".only_js").show();
        $(".only_py").hide();
    }
};

function add_onclick_select(arg) {
    var id = arg + "-btn";
    $("#"+id).on("click", function (evt) {
        RUR.kbd.select(arg);
    });
    msg.record_id(id, id);
}
function add_onclick_insert_statement(id, arg) {
    $("#"+id).on("click", function (evt) {
        RUR.kbd.insert_statement(RUR.translate(arg));
    });
    msg.record_id(id, arg);
}
function add_onclick_insert_function_statement(id, arg) {
    $("#"+id).on("click", function (evt) {
        RUR.kbd.insert_statement(RUR.translate(arg) + "()");
    });
    msg.record_fn(id, arg);
}
function add_onclick_insert_untranslated_statement(id, arg) {
    $("#"+id).on("click", function (evt) {
        RUR.kbd.insert_statement(arg);
    });
    msg.record_id(id, arg);
    RUR.untranslated[arg] = true;
}
function add_onclick_insert(id, arg) {
    $("#"+id).on("click", function (evt) {
        RUR.kbd.insert(RUR.translate(arg));
    });
    msg.record_id(id, arg);
}
function add_onclick_insert_function(id, arg) {
    $("#"+id).on("click", function (evt) {
        RUR.kbd.insert(RUR.translate(arg) + "()");
    });
    msg.record_fn(id, arg);
}
function add_onclick_insert_untranslated(id, arg) {
    $("#"+id).on("click", function (evt) {
        RUR.kbd.insert(arg);
    });
    msg.record_id(id, arg);
    RUR.untranslated[arg] = true;
}
function add_onclick_insert_object(id, arg) {
    $("#"+id).on("click", function (evt) {
        RUR.kbd.insert('"'+RUR.translate(arg)+'"');
    });
    msg.record_id(id);
}

$(document).ready(function () {
    init();
});

function init() {
    msg.record_title("ui-dialog-title-special-keyboard", "Reeborg's basic keyboard");
    add_onclick_select("kbd-command");
    add_onclick_select("kbd-condition");
    add_onclick_select("kbd-python");
    add_onclick_select("kbd-py-console");
    add_onclick_select("kbd-javascript");
    add_onclick_select("kbd-objects");
    add_onclick_select("kbd-special");

    add_onclick_insert_function_statement("kbd-move", "move");
    add_onclick_insert_function_statement("kbd-turn-left", "turn_left");
    add_onclick_insert_function_statement("kbd-take", "take");
    add_onclick_insert_function_statement("kbd-put", "put");
    add_onclick_insert_function_statement("kbd-toss", "toss");
    add_onclick_insert_function_statement("kbd-build-wall", "build_wall");
    add_onclick_insert_function_statement("kbd-pause", "pause");
    add_onclick_insert_function_statement("kbd-done", "done");
    add_onclick_insert_statement("kbd-think", "think(100)");
    add_onclick_insert_statement("kbd-sound", "sound(True)");
    add_onclick_insert_statement("kbd-sound-js", "sound(true)");
    add_onclick_insert_function_statement("kbd-world", 'World');
    add_onclick_insert_function_statement("kbd-UsedRobot", "UsedRobot");
    add_onclick_insert_function_statement("kbd-newUsedRobot", "new UsedRobot");
    add_onclick_insert_function_statement("kbd-no-highlight", "no_highlight");

    add_onclick_insert_function("kbd-at-goal", "at_goal");
    add_onclick_insert_function("kbd-front-is-clear", "front_is_clear");
    add_onclick_insert_function("kbd-right-is-clear", "right_is_clear");
    add_onclick_insert_function("kbd-wall-in-front", "wall_in_front");
    add_onclick_insert_function("kbd-wall-on-right", "wall_on_right");
    add_onclick_insert_function("kbd-object-here", "object_here");
    add_onclick_insert_function("kbd-carries-object", "carries_object");
    add_onclick_insert_function("kbd-is-facing-north", "is_facing_north");

    add_onclick_insert_object("kbd-token", "token");
    add_onclick_insert_object("kbd-apple", "apple");
    add_onclick_insert_object("kbd-banana", "banana");
    add_onclick_insert_object("kbd-carrot", "carrot");
    add_onclick_insert_object("kbd-daisy", "daisy");
    add_onclick_insert_object("kbd-dandelion", "dandelion");
    add_onclick_insert_object("kbd-leaf", "leaf");
    add_onclick_insert_object("kbd-square", "square");
    add_onclick_insert_object("kbd-star", "star");
    add_onclick_insert_object("kbd-strawberry", "strawberry");
    add_onclick_insert_object("kbd-triangle", "triangle");
    add_onclick_insert_object("kbd-tulip", "tulip");
    add_onclick_insert_object("kbd-beeper", "beeper");

    add_onclick_insert_untranslated_statement("kbd-js-var", "var ");
    add_onclick_insert_untranslated("kbd-js-function", "function ? { \n\n}");
    add_onclick_insert_untranslated("kbd-js-if", "if ( ? ) { \n\n}");
    add_onclick_insert_untranslated("kbd-js-elif", "else if ( ? ) { \n\n}");
    add_onclick_insert_untranslated("kbd-js-else", "else { \n\n}");
    add_onclick_insert_untranslated("kbd-js-while", "while ( ? ) { \n\n}");
    add_onclick_insert_untranslated("kbd-js-for", "for (? ; ? ; ?) { \n\n}");
    add_onclick_insert_untranslated("kbd-js-true", "true");
    add_onclick_insert_untranslated("kbd-js-false", "false");
    add_onclick_insert_untranslated("kbd-js-undefined", "undefined");
    add_onclick_insert_untranslated("kbd-js-not", "!");
    add_onclick_insert_untranslated("kbd-js-and", "&&");
    add_onclick_insert_untranslated("kbd-js-or", "||");
    add_onclick_insert_function_statement("kbd-js-write", "write");
    add_onclick_insert_untranslated_statement("kbd-js-return", "return");
    add_onclick_insert_untranslated_statement("kbd-js-continue", "continue");
    add_onclick_insert_untranslated_statement("kbd-js-break", "break");

    add_onclick_insert_untranslated_statement("kbd-py-def", "def ? ( ):");
    add_onclick_insert_untranslated_statement("kbd-py-if", "if ? :");
    add_onclick_insert_untranslated_statement("kbd-py-elif", "elif ? :");
    add_onclick_insert_untranslated_statement("kbd-py-else", "else:");
    add_onclick_insert_untranslated_statement("kbd-py-while", "while ? :");
    add_onclick_insert_untranslated_statement("kbd-py-repeat", "repeat ? :");
    add_onclick_insert_statement("kbd-py-library", "from library import ?");
    add_onclick_insert_untranslated_statement("kbd-py-for", "for ? in ? :");
    add_onclick_insert_untranslated_statement("kbd-py-print", "print()");
    add_onclick_insert_untranslated_statement("kbd-py-range", "range(?)");
    add_onclick_insert_untranslated_statement("kbd-py-true", "True");
    add_onclick_insert_untranslated_statement("kbd-py-false", "False");
    add_onclick_insert_untranslated_statement("kbd-py-none", "None");
    add_onclick_insert_untranslated_statement("kbd-py-not", "not");
    add_onclick_insert_untranslated_statement("kbd-py-and", "and");
    add_onclick_insert_untranslated_statement("kbd-py-or", "or");
    add_onclick_insert_untranslated_statement("kbd-py-continue", "continue");
    add_onclick_insert_untranslated_statement("kbd-py-break", "break");
    add_onclick_insert_untranslated_statement("kbd-py-return", "return ?");
    add_onclick_insert_untranslated_statement("kbd-py-pass", "pass");

    add_onclick_insert_untranslated("kbd-pyrepl-def", "def ");
    add_onclick_insert_untranslated("kbd-pyrepl-if", "if ");
    add_onclick_insert_untranslated("kbd-pyrepl-elif", "elif ");
    add_onclick_insert_untranslated("kbd-pyrepl-else", "else:");
    add_onclick_insert_untranslated("kbd-pyrepl-while", "while ");
    add_onclick_insert("kbd-pyrepl-library", "from library import ?");
    add_onclick_insert_untranslated("kbd-pyrepl-for", "for ");
    add_onclick_insert_untranslated("kbd-pyrepl-in", "in ");
    add_onclick_insert_untranslated("kbd-pyrepl-print", "print(");
    add_onclick_insert_untranslated("kbd-pyrepl-range", "range(");
    add_onclick_insert_untranslated("kbd-pyrepl-true", "True");
    add_onclick_insert_untranslated("kbd-pyrepl-false", "False");
    add_onclick_insert_untranslated("kbd-pyrepl-none", "None");
    add_onclick_insert_untranslated("kbd-pyrepl-not", "not");
    add_onclick_insert_untranslated("kbd-pyrepl-and", "and");
    add_onclick_insert_untranslated("kbd-pyrepl-or", "or");
    add_onclick_insert_untranslated_statement("kbd-pyrepl-continue", "continue");
    add_onclick_insert_untranslated_statement("kbd-pyrepl-break", "break");
    add_onclick_insert_untranslated_statement("kbd-pyrepl-return", "return");
    add_onclick_insert_untranslated_statement("kbd-pyrepl-pass", "pass");

    add_onclick_insert_untranslated("kbd-colon", ":");
    add_onclick_insert_untranslated("kbd-semi-colon", ";");
    add_onclick_insert_untranslated("kbd-sharp", "#");
    add_onclick_insert_untranslated("kbd-double-quote", "\"");
    add_onclick_insert_untranslated("kbd-single-quote", "'");
    add_onclick_insert_untranslated("kbd-equal", "=");
    add_onclick_insert_untranslated("kbd-less-than", "<");
    add_onclick_insert_untranslated("kbd-greater-than", ">");
    add_onclick_insert_untranslated("kbd-ampersand", "&");
    add_onclick_insert_untranslated("kbd-vertical-bar", "|");
    add_onclick_insert_untranslated("kbd-parens", "( )");
    add_onclick_insert_untranslated("kbd-curly-brackets", "{ }");
    add_onclick_insert_untranslated("kbd-square-brackets", "[ ]");

    $("#kbd-tab").on("click", function (evt) {
        RUR.kbd.tab();
    });
    msg.record_id("kbd-tab", "tab");
    $("#kbd-shift-tab").on("click", function (evt) {
        RUR.kbd.shift_tab();
    });
    msg.record_id("kbd-shift-tab", "shift-tab");
    $("#kbd-enter").on("click", function (evt) {
        RUR.kbd.enter();
    });
    msg.record_id("kbd-enter", "enter");
    $("#kbd-undo").on("click", function (evt) {
        RUR.kbd.undo();
    });
    msg.record_id("kbd-undo", "UNDO");
    $("#kbd-redo").on("click", function (evt) {
        RUR.kbd.redo();
    });
    msg.record_id("kbd-redo", "REDO");
}
},{"./../../lang/msg.js":95,"./../dialogs/create.js":3,"./../rur.js":44,"./../translator.js":46,"./../ui/editors_tabs.js":50}],15:[function(require,module,exports){
/* Menu driven world editor */
require("./../rur.js");
require("./../translator.js");
require("./../default_tiles/tiles.js");

require("./../robot/robot.js");
require("./../editors/update.js");
require("./../drawing/visible_world.js");
require("./../programming_api/exceptions.js");
require("./../world_get/world_get.js");
require("./../dialogs/set_dimensions.js");
require("./../dialogs/create.js");
require("./../listeners/canvas.js");
require("./../editors/create.js");
require("./../utils/supplant.js");
require("./../utils/key_exist.js");

require("./../world_api/objects.js");
require("./../world_api/robot.js");
require("./../world_api/walls.js");

var edit_robot_menu = require("./../ui/edit_robot_menu.js");
var dialog_add_object = require("./../dialogs/add_object.js").dialog_add_object;
var dialog_give_object = require("./../dialogs/give_object.js").dialog_give_object;
var dialog_goal_object = require("./../dialogs/goal_object.js").dialog_goal_object;
var dialog_set_background_image = require("./../dialogs/set_background_image.js").dialog_set_background_image;
var dialog_select_colour = require("./../dialogs/select_colour.js").dialog_select_colour;


var identical = require("./../utils/identical.js").identical;

RUR.we = {};   // we == World Editor

RUR.we.give_to_robot_flag = false;

RUR.we.edit_world = function  () {
    "use strict";
    // usually triggered when canvas is clicked if editing world;
    // call explicitly if needed.
    var value, split, root;
    split = RUR.we.edit_world_selection.split("-");
    root = split[0];
    value = split[1];
    switch (root) {
        case "robot":
            if (value == "place") {
                place_robot();
            }
            break;
        case "object":
            if (RUR.we.decorative_objects_flag) {
                toggle_decorative_object(value);
            } else {
                add_object(value);
            }
            break;
        case "tile":
            toggle_tile(value);
            break;
        case "solid_object":
            toggle_obstacle(value);
            break;
        case "world":
            if (value == "walls") {
                toggle_wall();
            }
            break;
        case "position":
            RUR.we.set_goal_position(value);
            break;
        case "goal":
            if (value == "wall") {
                toggle_goal_wall();
            } else {
                add_goal_object(value);
            }
            break;
        default:
            break;
    }
    RUR.vis_world.refresh_world_edited();
};

function toggle_decorative_object(value) {
    "use strict";
    var x, y, position = RUR.calculate_grid_position();
    x = position[0];
    y = position[1];
    if (RUR.is_decorative_object(value, x, y)) {
        RUR.remove_decorative_object(value, x, y);
    } else {
        RUR.add_decorative_object(value, x, y);
    }
}

function alert_1 (txt) {
    $("#cmd-result").html(RUR.translate(txt)).effect("highlight", {color: "gold"}, 1500);
}

function alert_2 (txt, value) {
    $("#cmd-result").html(RUR.translate(txt).supplant({obj: RUR.translate(value)})).effect("highlight", {color: "gold"}, 1500);
}

RUR.we.select = function (choice) {
    "use strict";
    var value, split, root;
    RUR.we.edit_world_selection = choice;
    split = choice.split("-");
    root = split[0];
    value = split[1];
    $(".edit-world-canvas").hide();
    $(".edit-goal-canvas").hide();
    $("#edit-goal-position").hide();
    $("#edit-world-objects").hide();
    $(".not-for-robot").hide();
    switch (root) {
        case "robot":
            switch (value) {
            case "place":
                alert_1("Click on world to move robot.");
                break;
            case "add":
                RUR.add_robot(RUR.robot.create_robot(1, 1));
                alert_1("Added robot.");
                RUR.we.edit_world();
                edit_robot_menu.toggle();
                break;
            case "orientation":
                alert_1("Click on image to turn robot");
                $("#edit-world-turn").show();
                $("#random-orientation").show();
                break;
            case "objects":
                RUR.we.give_to_robot_flag = true;
                $("#edit-world-objects").show();
                $(".not-for-robot").hide();
                alert_1("Click on desired object below.");
                break;
            }
            break;
        case "decorative":
            RUR.we.decorative_objects_flag = true;
            $("#edit-world-objects").show();
            RUR.we.give_to_robot_flag = false;
            alert_1("Click on desired object below.");
            break;
        case "background":
            dialog_set_background_image.dialog("open");
            break;
        case "world":
            switch (value) {
            case "objects":
                RUR.we.decorative_objects_flag = false;
                $("#edit-world-objects").show();
                RUR.we.give_to_robot_flag = false;
                alert_1("Click on desired object below.");
                break;
            case "tiles":
                $("#edit-tile").show();
                alert_1("Click on desired tile below.");
                break;
            case "fill_tiles":
                $("#fill-tile").show();
                alert_1("Click on desired tile below.");
                break;
            case "solid_objects":
                $("#edit-solid-object").show();
                alert_1("Click on desired object below.");
                break;
            case "walls":
                alert_1("Click on world to toggle walls.");
                break;
            }
            break;
        case "object":
            $("#edit-world-objects").show();
            if (RUR.we.give_to_robot_flag) {
                give_objects_to_robot(value);
                RUR.we.edit_world_selection = '';
            } else {
                alert_2("Click on world to add object.", value);
            }
            break;
        case "tile":
            $("#edit-tile").show();
            alert_2("Click on world to toggle tile.", value);
            break;
        case "fill":
            fill_with_tile(value);
            break;
        case "solid_object":
            $("#edit-solid-object").show();
            alert_2("Click on world to toggle object.", value);
            break;
        case "position":
            alert_1("Click on world to set home position for robot.");
            break;
        case "goal":
            switch (value) {
            case "robot":
                $("#edit-goal-position").show();
                alert_1("Click on image desired to indicate the final position of the robot.");
                break;
            case "wall":
                alert_1("Click on world to toggle additional walls to build.");
                break;
            case "objects":
                $("#edit-goal-objects").show();
                alert_1("Click on desired goal object below.");
                break;
            default:
                $("#edit-goal-objects").show();
                alert_2("Click on world to set number of goal objects.", value);
                break;
            }
        break;
        case "set":
            RUR.dialog_set_dimensions.dialog('open');
            break;
    }
};

RUR.we.toggle_editing_mode = function () {
    if (RUR.state.editing_world) {  // done editing
        $("#pre-code-tab").parent().hide();
        $("#post-code-tab").parent().hide();
        $("#description-tab").parent().hide();
        $("#onload-editor-tab").parent().hide();

        RUR.state.editing_world = false;
        RUR.state.code_evaluated = false;
        try {
            localStorage.setItem("editor", editor.getValue());
            localStorage.setItem("library", library.getValue());
        } catch (e) {}
        $("#editor-tab").trigger('click');
        if (RUR.state.programming_language == "python" && RUR.state.extra_code_visible) {
            $("#extra-tab").parent().show();
        }
        $("#decrease-font-size").show();
        $("#increase-font-size").show();
        RUR.reload();
    } else {
        $("#pre-code-tab").parent().show();
        $("#post-code-tab").parent().show();
        $("#description-tab").parent().show();
        $("#onload-editor-tab").parent().show();
        $("#extra-tab").parent().hide();
        edit_robot_menu.toggle();
        RUR.state.editing_world = true;
        $("#highlight").hide();
        $("#watch-variables-btn").hide();
        $("#decrease-font-size").hide();
        $("#increase-font-size").hide();
    }
    RUR.vis_world.draw_all();
};

record_id("edit-world", "EDIT WORLD");
record_id("edit-world-text", "EDIT WORLD EXPLAIN");
$(document).ready( function () {
        RUR.create_and_activate_dialogs(
            $("#edit-world"), $("#edit-world-panel"), {},
            function () {
                RUR.we.toggle_editing_mode();
                $("#more-menus").dialog("minimize");
            }
        );
    }
);


function place_robot () {
    "use strict";
    var position, world=RUR.get_current_world(), robot, arr=[], pos, present=false;
    position = RUR.calculate_grid_position();
    if (world.robots !== undefined){
        if (world.robots.length >0) {
            robot = world.robots[0];
            if (!robot.possible_initial_positions){
                robot.possible_initial_positions = [[robot.x, robot.y]];
            }
        } else {
            robot = RUR.robot.create_robot(position[0], position[1]);
            RUR.add_robot(robot);
            robot.possible_initial_positions = [[robot.x, robot.y]];
            return;
        }
    } else {
        alert("Problem: place_robot called but world.robots is undefined.")
    }

    for (var i=0; i < robot.possible_initial_positions.length; i++){
        pos = robot.possible_initial_positions[i];
        if(pos[0]==position[0] && pos[1]==position[1]){
            present = true;
        } else {
            arr.push(pos);
            robot.x = pos[0];
            robot.y = pos[1];
        }
    }
    if (!present){
        arr.push(position);
        robot.x = position[0];
        robot.y = position[1];
    }

    if (arr.length===0){
        RUR.get_current_world().robots = [];
        edit_robot_menu.toggle();
        return;
    }

    robot.possible_initial_positions = arr;
    robot._prev_x = robot.x;
    robot._prev_y = robot.y;
}


function give_objects_to_robot (specific_object){
    "use strict";

    RUR.state.specific_object = specific_object;
    $("#give-object-name").html(RUR.translate(specific_object));
    dialog_give_object.dialog("open");
}


RUR.we.turn_robot = function (orientation) { // function used on reeborg.html
    RUR.get_current_world().robots[0]._orientation = orientation;
    RUR.get_current_world().robots[0]._prev_orientation = orientation;
    RUR.vis_world.refresh_world_edited();
};

function calculate_wall_position () {
    var x, y, orientation, remain_x, remain_y, del_x, del_y;
    x = RUR.mouse_x - $("#robot-anim-canvas").offset().left;
    y = RUR.mouse_y - $("#robot-anim-canvas").offset().top;

    y = RUR.BACKGROUND_CANVAS.height - y;  // count from bottom

    x /= RUR.WALL_LENGTH;
    y /= RUR.WALL_LENGTH;
    remain_x = x - Math.floor(x);
    remain_y = y - Math.floor(y);

    // del_  denotes the distance to the closest wall
    if (Math.abs(1.0 - remain_x) < remain_x) {
        del_x = Math.abs(1.0 - remain_x);
    } else {
        del_x = remain_x;
    }

    if (Math.abs(1.0 - remain_y) < remain_y) {
        del_y = Math.abs(1.0 - remain_y);
    } else {
        del_y = remain_y;
    }

    x = Math.floor(x);
    y = Math.floor(y);

    if ( del_x < del_y ) {
        orientation = "east";
        if (remain_x < 0.5) {
            x -= 1;
        }
    } else {
        orientation = "north";
        if (remain_y < 0.5) {
            y -= 1;
        }
    }

    if (x < 1 ) {
        x = 1;
    } else if (x > RUR.MAX_X) {
        x = RUR.MAX_X;
    }
    if (y < 1 ) {
        y = 1;
    } else if (y > RUR.MAX_Y) {
        y = RUR.MAX_Y;
    }

    return [x, y, orientation];
}

function __toggle_wall (goal) {
    var position, x, y, orientation, options = {};
    position = calculate_wall_position();
    x = position[0];
    y = position[1];
    orientation = position[2];

    if (goal) {
        options.goal = goal;
    }

    if (RUR._is_wall(orientation, x, y, options)){
        RUR.remove_wall(RUR.translate(orientation), x, y, options);
    } else {
        RUR.add_wall(RUR.translate(orientation), x, y, options);
    }
}

function toggle_wall () {
    __toggle_wall(false);
}

function toggle_goal_wall () {
    __toggle_wall(true);
}

function set_add_object_position () {
    var position, x, y;
    position = RUR.calculate_grid_position();
    x = position[0];
    y = position[1];
    RUR.state.x = x;
    RUR.state.y = y;
}

function add_object (specific_object){
    set_add_object_position();
    RUR.state.specific_object = specific_object;
    $("#add-object-name").html(RUR.translate(specific_object));
    dialog_add_object.dialog("open");
}

function add_goal_object (specific_object){
    "use strict";
    set_add_object_position();
    RUR.state.specific_object = specific_object;
    $("#goal-object-name").html(RUR.translate(specific_object));
    dialog_goal_object.dialog("open");
}

/* TODO This should probably be rewritten to make use of
 * RUR.add_final_position, but would also require that
 * RUR.is_final_position be written and RUR.remove_final_position as well.
 *
 */


RUR.we.set_goal_position = function (home){
    // will remove the position if clicked again.
    "use strict";
    var position, world=RUR.get_current_world(), arr=[], pos, present=false, goal;

    $("#cmd-result").html(RUR.translate("Click on world to set home position for robot.")).effect("highlight", {color: "gold"}, 1500);

    RUR.utils.ensure_key_for_obj_exists(world, "goal");
    goal = world.goal;

    if (goal.possible_final_positions === undefined) {
        RUR.utils.ensure_key_for_obj_exists(goal, "possible_final_positions");
        if (goal.position !== undefined) {
            goal.possible_final_positions = [[goal.position.x, goal.position.y]];
        } else {
            RUR.utils.ensure_key_for_obj_exists(goal, "position");
        }
    }

    goal.position.image = home;

    position = RUR.calculate_grid_position();
    goal.position.x = position[0];
    goal.position.y = position[1];

    for(var i=0; i<goal.possible_final_positions.length; i++) {
        pos = goal.possible_final_positions[i];
        if(pos[0]==position[0] && pos[1]==position[1]){
            present = true;
            break;
        } else {
            arr.push(pos);
            goal.position.x = pos[0];
            goal.position.y = pos[1];
        }
    }

    if (!present){
        arr.push(position);
        goal.position.x = position[0];
        goal.position.y = position[1];
    }
    goal.possible_final_positions = arr;

    if (arr.length === 0) {
        delete RUR.get_current_world().goal.position;
        delete RUR.get_current_world().goal.possible_final_positions;
        if (Object.keys(RUR.get_current_world().goal).length === 0) {
            delete RUR.get_current_world().goal;
        }
        $("#edit-world-turn").hide();
    }
};

function toggle_tile (name){
    // will remove the position if clicked again with tile of same type.
    "use strict";
    var x, y, position;
    if (!name) {  // if we cancel the dialog
        return;
    } else if (name === "colour") {
        RUR._CALLBACK_FN = toggle_tile;
        dialog_select_colour.dialog("open");
        return;
    }


    position = RUR.calculate_grid_position();
    x = position[0];
    y = position[1];

    if (RUR.is_background_tile(name, x, y)) {
        RUR.remove_background_tile(name, x, y);
    } else {
        RUR.add_colored_tile(name, x, y);
    }
}

function fill_with_tile (name) {
    "use strict";
    if (!name) {    // if we cancel the dialog
        return;
    } else if (name === "colour") {
        RUR._CALLBACK_FN = fill_with_tile;
        dialog_select_colour.dialog("open");
        return;
    }

    RUR.fill_background(name);

    RUR.vis_world.refresh_world_edited();
    $("#cmd-result").html("");
}


function toggle_obstacle (obj){
    // will remove the position if clicked again with object of same type.
    "use strict";
    var x, y, position;

    position = RUR.calculate_grid_position();
    x = position[0];
    y = position[1];

    if (RUR.is_obstacle(obj, x, y)) {
        RUR.remove_obstacle(obj, x, y);
    } else {
        RUR.add_obstacle(obj, x, y);
    }
}

$(document).ready(function() {
// mouse clicks also requested in listeners/canvas.js
    $("#robot-anim-canvas").on("click", function (evt) {
        if (RUR.state.editing_world && RUR.we.edit_world_selection !== undefined) {
            RUR.we.edit_world();
        }
        if (RUR.get_current_world().blank_canvas) {
            return;
        }
        RUR.world_get.world_info(true); // true = show info at grid location.
    });
});

},{"./../default_tiles/tiles.js":1,"./../dialogs/add_object.js":2,"./../dialogs/create.js":3,"./../dialogs/give_object.js":4,"./../dialogs/goal_object.js":5,"./../dialogs/select_colour.js":6,"./../dialogs/set_background_image.js":7,"./../dialogs/set_dimensions.js":8,"./../drawing/visible_world.js":10,"./../editors/create.js":11,"./../editors/update.js":12,"./../listeners/canvas.js":18,"./../programming_api/exceptions.js":28,"./../robot/robot.js":41,"./../rur.js":44,"./../translator.js":46,"./../ui/edit_robot_menu.js":49,"./../utils/identical.js":65,"./../utils/key_exist.js":66,"./../utils/supplant.js":71,"./../world_api/objects.js":80,"./../world_api/robot.js":83,"./../world_api/walls.js":85,"./../world_get/world_get.js":86}],16:[function(require,module,exports){
/* require this module that will automatically modify a global object*/
require("./utils/cors.js");

/* Defines the global namespace and various basic functions */
require("./rur.js");

require("./file_io/file_io.js");
require("./storage/storage.js");
require("./permalink/permalink.js");


/* The menu-driven world editor is not required by any other module,
   but it depends on many of them and will take care of loading them */

require("./gui_tools/world_editor.js");

/* We have various html elements which "wait and listen" for interactions
   which are defined in the following modules, most of which are otherwise
   not needed by other modules.
   We list all that appears in the ./listeners directory BUT comment out
   those that are required by other non-listeners module and would thus
   be automatically loaded.
   */

// TODO: refactor so that code from listeners not required here can be
// put with the calling module - when there is a single such module.
// 

require("./ui/add_listeners.js");

require("./listeners/memorize_world.js");
require("./listeners/onclick.js");

// the following are not required by any other module
require("./ui/keyboard_shortcuts.js");
require("./utils/maze.js");
require("./utils/search.js");
require("./utils/path_utils.js");
require("./world_api/decorative_objects.js");

brython({debug:1, pythonpath:[RUR.BASE_URL + '/src/python']});
// if (__BRYTHON__.__MAGIC__ != "3.6.2") {
//     alert("Expecting Brython version 3.6.2 and got " + __BRYTHON__.__MAGIC__);
// }

function probably_invalid(value) {
    return value === undefined || value === null || value == "null" || value == "undefined";
}

RUR.state.session_initialized = false;

function start_session () {
    "use strict";
    var url;
    set_initial_state();
    set_editor();
    set_library();
    get_red_green();
    RUR.state.session_initialized = true;    
    url = RUR.world_selector.url_from_shortname(RUR.state.world_name);
    if (!url || url != RUR.state.world_url) { // world not included in menu, nor in selector
        RUR.world_selector.append_world({url: RUR.state.world_url,
                                         shortname: RUR.state.world_name});
    }
    RUR.world_selector.set_url(RUR.state.world_url);
    RUR.permalink.update_URI();
    $("#thought").hide();
}


function confirm_ready_to_start() {
    console.log(window.python_to_js);
    console.log(window.translate_python);
    console.log(window.python_to_js);
    console.log(RUR.state.ui_ready);
    if (window.translate_python === undefined || !RUR.state.ui_ready) {
        console.log("Not quite ready to initialize session; will try again in 100ms.");
        window.setTimeout(confirm_ready_to_start, 100);
    } else {
        start_session();
    }
}

confirm_ready_to_start();


function set_initial_state() {
    /* This function sets the initial state which includes
        * The input method (python, py-repl, etc.)
        * The human language
        * The world menu to be used
        * The world to be initially displayed
            * its name
            * its url

       The priority is determined by:
           1. information encoded in the URL;
           2. any previously saved state;
           3. site defaults.
            
    */
    var url_query;

    url_query = RUR.permalink.parseUri(window.location.href);
    if (url_query.queryKey === undefined) {  // should be set but just in case...
        url_query.queryKey = {};
    }
    
    // Changing the input_method / programming mode does not affect anything else
    // so do first. Note that, if using Blockly, we will retrieve the last
    // state here. However, if a world (loaded below) has some Blockly
    // content, it will replace the restored content, as desired.
    set_initial_input_method(url_query);

    // Changing the human language will trigger a restart of the Python repl
    // if it is the mode selected, to ensure that the proper reeborg_xx module
    // is used; so it has to be done after the programming mode has been set.
    set_initial_language(url_query);

    // Next, we create the appropriate world menu, using the default if needed
    set_initial_menu(url_query);

    // A hand-written url may not include all required parts;
    // this does not matter for the previous three settings, but it
    // may matter if there is some inconsistency with the indicated url and name
    // parts. In this case, we have to make sure that we do not
    // retrieve the last saved values by mistake
    RUR.state.world_url = decodeURIComponent(url_query.queryKey.url);
    RUR.state.world_name = decodeURIComponent(url_query.queryKey.name);    

    // correct potentially faulty values
    if (probably_invalid(RUR.state.world_url)) {
        RUR.state.world_url = undefined;
    }
    if (probably_invalid(RUR.state.world_name)) {
        RUR.state.world_name = undefined;
    }

    if (RUR.state.world_url !== undefined) {
        if (RUR.state.world_name === undefined) {
            RUR.state.world_name = RUR.state.world_url;
        }
        try {
            RUR.load_world_file(RUR.state.world_url, RUR.state.world_name);
        } catch (e) {
            set_default_world();
        }
    } else if (RUR.state.world_name !== undefined) {
        RUR.state.world_url = RUR.world_selector.url_from_shortname(RUR.state.world_name);
        if (RUR.state.world_url === undefined) { // Name does not in the current menu
            set_default_world();
        }
    } else {
        set_default_world();
    }
}

function set_default_world() {
    var world_name, world_url, possible_url;
    world_name = localStorage.getItem("world_name");
    world_url = localStorage.getItem("world_url");
    possible_url = RUR.world_selector.url_from_shortname(world_name);
    if (!probably_invalid(possible_url) && 
        possible_url == world_url // ensure consistency
        ) {
        RUR.world_selector.set_url(world_url);
    } else {
        RUR.world_selector.set_default();  // first world of the collection
    }
}


function set_initial_input_method(url_query) {
    var last_mode;
    RUR.state.input_method = decodeURIComponent(url_query.queryKey.mode); 
    last_mode = localStorage.getItem("input_method");

    if (probably_invalid(RUR.state.input_method)) {
        if (!probably_invalid(last_mode)) {
            RUR.state.input_method = last_mode;
        } else {
            RUR.state.input_method = RUR.initial_defaults.input_method;
        }
    }
    document.getElementById("programming-mode").value = RUR.state.input_method;
    $("#programming-mode").change(); // triggers the require UI changes

    if (RUR.state.input_method === "blockly-py" || RUR.state.input_method === "blockly-js") {
        restore_blockly();
    }
}


function set_initial_language(url_query) {
    var last_lang;
    RUR.state.human_language = decodeURIComponent(url_query.queryKey.lang);
    last_lang = localStorage.getItem("human_language");

    if (probably_invalid(RUR.state.human_language)) {
        if (!probably_invalid(last_lang)) {
            RUR.state.human_language = last_lang;
        } else {
            RUR.state.human_language = RUR.initial_defaults.human_language;
        }
    }
    document.getElementById('human-language').value = RUR.state.human_language;
    $("#human-language").change(); // triggers the require UI changes
}


function set_initial_menu(url_query) {
    var last_menu;
    var last_lang;

    last_lang = localStorage.getItem("human_language");
    if (last_lang !== RUR.state.human_language) {
        RUR.state.current_menu = RUR.initial_defaults.initial_menu;
    } else {
        RUR.state.current_menu = decodeURIComponent(url_query.queryKey.menu);
        last_menu = localStorage.getItem("world_menu");

        if (probably_invalid(RUR.state.current_menu)) {
            if (!probably_invalid(last_menu)) {
                RUR.state.current_menu = last_menu;
            } else {
                RUR.state.current_menu = RUR.initial_defaults.initial_menu;
            }
        }
    }

    RUR.state.creating_menu = true;
    RUR.load_world_file(RUR.state.current_menu);
    if (RUR.file_io_status == "no link") {
        RUR.make_default_menu(RUR.state.human_language);
    }

    RUR.state.creating_menu = false;

}


function restore_blockly () {
    try {
        _restore_blockly();
    } catch (e) {
        console.log("Could not restore blockly; will try once more in 500 ms.");
        setTimeout(_restore_blockly, 500);
    }
}

function _restore_blockly () {
    var xml, xml_text;
    xml_text = localStorage.getItem("blockly");
    if (xml_text) {
        xml = Blockly.Xml.textToDom(xml_text);
        Blockly.Xml.domToWorkspace(xml, RUR.blockly.workspace);
    }
}


function set_editor() {
    "use strict";
    if (localStorage.getItem("editor")){
        editor.setValue(localStorage.getItem("editor"));
    } else {
        editor.setValue(RUR.translate("move") + "()");
    }
}

function set_library() {
    if (localStorage.getItem("library")){
        library.setValue(localStorage.getItem("library"));
    }
}

function get_red_green () {
    /* When objects need to be placed at a given location in the world,
       green is used to indicate numbers of objects properly position
       and red for numbers of objects incorrect.  Users can choose their
       own colour scheme and, if it was done before, their choices are
       retrieved from the browser's local storage. */
    var red, green;
    if (localStorage.getItem("userchoice_red") && localStorage.getItem("userchoice_green")){
        red = localStorage.getItem("userchoice_red");
        green = localStorage.getItem("userchoice_green");
        RUR.configure_red_green(red, green);
    }
}

},{"./file_io/file_io.js":13,"./gui_tools/world_editor.js":15,"./listeners/memorize_world.js":19,"./listeners/onclick.js":20,"./permalink/permalink.js":21,"./rur.js":44,"./storage/storage.js":45,"./ui/add_listeners.js":47,"./ui/keyboard_shortcuts.js":53,"./utils/cors.js":64,"./utils/maze.js":67,"./utils/path_utils.js":68,"./utils/search.js":70,"./world_api/decorative_objects.js":78}],17:[function(require,module,exports){
/*
 * jQuery UI Dialog 1.8.16
 * w/ Minimize & Maximize Support
 * by Elijah Horton (fieryprophet@yahoo.com)
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Dialog
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 *  jquery.ui.button.js
 *	jquery.ui.draggable.js
 *	jquery.ui.mouse.js
 *	jquery.ui.position.js
 *	jquery.ui.resizable.js
 *
 * Modified by André Roberge to remove some IE support which is irrelevant for me.
 */
(function( $, undefined ) {

var uiDialogClasses =
		'ui-dialog ' +
		'ui-widget ' +
		'ui-widget-content ' +
		'ui-corner-all ',
	sizeRelatedOptions = {
		buttons: true,
		height: true,
		maxHeight: true,
		maxWidth: true,
		minHeight: true,
		minWidth: true,
		width: true
	},
	resizableRelatedOptions = {
		maxHeight: true,
		maxWidth: true,
		minHeight: true,
		minWidth: true
	},
	// support for jQuery 1.3.2 - handle common attrFn methods for dialog
	attrFn = $.attrFn || {
		val: true,
		css: true,
		html: true,
		text: true,
		data: true,
		width: true,
		height: true,
		offset: true,
		click: true
	};

$.widget("ui.dialog", {
	options: {
		autoOpen: true,
		buttons: {},
		closeOnEscape: true,
		closeText: 'close',
		dialogClass: '',
		draggable: true,
		hide: null,
		height: 'auto',
		maxHeight: false,
		maxWidth: false,
		minHeight: 150,
		minWidth: 300,
		minimizeText: 'minimize',
		maximizeText: 'maximize',
		minimize: true,
		maximize: true,
		modal: false,
		position: {
			my: 'center',
			at: 'center',
			collision: 'fit',
			// ensure that the titlebar is never outside the document
			using: function(pos) {
				var topOffset = $(this).css(pos).offset().top;
				if (topOffset < 0) {
					$(this).css('top', pos.top - topOffset);
				}
			}
		},
		resizable: true,
		show: null,
		stack: true,
		title: '',
		width: 300,
		zIndex: 1000
	},

	_create: function() {
		this.originalTitle = this.element.attr('title');
		// #5742 - .attr() might return a DOMElement
		if ( typeof this.originalTitle !== "string" ) {
			this.originalTitle = "";
		}

		this.options.title = this.options.title || this.originalTitle;
		var self = this,
			options = self.options,

			title = options.title || '&#160;',
			titleId = $.ui.dialog.getTitleId(self.element),

			uiDialog = (self.uiDialog = $('<div></div>'))
				.appendTo(document.body)
				.hide()
				.addClass(uiDialogClasses + options.dialogClass)
				.css({
					zIndex: options.zIndex
				})
				// setting tabIndex makes the div focusable
				// setting outline to 0 prevents a border on focus in Mozilla
				.attr('tabIndex', -1).css('outline', 0).keydown(function(event) {
					if (options.closeOnEscape && !event.isDefaultPrevented() && event.keyCode &&
						event.keyCode === $.ui.keyCode.ESCAPE) {

						self.close(event);
						event.preventDefault();
					}
				})
				.attr({
					role: 'dialog',
					'aria-labelledby': titleId
				})
				.mousedown(function(event) {
					self.moveToTop(false, event);
				}),

			uiDialogContent = self.element
				.show()
				.removeAttr('title')
				.addClass(
					'ui-dialog-content ' +
					'ui-widget-content')
				.appendTo(uiDialog),

			uiDialogTitlebar = (self.uiDialogTitlebar = $('<div></div>'))
				.addClass(
					'ui-dialog-titlebar ' +
					'ui-widget-header ' +
					'ui-corner-all ' +
					'ui-helper-clearfix'
				)
				.prependTo(uiDialog);
			if(options.minimize && !options.modal){ //cannot use this option with modal
				var uiDialogTitlebarMinimize = $('<a href="#"></a>')
					.addClass(
						'ui-dialog-titlebar-minimize ' +
						'ui-corner-all'
					)
					.attr('role', 'button')
					.hover(
						function() {
							uiDialogTitlebarMinimize.addClass('ui-state-hover');
						},
						function() {
							uiDialogTitlebarMinimize.removeClass('ui-state-hover');
						}
					)
					.focus(function() {
						uiDialogTitlebarMinimize.addClass('ui-state-focus');
					})
					.blur(function() {
						uiDialogTitlebarMinimize.removeClass('ui-state-focus');
					})
					.click(function(event) {
						self.minimize(event);
						return false;
					})
					.appendTo(uiDialogTitlebar),

				uiDialogTitlebarMinimizeText = (self.uiDialogTitlebarMinimizeText = $('<span></span>'))
					.addClass(
						'ui-icon ' +
						'ui-icon-minusthick'
					)
					.text(options.minimizeText)
					.appendTo(uiDialogTitlebarMinimize);
			}
			if(options.maximize && !options.modal){ //cannot use this option with modal
				var uiDialogTitlebarMaximize = $('<a href="#"></a>')
					.addClass(
						'ui-dialog-titlebar-maximize ' +
						'ui-corner-all'
					)
					.attr('role', 'button')
					.hover(
						function() {
							uiDialogTitlebarMaximize.addClass('ui-state-hover');
						},
						function() {
							uiDialogTitlebarMaximize.removeClass('ui-state-hover');
						}
					)
					.focus(function() {
						uiDialogTitlebarMaximize.addClass('ui-state-focus');
					})
					.blur(function() {
						uiDialogTitlebarMaximize.removeClass('ui-state-focus');
					})
					.click(function(event) {
						self.maximize(event);
						return false;
					})
					.appendTo(uiDialogTitlebar),

				uiDialogTitlebarMaximizeText = (self.uiDialogTitlebarMaximizeText = $('<span></span>'))
					.addClass(
						'ui-icon ' +
						'ui-icon-plusthick'
					)
					.text(options.maximizeText)
					.appendTo(uiDialogTitlebarMaximize);
					$(uiDialogTitlebar).dblclick(function(event) {
						self.maximize(event);
						return false;
					});
			}
			if(options.close !== false){
				var uiDialogTitlebarClose = $('<a href="#"></a>')
					.addClass(
						'ui-dialog-titlebar-close ' +
						'ui-corner-all'
					)
					.attr('role', 'button')
					.hover(
						function() {
							uiDialogTitlebarClose.addClass('ui-state-hover');
						},
						function() {
							uiDialogTitlebarClose.removeClass('ui-state-hover');
						}
					)
					.focus(function() {
						uiDialogTitlebarClose.addClass('ui-state-focus');
					})
					.blur(function() {
						uiDialogTitlebarClose.removeClass('ui-state-focus');
					})
					.click(function(event) {
						self.close(event);
						return false;
					})
					.appendTo(uiDialogTitlebar),

				uiDialogTitlebarCloseText = (self.uiDialogTitlebarCloseText = $('<span></span>'))
					.addClass(
						'ui-icon ' +
						'ui-icon-closethick'
					)
					.text(options.closeText)
					.appendTo(uiDialogTitlebarClose);
			}

			uiDialogTitle = $('<span></span>')
				.addClass('ui-dialog-title')
				.attr('id', titleId)
				.html(title)
				.prependTo(uiDialogTitlebar);

		//handling of deprecated beforeclose (vs beforeClose) option
		//Ticket #4669 http://dev.jqueryui.com/ticket/4669
		//TODO: remove in 1.9pre
		if ($.isFunction(options.beforeclose) && !$.isFunction(options.beforeClose)) {
			options.beforeClose = options.beforeclose;
		}

		uiDialogTitlebar.find("*").add(uiDialogTitlebar).disableSelection();

		if (options.draggable && $.fn.draggable) {
			self._makeDraggable();
		}
		if (options.resizable && $.fn.resizable) {
			self._makeResizable();
		}

		self._createButtons(options.buttons);
		self._isOpen = false;
		self._min = false;

		if ($.fn.bgiframe) {
			uiDialog.bgiframe();
		}
	},

	_init: function() {
		if ( this.options.autoOpen ) {
			this.open();
		}
	},

	destroy: function() {
		var self = this;

		if (self.overlay) {
			self.overlay.destroy();
		}
		self.uiDialog.hide();
		self.element
			.unbind('.dialog')
			.removeData('dialog')
			.removeClass('ui-dialog-content ui-widget-content')
			.hide().appendTo('body');
		self.uiDialog.remove();

		if (self.originalTitle) {
			self.element.attr('title', self.originalTitle);
		}

		return self;
	},

	widget: function() {
		return this.uiDialog;
	},

	minimize: function(event) {
		var self = this,
			ui = self.uiDialog;
		if(false === self._trigger('beforeMinimize', event)) {
			return;
		}
		if(!ui.data('is-minimized')){
			if(self.options.minimize && typeof self.options.minimize !== "boolean" && $(self.options.minimize).length > 0){
				self._min = $('<a>' + (ui.find('span.ui-dialog-title').html().replace(/&nbsp;/, '') || 'Untitled Dialog') + '</a>')
					.attr('title', 'Click to restore dialog').addClass('ui-corner-all ui-button').click(function(event){self.unminimize(event);});
				$(self.options.minimize).append(self._min);
				ui.data('is-minimized', true).hide();
			} else {
				if(ui.is( ":data(resizable)" )) {
					ui.data('was-resizable', true).resizable('destroy');
				} else {
					ui.data('was-resizable', false)
				}
				ui.data('minimized-height', ui.height());
				ui.find('.ui-dialog-content').hide();
				ui.find('.ui-dialog-titlebar-maximize').hide();
				ui.find('.ui-dialog-titlebar-minimize').css('right', '1.8em').removeClass('ui-icon-minusthick').addClass('ui-icon-arrowthickstop-1-s')
					.find('span').removeClass('ui-icon-minusthick').addClass('ui-icon-arrowthickstop-1-s').click(function(event){self.unminimize(event); return false;});;
				ui.data('is-minimized', true).height('auto');
			}
		}
		return self;
	},

	unminimize: function(event) {
		var self = this,
			ui = self.uiDialog;
		if(false === self._trigger('beforeUnminimize', event)) {
			return;
		}
		if(ui.data('is-minimized')){
			if(self._min){
				self._min.unbind().remove();
				self._min = false;
				ui.data('is-minimized', false).show();
				self.moveToTop();
			} else {
				ui.height(ui.data('minimized-height')).data('is-minimized', false).removeData('minimized-height').find('.ui-dialog-content').show();
				ui.find('.ui-dialog-titlebar-maximize').show();
				ui.find('.ui-dialog-titlebar-minimize').css('right', '3.3em').removeClass('ui-icon-arrowthickstop-1-s').addClass('ui-icon-minusthick')
					.find('span').removeClass('ui-icon-arrowthickstop-1-s').addClass('ui-icon-minusthick').click(function(event){self.minimize(event); return false;});
				if(ui.data('was-resizable') == true) {
					self._makeResizable(true);
				}
			}
		}
		return self;
	},

	maximize: function(event) {
		var self = this,
			ui = self.uiDialog;

		if(false === self._trigger('beforeMaximize', event)) {
			return;
		}
		if(!ui.data('is-maximized')){
			if(ui.is( ":data(draggable)" )) {
				ui.data('was-draggable', true).draggable('destroy');
			} else {
				ui.data('was-draggable', false)
			}
			if(ui.is( ":data(resizable)" )) {
				ui.data('was-resizable', true).resizable('destroy');
			} else {
				ui.data('was-resizable', false)
			}
			ui.data('maximized-height', ui.height()).data('maximized-width', ui.width()).data('maximized-top', ui.css('top')).data('maximized-left', ui.css('left'))
				.data('is-maximized', true).height($(window).height()-8).width($(window).width()+9).css({"top":0, "left": 0}).find('.ui-dialog-titlebar-minimize').hide();
			ui.find('.ui-dialog-titlebar-maximize').removeClass('ui-icon-plusthick').addClass('ui-icon-arrowthick-1-sw')
				.find('span').removeClass('ui-icon-plusthick').addClass('ui-icon-arrowthick-1-sw').click(function(event){self.unmaximize(event); return false;});
			ui.find('.ui-dialog-titlebar').dblclick(function(event){self.unmaximize(event); return false;});
		}
		return self;
	},

	unmaximize: function(event) {
		var self = this,
			ui = self.uiDialog;

		if(false === self._trigger('beforeUnmaximize', event)) {
			return;
		}
		if(ui.data('is-maximized')){
			ui.height(ui.data('maximized-height')).width(ui.data('maximized-width')).css({"top":ui.data('maximized-top'), "left":ui.data('maximized-left')})
				.data('is-maximized', false).removeData('maximized-height').removeData('maximized-width').removeData('maximized-top').removeData('maximized-left').find('.ui-dialog-titlebar-minimize').show();
			ui.find('.ui-dialog-titlebar-maximize').removeClass('ui-icon-arrowthick-1-sw').addClass('ui-icon-plusthick')
				.find('span').removeClass('ui-icon-arrowthick-1-sw').addClass('ui-icon-plusthick').click(function(){self.maximize(event); return false;});
			ui.find('.ui-dialog-titlebar').dblclick(function(event){self.maximize(event); return false;});
			if(ui.data('was-draggable') == true) {
				self._makeDraggable(true);
			}
			if(ui.data('was-resizable') == true) {
				self._makeResizable(true);
			}
		}
		return self;
	},

	close: function(event) {
		var self = this,
			maxZ, thisZ;

		if (false === self._trigger('beforeClose', event)) {
			return;
		}
		if (self.overlay) {
			self.overlay.destroy();
		}
		self.uiDialog.unbind('keypress.ui-dialog');

		self._isOpen = false;

		if (self.options.hide) {
			self.uiDialog.hide(self.options.hide, function() {
				self._trigger('close', event);
			});
		} else {
			self.uiDialog.hide();
			self._trigger('close', event);
		}

		$.ui.dialog.overlay.resize();

		// adjust the maxZ to allow other modal dialogs to continue to work (see #4309)
		if (self.options.modal) {
			maxZ = 0;
			$('.ui-dialog').each(function() {
				if (this !== self.uiDialog[0]) {
					thisZ = $(this).css('z-index');
					if(!isNaN(thisZ)) {
						maxZ = Math.max(maxZ, thisZ);
					}
				}
			});
			$.ui.dialog.maxZ = maxZ;
		}
		return self;
	},

	isOpen: function() {
		return this._isOpen;
	},

	// the force parameter allows us to move modal dialogs to their correct
	// position on open
	moveToTop: function(force, event) {
		var self = this,
			options = self.options,
			saveScroll;

		if ((options.modal && !force) ||
			(!options.stack && !options.modal)) {
			return self._trigger('focus', event);
		}

		if (options.zIndex > $.ui.dialog.maxZ) {
			$.ui.dialog.maxZ = options.zIndex;
		}
		if (self.overlay) {
			$.ui.dialog.maxZ += 1;
			self.overlay.$el.css('z-index', $.ui.dialog.overlay.maxZ = $.ui.dialog.maxZ);
		}

		//Save and then restore scroll since Opera 9.5+ resets when parent z-Index is changed.
		//  http://ui.jquery.com/bugs/ticket/3193
		saveScroll = { scrollTop: self.element.scrollTop(), scrollLeft: self.element.scrollLeft() };
		$.ui.dialog.maxZ += 1;
		self.uiDialog.css('z-index', $.ui.dialog.maxZ);
		self.element.attr(saveScroll);
		self._trigger('focus', event);

		return self;
	},

	open: function() {
		if (this._isOpen) { return; }

		var self = this,
			options = self.options,
			uiDialog = self.uiDialog;

		self.overlay = options.modal ? new $.ui.dialog.overlay(self) : null;
		self._size();
		self._position(options.position);
		uiDialog.show(options.show);
		self.moveToTop(true);

		// prevent tabbing out of modal dialogs
		if (options.modal) {
			uiDialog.bind('keypress.ui-dialog', function(event) {
				if (event.keyCode !== $.ui.keyCode.TAB) {
					return;
				}

				var tabbables = $(':tabbable', this),
					first = tabbables.filter(':first'),
					last  = tabbables.filter(':last');

				if (event.target === last[0] && !event.shiftKey) {
					first.focus(1);
					return false;
				} else if (event.target === first[0] && event.shiftKey) {
					last.focus(1);
					return false;
				}
			});
		}

		// set focus to the first tabbable element in the content area or the first button
		// if there are no tabbable elements, set focus on the dialog itself
		$(self.element.find(':tabbable').get().concat(
			uiDialog.find('.ui-dialog-buttonpane :tabbable').get().concat(
				uiDialog.get()))).eq(0).focus();

		self._isOpen = true;
		self._trigger('open');

		return self;
	},

	_createButtons: function(buttons) {
		var self = this,
			hasButtons = false,
			uiDialogButtonPane = $('<div></div>')
				.addClass(
					'ui-dialog-buttonpane ' +
					'ui-widget-content ' +
					'ui-helper-clearfix'
				),
			uiButtonSet = $( "<div></div>" )
				.addClass( "ui-dialog-buttonset" )
				.appendTo( uiDialogButtonPane );

		// if we already have a button pane, remove it
		self.uiDialog.find('.ui-dialog-buttonpane').remove();

		if (typeof buttons === 'object' && buttons !== null) {
			$.each(buttons, function() {
				return !(hasButtons = true);
			});
		}
		if (hasButtons) {
			$.each(buttons, function(name, props) {
				props = $.isFunction( props ) ?
					{ click: props, text: name } :
					props;
				var button = $('<button type="button"></button>')
					.click(function() {
						props.click.apply(self.element[0], arguments);
					})
					.appendTo(uiButtonSet);
				// can't use .attr( props, true ) with jQuery 1.3.2.
				$.each( props, function( key, value ) {
					if ( key === "click" ) {
						return;
					}
					if ( key in attrFn ) {
						button[ key ]( value );
					} else {
						button.attr( key, value );
					}
				});
				if ($.fn.button) {
					button.button();
				}
			});
			uiDialogButtonPane.appendTo(self.uiDialog);
		}
	},

	_makeDraggable: function() {
		var self = this,
			options = self.options,
			doc = $(document),
			heightBeforeDrag;

		function filteredUi(ui) {
			return {
				position: ui.position,
				offset: ui.offset
			};
		}

		self.uiDialog.draggable({
			cancel: '.ui-dialog-content, .ui-dialog-titlebar-close',
			handle: '.ui-dialog-titlebar',
			containment: 'document',
			start: function(event, ui) {
				heightBeforeDrag = options.height === "auto" ? "auto" : $(this).height();
				$(this).height($(this).height()).addClass("ui-dialog-dragging");
				self._trigger('dragStart', event, filteredUi(ui));
			},
			drag: function(event, ui) {
				self._trigger('drag', event, filteredUi(ui));
			},
			stop: function(event, ui) {
				options.position = [ui.position.left - doc.scrollLeft(),
					ui.position.top - doc.scrollTop()];
				$(this).removeClass("ui-dialog-dragging").height(heightBeforeDrag);
				self._trigger('dragStop', event, filteredUi(ui));
				$.ui.dialog.overlay.resize();
			}
		});
	},

	_makeResizable: function(handles) {
		handles = (handles === undefined ? this.options.resizable : handles);
		var self = this,
			options = self.options,
			// .ui-resizable has position: relative defined in the stylesheet
			// but dialogs have to use absolute or fixed positioning
			position = self.uiDialog.css('position'),
			resizeHandles = (typeof handles === 'string' ?
				handles	:
				'n,e,s,w,se,sw,ne,nw'
			);

		function filteredUi(ui) {
			return {
				originalPosition: ui.originalPosition,
				originalSize: ui.originalSize,
				position: ui.position,
				size: ui.size
			};
		}
		self.uiDialog.resizable({
			cancel: '.ui-dialog-content',
			containment: 'document',
			alsoResize: self.element,
			maxWidth: options.maxWidth,
			maxHeight: options.maxHeight,
			minWidth: options.minWidth,
			minHeight: self._minHeight(),
			handles: resizeHandles,
			start: function(event, ui) {
				$(this).addClass("ui-dialog-resizing");
				self._trigger('resizeStart', event, filteredUi(ui));
			},
			resize: function(event, ui){
				self._trigger('resize', event, filteredUi(ui));
			},
			stop: function(event, ui) {
				$(this).removeClass("ui-dialog-resizing");
				options.height = $(this).height();
				options.width = $(this).width();
				self._trigger('resizeStop', event, filteredUi(ui));
				$.ui.dialog.overlay.resize();
			}
		})
		.css('position', position)
		.find('.ui-resizable-se').addClass('ui-icon ui-icon-grip-diagonal-se');
	},

	_minHeight: function() {
		var options = this.options;

		if (options.height === 'auto') {
			return options.minHeight;
		} else {
			return Math.min(options.minHeight, options.height);
		}
	},

	_position: function(position) {
		var myAt = [],
			offset = [0, 0],
			isVisible;

		if (position) {
			// deep extending converts arrays to objects in jQuery <= 1.3.2 :-(
	//		if (typeof position == 'string' || $.isArray(position)) {
	//			myAt = $.isArray(position) ? position : position.split(' ');

			if (typeof position === 'string' || (typeof position === 'object' && '0' in position)) {
				myAt = position.split ? position.split(' ') : [position[0], position[1]];
				if (myAt.length === 1) {
					myAt[1] = myAt[0];
				}

				$.each(['left', 'top'], function(i, offsetPosition) {
					if (+myAt[i] === myAt[i]) {
						offset[i] = myAt[i];
						myAt[i] = offsetPosition;
					}
				});

				position = {
					my: myAt.join(" "),
					at: myAt.join(" "),
					offset: offset.join(" ")
				};
			}

			position = $.extend({}, $.ui.dialog.prototype.options.position, position);
		} else {
			position = $.ui.dialog.prototype.options.position;
		}

		// need to show the dialog to get the actual offset in the position plugin
		isVisible = this.uiDialog.is(':visible');
		if (!isVisible) {
			this.uiDialog.show();
		}
		this.uiDialog
			// workaround for jQuery bug #5781 http://dev.jquery.com/ticket/5781
			//.css({ top: 0, left: 0 })
			.position($.extend({ of: window }, position));
		if (!isVisible) {
			this.uiDialog.hide();
		}
	},

	_setOptions: function( options ) {
		var self = this,
			resizableOptions = {},
			resize = false;

		$.each( options, function( key, value ) {
			self._setOption( key, value );

			if ( key in sizeRelatedOptions ) {
				resize = true;
			}
			if ( key in resizableRelatedOptions ) {
				resizableOptions[ key ] = value;
			}
		});

		if ( resize ) {
			this._size();
		}
		if ( this.uiDialog.is( ":data(resizable)" ) ) {
			this.uiDialog.resizable( "option", resizableOptions );
		}
	},

	_setOption: function(key, value){
		var self = this,
			uiDialog = self.uiDialog;

		switch (key) {
			//handling of deprecated beforeclose (vs beforeClose) option
			//Ticket #4669 http://dev.jqueryui.com/ticket/4669
			//TODO: remove in 1.9pre
			case "beforeclose":
				key = "beforeClose";
				break;
			case "buttons":
				self._createButtons(value);
				break;
			case "closeText":
				// ensure that we always pass a string
				self.uiDialogTitlebarCloseText.text("" + value);
				break;
			case "dialogClass":
				uiDialog
					.removeClass(self.options.dialogClass)
					.addClass(uiDialogClasses + value);
				break;
			case "disabled":
				if (value) {
					uiDialog.addClass('ui-dialog-disabled');
				} else {
					uiDialog.removeClass('ui-dialog-disabled');
				}
				break;
			case "draggable":
				var isDraggable = uiDialog.is( ":data(draggable)" );
				if ( isDraggable && !value ) {
					uiDialog.draggable( "destroy" );
				}

				if ( !isDraggable && value ) {
					self._makeDraggable();
				}
				break;
			case "position":
				self._position(value);
				break;
			case "resizable":
				// currently resizable, becoming non-resizable
				var isResizable = uiDialog.is( ":data(resizable)" );
				if (isResizable && !value) {
					uiDialog.resizable('destroy');
				}

				// currently resizable, changing handles
				if (isResizable && typeof value === 'string') {
					uiDialog.resizable('option', 'handles', value);
				}

				// currently non-resizable, becoming resizable
				if (!isResizable && value !== false) {
					self._makeResizable(value);
				}
				break;
			case "title":
				// convert whatever was passed in o a string, for html() to not throw up
				$(".ui-dialog-title", self.uiDialogTitlebar).html("" + (value || '&#160;'));
				break;
		}

		$.Widget.prototype._setOption.apply(self, arguments);
	},

	_size: function() {
		/* If the user has resized the dialog, the .ui-dialog and .ui-dialog-content
		 * divs will both have width and height set, so we need to reset them
		 */
		var options = this.options,
			nonContentHeight,
			minContentHeight,
			isVisible = this.uiDialog.is( ":visible" );

		// reset content sizing
		this.element.show().css({
			width: 'auto',
			minHeight: 0,
			height: 0
		});

		if (options.minWidth > options.width) {
			options.width = options.minWidth;
		}

		// reset wrapper sizing
		// determine the height of all the non-content elements
		nonContentHeight = this.uiDialog.css({
				height: 'auto',
				width: options.width
			})
			.height();
		minContentHeight = Math.max( 0, options.minHeight - nonContentHeight );

		if ( options.height === "auto" ) {
			// only needed for IE6 support
			if ( $.support.minHeight ) {
				this.element.css({
					minHeight: minContentHeight,
					height: "auto"
				});
			} else {
				this.uiDialog.show();
				var autoHeight = this.element.css( "height", "auto" ).height();
				if ( !isVisible ) {
					this.uiDialog.hide();
				}
				this.element.height( Math.max( autoHeight, minContentHeight ) );
			}
		} else {
			this.element.height( Math.max( options.height - nonContentHeight, 0 ) );
		}

		if (this.uiDialog.is(':data(resizable)')) {
			this.uiDialog.resizable('option', 'minHeight', this._minHeight());
		}
	}
});

$.extend($.ui.dialog, {
	version: "1.8.16",

	uuid: 0,
	maxZ: 0,

	getTitleId: function($el) {
		var id = $el.attr('id');
		if (!id) {
			this.uuid += 1;
			id = this.uuid;
		}
		return 'ui-dialog-title-' + id;
	},

	overlay: function(dialog) {
		this.$el = $.ui.dialog.overlay.create(dialog);
	}
});

$.extend($.ui.dialog.overlay, {
	instances: [],
	// reuse old instances due to IE memory leak with alpha transparency (see #5185)
	oldInstances: [],
	maxZ: 0,
	events: $.map('focus,mousedown,mouseup,keydown,keypress,click'.split(','),
		function(event) { return event + '.dialog-overlay'; }).join(' '),
	create: function(dialog) {
		if (this.instances.length === 0) {
			// prevent use of anchors and inputs
			// we use a setTimeout in case the overlay is created from an
			// event that we're going to be cancelling (see #2804)
			setTimeout(function() {
				// handle $(el).dialog().dialog('close') (see #4065)
				if ($.ui.dialog.overlay.instances.length) {
					$(document).bind($.ui.dialog.overlay.events, function(event) {
						// stop events if the z-index of the target is < the z-index of the overlay
						// we cannot return true when we don't want to cancel the event (#3523)
						if ($(event.target).zIndex() < $.ui.dialog.overlay.maxZ) {
							return false;
						}
					});
				}
			}, 1);

			// allow closing by pressing the escape key
			$(document).bind('keydown.dialog-overlay', function(event) {
				if (dialog.options.closeOnEscape && !event.isDefaultPrevented() && event.keyCode &&
					event.keyCode === $.ui.keyCode.ESCAPE) {

					dialog.close(event);
					event.preventDefault();
				}
			});

			// handle window resize
			$(window).bind('resize.dialog-overlay', $.ui.dialog.overlay.resize);
		}

		var $el = (this.oldInstances.pop() || $('<div></div>').addClass('ui-widget-overlay'))
			.appendTo(document.body)
			.css({
				width: this.width(),
				height: this.height()
			});

		if ($.fn.bgiframe) {
			$el.bgiframe();
		}

		this.instances.push($el);
		return $el;
	},

	destroy: function($el) {
		var indexOf = $.inArray($el, this.instances);
		if (indexOf != -1){
			this.oldInstances.push(this.instances.splice(indexOf, 1)[0]);
		}

		if (this.instances.length === 0) {
			$([document, window]).unbind('.dialog-overlay');
		}

		$el.remove();

		// adjust the maxZ to allow other modal dialogs to continue to work (see #4309)
		var maxZ = 0;
		$.each(this.instances, function() {
			maxZ = Math.max(maxZ, this.css('z-index'));
		});
		this.maxZ = maxZ;
	},

	height: function() {
		return $(document).height() + 'px';
	},

	width: function() {
		return $(document).width() + 'px';
	},

	resize: function() {
		/* If the dialog is draggable and the user drags it past the
		 * right edge of the window, the document becomes wider so we
		 * need to stretch the overlay. If the user then drags the
		 * dialog back to the left, the document will become narrower,
		 * so we need to shrink the overlay to the appropriate size.
		 * This is handled by shrinking the overlay before setting it
		 * to the full document size.
		 */
		var $overlays = $([]);
		$.each($.ui.dialog.overlay.instances, function() {
			$overlays = $overlays.add(this);
		});

		$overlays.css({
			width: 0,
			height: 0
		}).css({
			width: $.ui.dialog.overlay.width(),
			height: $.ui.dialog.overlay.height()
		});
	}
});

$.extend($.ui.dialog.overlay.prototype, {
	destroy: function() {
		$.ui.dialog.overlay.destroy(this.$el);
	}
});

}(jQuery));
},{}],18:[function(require,module,exports){
require("./../rur.js");

/* tooltip intended to provide information about objects carried by robot */
var tooltip = {};

$(document).ready(function () {
    $("#robot-anim-canvas").mousemove(function (evt) {
        RUR.mouse_x = evt.pageX;
        RUR.mouse_y = evt.pageY;
        handleMouseMove(evt);
    });
    $("#robot-anim-canvas").on("click", function (evt) {
        RUR.mouse_x = evt.pageX;
        RUR.mouse_y = evt.pageY;
    }); // mouse clicks also requested in world_editor.js (at bottom)

    tooltip.canvas = document.getElementById("tooltip");
    tooltip.ctx = tooltip.canvas.getContext("2d");
});



function handleMouseMove(evt) {
    var i, j, x, y, pos, position, world, robot, mouse_above_robot, image, nb_obj;
    var size = 40, objects_carried;

    world = RUR.get_current_world();
    x = evt.pageX - $("#robot-anim-canvas").offset().left;
    y = evt.pageY - $("#robot-anim-canvas").offset().top;
    position = RUR.calculate_grid_position();
    tooltip.canvas.style.left = "-200px";
    if (!tooltip.mouse_contained) {
        return;
    }

    //mouse_above_robot = false;
    if (world.robots !== undefined) {
        for (i=0; i < world.robots.length; i++) {
            robot = world.robots[i];
            if (robot.possible_initial_positions === undefined) {
                robot.possible_initial_positions = [[robot.x, robot.y]];
            }
            for (j=0; j < robot.possible_initial_positions.length; j++){
                pos = robot.possible_initial_positions[j];
                if(pos[0]==position[0] && pos[1]==position[1]){
                    mouse_above_robot = true;
                    if (robot.objects !== undefined){
                        objects_carried = Object.keys(robot.objects);
                        break;
                    }
                }
            }
            if (mouse_above_robot) {
                break;
            }
        }
    }

    tooltip.canvas.height = size;
    if (objects_carried !== undefined) {
        tooltip.canvas.width = size*Math.max(objects_carried.length, 1);
    } else {
        tooltip.canvas.width = size;
        objects_carried = [];
    }
    if (mouse_above_robot){
        tooltip.canvas.style.left = x+20 + "px";
        tooltip.canvas.style.top = y + "px";
        tooltip.ctx.clearRect(0, 0, tooltip.canvas.width, tooltip.canvas.height);
        for (i=0; i < objects_carried.length; i++){
            image = RUR.THINGS[objects_carried[i]].image;
            if (image === undefined) {
                image = RUR.THINGS[objects_carried[i]]["image0"];
            }
            nb_obj = robot.objects[objects_carried[i]];
            if (nb_obj == "infinite" || nb_obj == Infinity) {
                nb_obj = "∞";
            }
            tooltip.ctx.drawImage(image, i*size, 0, image.width, image.height);
            tooltip.ctx.fillText(nb_obj, i*size+1, size-1);
        }
    }
}

RUR.calculate_grid_position = function () {
    var x, y;
    x = RUR.mouse_x - $("#robot-anim-canvas").offset().left;
    y = RUR.mouse_y - $("#robot-anim-canvas").offset().top;

    x /= RUR.WALL_LENGTH;
    x = Math.floor(x);

    y = RUR.HEIGHT - y + RUR.WALL_THICKNESS;
    y /= RUR.WALL_LENGTH;
    y = Math.floor(y);

    tooltip.mouse_contained = true;
    if (x < 1 ) {
        x = 1;
        tooltip.mouse_contained = false;
    } else if (x > RUR.MAX_X) {
        x = RUR.MAX_X;
        tooltip.mouse_contained = false;
    }
    if (y < 1 ) {
        y = 1;
        tooltip.mouse_contained = false;
    } else if (y > RUR.MAX_Y) {
        y = RUR.MAX_Y;
        tooltip.mouse_contained = false;
    }
    return [x, y];
};

},{"./../rur.js":44}],19:[function(require,module,exports){

require("./../rur.js");
require("./../storage/storage.js");
var record_id = require("./../../lang/msg.js").record_id;

record_id("memorize-world", "Save world in browser");

memorize_world = function () {
    var existing_names, i, key;

    existing_names = '';
    for (i = 0; i <= localStorage.length - 1; i++) {
        key = localStorage.key(i);
        if (key.slice(0, 11) === "user_world:") {
            if (!existing_names) {
                existing_names = "Existing names: " + key.substring(11);
            } else {
                existing_names += "," + key.substring(11);
            }
        }
    }

    if (existing_names) {
        $("#existing-world-names").html(existing_names);
    }
    dialog.dialog("open");
};

$(document).ready(function() {
    var memorize_button = document.getElementById("memorize-world");
    memorize_button.addEventListener("click", memorize_world, false);
});

$(document).ready(function() {
    dialog = $("#dialog-save-world").dialog({
        autoOpen: false,
        height: 400,
        width: 500,
        modal: true,
        buttons: {
            OK: function () {
                save_world();
            },
            Cancel: function() {
                dialog.dialog("close");
            }
        }
    });

    dialog.find("form").on("submit", function( event ) {
        event.preventDefault();
        save_world();
    });
});


save_world = function () {
    RUR.set_current_world(RUR.update_world_from_editors(RUR.get_current_world()));
    RUR.storage._save_world($("#world-name").val().trim());
    dialog.dialog("close");
    $('#delete-world').show();
};

},{"./../../lang/msg.js":95,"./../rur.js":44,"./../storage/storage.js":45}],20:[function(require,module,exports){
/* Sets up what happens when the user clicks on various html elements.
*/

require("./../translator.js");
require("./../editors/update.js");
require("./../rur.js");
require("./../editors/create.js");
require("./../programming_api/blockly.js");
// depends on filesaver.js loaded in main html page

var record_id = require("./../../lang/msg.js").record_id;
var record_value = require("./../../lang/msg.js").record_value;

function remove_fileInput_listener () {
    // see http://stackoverflow.com/a/19470348
    var el = document.getElementById('fileInput'),
        elClone = el.cloneNode(true);
    el.parentNode.replaceChild(elClone, el);
}
exports.remove_fileInput_listener = remove_fileInput_listener;

function load_file (obj) {
    var fileInput;
    remove_fileInput_listener();
    $("#fileInput").click();    
    fileInput = document.getElementById('fileInput');    
    fileInput.addEventListener('change', function(e) {
        var file = fileInput.files[0];
        var reader = new FileReader();
        reader.onload = function(e) {
            obj.setValue(reader.result);
            fileInput.value = '';
        };
        reader.readAsText(file);
    });
}
exports.load_file = load_file;


record_id("load-world", "LOAD WORLD");
record_id("load-world-text", "LOAD WORLD EXPLAIN");

$(document).ready(function () {
    $("#load-world").on("click", function(evt) {
        var fileInput;
        remove_fileInput_listener();
        $("#fileInput").click();
        fileInput = document.getElementById('fileInput');
        fileInput.addEventListener('change', function(e) {
            var file = fileInput.files[0];
            var reader = new FileReader();
            reader.onload = function(e) {
                try {
                    RUR.world_utils.import_world(reader.result);
                    RUR.storage.save_world(file.name);
                } catch (e) {  // jshint ignore:line
                    console.log("invalid world", e);
                    RUR.show_feedback("#Reeborg-shouts",
                                         RUR.translate("Invalid world file."));
                }
                fileInput.value = '';
            };
            reader.readAsText(file);
        });
    });
});



record_value("save-blockly", "SAVE BLOCKLY");
record_id("save-blockly-text", "SAVE BLOCKLY EXPLAIN");

record_value("save-editor", "SAVE EDITOR");
record_id("save-editor-text", "SAVE EDITOR EXPLAIN");

$(document).ready(function () {
    var save_blockly_form = document.getElementById("save-blockly-form");
    save_blockly_form.addEventListener("submit", function(event) {
        event.preventDefault();
        var blockly_filename = document.getElementById("blockly-filename");
        var blob = new Blob([RUR.blockly.getValue()], {
            type: "text/xml;charset=utf-8"
        });
        saveAs(blob, (blockly_filename.value || blockly_filename.placeholder) + ".xml", true);
     }, false);


    var save_editor_form = document.getElementById("save-editor-form");
    save_editor_form.addEventListener("submit", function(event) {
        var blob;
        event.preventDefault();
        var editor_filename = document.getElementById("editor-filename");
        if (RUR.state.programming_language == "python") {
            blob = new Blob([editor.getValue()], {
                type: "text/python;charset=utf-8"
            });
            saveAs(blob, (editor_filename.value || editor_filename.placeholder) + ".py", true);
        } else {
            blob = new Blob([editor.getValue()], {
                type: "text/javascript;charset=utf-8"
            });
            saveAs(blob, (editor_filename.value || editor_filename.placeholder) + ".js", true);
        }

     }, false);
});



record_value("save-library", "SAVE LIBRARY");
record_id("save-library-text", "SAVE LIBRARY EXPLAIN");
record_value("save-world", "SAVE WORLD");
record_id("save-world-text", "SAVE WORLD EXPLAIN");

$(document).ready(function () {
    var save_library_form = document.getElementById("save-library-form");
    save_library_form.addEventListener("submit", function(event) {
        event.preventDefault();
        var library_filename = document.getElementById("library-filename");
        var blob = new Blob([library.getValue()], {
            type: "text/python;charset=utf-8"
        });
        saveAs(blob, (library_filename.value || library_filename.placeholder) + ".py", true);
     }, false);


    var save_world_form = document.getElementById("save-world-form");
    save_world_form.addEventListener("submit", function(event) {
        event.preventDefault();
        var world_filename = document.getElementById("world-filename");
        RUR.set_current_world(RUR.update_world_from_editors(RUR.get_current_world()));
        var blob = new Blob([RUR.export_world()], {
            type: "text/javascript;charset=utf-8"
        });
        saveAs(blob, (world_filename.value || world_filename.placeholder) + ".json", true);
     }, false);
});
    

record_id("load-blockly-btn", "LOAD BLOCKLY");
record_id("load-blockly-text", "LOAD BLOCKLY EXPLAIN");
record_id("load-editor-btn", "LOAD EDITOR");
record_id("load-editor-text", "LOAD EDITOR EXPLAIN");
record_id("load-library-btn", "LOAD LIBRARY");
record_id("load-library-text", "LOAD LIBRARY EXPLAIN");

$(document).ready(function() {
    $("#load-blockly-btn").on("click", function (evt) {
        load_file(RUR.blockly);
    });

    $("#load-editor-btn").on("click", function (evt) {
        load_file(editor);
    });

    $("#load-library-btn").on("click", function (evt) {
        load_file(library);
    });
});
    


function toggle_content (name, obj) {
    var world = RUR.get_current_world();
    record_id("add-" + name + "-to-world-btn");
    record_id("add-" + name + "-ok");
    record_id("add-" + name + "-not-ok");
    $("#add-" + name + "-to-world-btn").on("click", function(evt) {
        if ($(this).hasClass("blue-gradient")) {
            $("#add-" + name + "-ok").show();
            $("#add-" + name + "-not-ok").hide();
            world[name] = obj.getValue();
        } else {
            $("#add-" + name + "-ok").hide();
            $("#add-" + name + "-not-ok").show();
            delete world[name];
        }
        $(this).toggleClass("blue-gradient");
        $(this).toggleClass("active-element");
    });
}

record_id("add-content-to-world", "ADD CONTENT TO WORLD");
record_id("add-blockly-text", "ADD BLOCKLY TEXT");
record_id("add-editor-text", "ADD EDITOR TEXT");
record_id("add-library-text", "ADD LIBRARY TEXT");
record_id("add-pre-text", "ADD PRE TEXT");
record_id("add-post-text", "ADD POST TEXT");
record_id("add-description-text", "ADD DESCRIPTION TEXT");
record_id("add-onload-text", "ADD ONLOAD TEXT");

$(document).ready(function() {
    toggle_content("blockly", RUR.blockly);
    toggle_content("editor", editor);
    toggle_content("library", library);
    toggle_content("pre", pre_code_editor);
    toggle_content("post", post_code_editor);
    toggle_content("description", description_editor);
    toggle_content("onload", onload_editor);
});

    


record_id("increase-font-size");
record_id("decrease-font-size");

function change_editors_font_size() {
    editor.getWrapperElement().style["font-size"] = RUR.state.editors_font_size + "px";
    library.getWrapperElement().style["font-size"] = RUR.state.editors_font_size + "px";
    pre_code_editor.getWrapperElement().style["font-size"] = RUR.state.editors_font_size + "px";
    post_code_editor.getWrapperElement().style["font-size"] = RUR.state.editors_font_size + "px";
    onload_editor.getWrapperElement().style["font-size"] = RUR.state.editors_font_size + "px";
    description_editor.getWrapperElement().style["font-size"] = RUR.state.editors_font_size + "px";
}

$(document).ready(function() {
    $("#increase-font-size").on("click", function(evt) {
        var index, sizes;

        sizes = [8, 10, 12, 14, 16, 18, 20, 23, 26, 30, 34, 38, 42, 46, 50];
        if (RUR.state.editors_font_size === undefined) {
            RUR.state.editors_font_size = 20;
        } else {
            index = sizes.indexOf(RUR.state.editors_font_size);
            if (index == -1) {
                RUR.state.editors_font_size += 5;
            } else if (index < sizes.length-1) {
                RUR.state.editors_font_size = sizes[index+1];
            } else {
                RUR.state.editors_font_size += 5;
            }
        }
        change_editors_font_size();
    });

    $("#decrease-font-size").on("click", function(evt) {
        var index, sizes;

        sizes = [8, 10, 12, 14, 16, 18, 20, 23, 26, 30, 34, 38, 42, 46, 50];
        if (RUR.state.editors_font_size === undefined) {
            RUR.state.editors_font_size = 12;
        } else {
            index = sizes.indexOf(RUR.state.editors_font_size);
            if (index == -1) {
                RUR.state.editors_font_size -= 5;
            } else if (index > 0) {
                RUR.state.editors_font_size = sizes[index-1];
            }
        }
        change_editors_font_size();
    });    
});


},{"./../../lang/msg.js":95,"./../editors/create.js":11,"./../editors/update.js":12,"./../programming_api/blockly.js":25,"./../rur.js":44,"./../translator.js":46}],21:[function(require,module,exports){
require("./../rur.js");

function parseUri (str) {
    // parseUri 1.2.2
    // (c) Steven Levithan <stevenlevithan.com>
    // MIT License
    var o   = parseUri.options,
        m   = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
        uri = {},
        i   = 14;

    while (i--) uri[o.key[i]] = m[i] || "";

    uri[o.q.name] = {};
    uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
        if ($1) uri[o.q.name][$1] = $2;
    });

    return uri;
}

parseUri.options = {
    strictMode: false,
    key: ["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],
    q:   {
        name:   "queryKey",
        parser: /(?:^|&)([^&=]*)=?([^&]*)/g
    },
    parser: {
        strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
        loose:  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
    }
};

RUR.permalink = {};
RUR.permalink.parseUri = parseUri;

RUR.permalink.update_URI = function() {
    "use strict";
    var url_query, permalink;

    // Do not mess up with URI during initialization 
    if (!RUR.state.session_initialized) {
        return;
    }
    // Permalinks shared to collaborate using Mozilla's TogetherJS should also
    // be left unchanged
    if (window.location.href.indexOf("#&togetherjs") != -1) {
        return;
    }

    url_query = parseUri(window.location.href);
    permalink = url_query.protocol + "://" + url_query.host;
    if (url_query.port){
        permalink += ":" + url_query.port;
    }
    permalink += url_query.path;

    permalink += "?lang=" + encodeURIComponent(RUR.state.human_language) +
                 "&mode=" + encodeURIComponent(RUR.state.input_method) +
                 "&menu=" + encodeURIComponent(RUR.state.current_menu) +                 
                 "&name=" + encodeURIComponent(RUR.state.world_name) +
                 "&url=" + encodeURIComponent(RUR.state.world_url);
    window.history.pushState("dummy", "dummy", permalink);
};

},{"./../rur.js":44}],22:[function(require,module,exports){
require("../rur.js");
require("../ui/stop.js");

RUR.play = function () {
    "use strict";
    if (RUR.state.playback){            // RUR.drawing/visible_world.running
        RUR.state.playback = false;
        return;
    }
    RUR.state.playback = true;
    loop();
};

function loop () {
    "use strict";
    var frame_info;

    if (!RUR.state.playback){
        return;
    }
    frame_info = RUR.rec.display_frame();

    if (frame_info === "pause") {
        return;
    } else if (frame_info === "stopped") {
        RUR.stop();
        return;
    }
    RUR._TIMER = setTimeout(loop, RUR.PLAYBACK_TIME_PER_FRAME);
}

},{"../rur.js":44,"../ui/stop.js":59}],23:[function(require,module,exports){

RUR._play_sound = function (sound_id) {
    "use strict";
    var current_sound;
    current_sound = $(sound_id)[0];
    current_sound.load();
    current_sound.play();
    //TODO see if rewinding to zero instead of load() might not be a better
    //way to do things. In particular, this might enable the removal of
    //the minimum time limit for the sound.
};

},{}],24:[function(require,module,exports){

require("./../drawing/visible_world.js");
/* if the REPL is active, we do not record anything, and show immediately
   the updated world */

RUR._show_immediate = function (name, obj) {
    RUR.vis_world.refresh();
    // TODO: confirm that watching variables work.
    if (name !== undefined && name == "print_html") {
        if (obj.append){
            $(obj.element).append(obj.message);
        } else {
            $(obj.element).html(obj.message);
        }
        $("#Reeborg-proclaims").dialog("open");
    }
};

},{"./../drawing/visible_world.js":10}],25:[function(require,module,exports){
/* jshint -W069 */
require("./../rur.js");
require("./../translator.js");

RUR.blockly = {};
RUR.color_basic = 120;
RUR.color_condition = 240;
RUR.done_colour = "#aa0000";

/****  Begin over-riding Blockly's default */
Blockly.Msg["LOOPS_HUE"] = 230;

Blockly.JavaScript['text_print'] = function(block) {
  var argument0 = Blockly.JavaScript.valueToCode(block, 'TEXT',
      Blockly.JavaScript.ORDER_NONE) || '\'\'';
  return RUR.translate("write")+'(' + argument0 + ');\n';
};

Blockly.makeColour = function(hue) {
  if (hue === RUR.done_colour){
      return hue;
  }
  return goog.color.hsvToHex(hue, Blockly.HSV_SATURATION,
      Blockly.HSV_VALUE * 255);
};

Blockly.Python.INDENT = '    ';
Blockly.JavaScript.INDENT = '    ';

// removing mutator for simple function definitions as per
// https://groups.google.com/d/msg/blockly/_rrwh-Lc-sE/cHAk5yNfhUEJ

(function(){var old = Blockly.Blocks.procedures_defnoreturn.init;
    Blockly.Blocks.procedures_defnoreturn.init =
    function(){old.call(this);
        this.setMutator(undefined);
        // this.setColour(RUR.color_basic);
    };
})();



RUR.blockly.init = function () {

    Blockly.Blocks['_sound_'] = {
      init: function() {
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(RUR.translate("sound"))
            .appendField(new Blockly.FieldCheckbox("TRUE"), "SOUND");
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(20);
        this.setTooltip('');
      }
    };
    Blockly.JavaScript['_sound_'] = function(block) {
      var checkbox_sound = block.getFieldValue('SOUND') == 'TRUE';
      if (checkbox_sound) {
          return RUR.translate("sound") + "(true);\n";
      } else {
          return RUR.translate("sound") + "(false);\n";
      }
    };
    Blockly.Python['_sound_'] = function(block) {
      var checkbox_sound = block.getFieldValue('SOUND') == 'TRUE';
      if (checkbox_sound) {
          return RUR.translate("sound") + "(True)\n";
      } else {
          return RUR.translate("sound") + "(False)\n";
      }
    };

    Blockly.Blocks['_think_'] = {
      init: function() {
        this.appendValueInput("NAME")
            .setCheck("Number")
            .appendField(RUR.translate("think"));
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(20);
        this.setTooltip(RUR.translate("Delay between actions; default is 300 ms."));
      }
    };
    Blockly.Python['_think_'] = function(block) {
      var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
      return RUR.translate("think") + "("+value_name+")\n";
    };
    Blockly.JavaScript['_think_'] = function(block) {
      var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
      return RUR.translate("think") + "("+value_name+");\n";
    };

    Blockly.Blocks['_move_'] = {
      init: function() {
        this.setColour(RUR.color_basic);
        this.appendDummyInput().appendField(RUR.translate("move"));
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(RUR.translate("move forward"));
      }
    };
    Blockly.Python['_move_'] = function(block) {
      return RUR.translate("move")+'()\n';
    };
    Blockly.JavaScript['_move_'] = function(block) {
      return RUR.translate("move")+'();\n';
    };


    Blockly.Blocks['_turn_left_'] = {
      init: function() {
        this.setColour(RUR.color_basic);
        this.appendDummyInput().appendField(RUR.translate("turn_left")+" \u21BA");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(RUR.translate("turn left"));
      }
    };
    Blockly.Python['_turn_left_'] = function(block) {
      return RUR.translate("turn_left")+'()\n';
    };
    Blockly.JavaScript['_turn_left_'] = function(block) {
      return RUR.translate("turn_left")+'();\n';
    };


    Blockly.Blocks['_take_'] = {
      init: function() {
        this.setColour(RUR.color_basic);
        this.appendDummyInput().appendField(RUR.translate("take"));
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(RUR.translate("take object"));
      }
    };
    Blockly.Python['_take_'] = function(block) {
      return RUR.translate("take")+'()\n';
    };
    Blockly.JavaScript['_take_'] = function(block) {
      return RUR.translate("take")+'();\n';
    };


    Blockly.Blocks['_put_'] = {
      init: function() {
        this.setColour(RUR.color_basic);
        this.appendDummyInput().appendField(RUR.translate("put"));
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(RUR.translate("put object"));
      }
    };
    Blockly.Python['_put_'] = function(block) {
      return RUR.translate("put")+'()\n';
    };
    Blockly.JavaScript['_put_'] = function(block) {
      return RUR.translate("put")+'();\n';
    };


    Blockly.Blocks['_pause_'] = {
      init: function() {
        this.setColour(30);
        this.appendDummyInput().appendField(RUR.translate("pause"));
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(RUR.translate("Pause the program's execution."));
      }
    };
    Blockly.Python['_pause_'] = function(block) {
      return RUR.translate("pause")+'()\n';
    };
    Blockly.JavaScript['_pause_'] = function(block) {
      return RUR.translate("pause")+'();\n';
    };


    Blockly.Blocks['_build_wall_'] = {
      init: function() {
        this.setColour(RUR.color_basic);
        this.appendDummyInput().appendField(RUR.translate("build_wall"));
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(RUR.translate("Build a wall in front of the robot."));
      }
    };
    Blockly.Python['_build_wall_'] = function(block) {
      return RUR.translate("build_wall")+'()\n';
    };
    Blockly.JavaScript['_build_wall_'] = function(block) {
      return RUR.translate("build_wall")+'();\n';
    };


    Blockly.Blocks['_done_'] = {
      init: function() {
        this.setColour(RUR.done_colour);
        this.appendDummyInput().appendField(RUR.translate("done"));
        this.setPreviousStatement(true);
        this.setTooltip(RUR.translate("End the program's execution."));
      }
    };
    Blockly.Python['_done_'] = function(block) {
      return RUR.translate("done")+'()\n';
    };
    Blockly.JavaScript['_done_'] = function(block) {
      return RUR.translate("done")+'();\n';
    };


    Blockly.Blocks['_wall_in_front_or_right_'] = {
      init: function() {
        var choices =  [
            [RUR.translate("wall_in_front"), RUR.translate("wall_in_front")],
            [RUR.translate("wall_on_right"), RUR.translate("wall_on_right")]];
        this.setColour(RUR.color_condition);
        this.appendDummyInput().appendField(new Blockly.FieldDropdown(choices), 'choice');
        this.setOutput(true, "Boolean");
        this.setTooltip(RUR.translate("True if a wall is blocking the way."));
      }
    };
    Blockly.Python['_wall_in_front_or_right_'] = function(block) {
      return [block.getFieldValue('choice')+'()'];
    };
    Blockly.JavaScript['_wall_in_front_or_right_'] = function(block) {
      return [block.getFieldValue('choice')+'()'];
    };


    Blockly.Blocks['_front_or_right_is_clear_'] = {
      init: function() {
        var choices =  [
            [RUR.translate("front_is_clear"), RUR.translate("front_is_clear")],
            [RUR.translate("right_is_clear"), RUR.translate("right_is_clear")]];
        this.setColour(RUR.color_condition);
        this.appendDummyInput().appendField(new Blockly.FieldDropdown(choices), 'choice');
        this.setOutput(true, "Boolean");
        this.setTooltip(RUR.translate("True if nothing is blocking the way."));
      }
    };
    Blockly.Python['_front_or_right_is_clear_'] = function(block) {
      return [block.getFieldValue('choice')+'()'];
    };
    Blockly.JavaScript['_front_or_right_is_clear_'] = function(block) {
      return [block.getFieldValue('choice')+'()'];
    };


    Blockly.Blocks['_at_goal_'] = {
      init: function() {
        this.setColour(RUR.color_condition);
        this.appendDummyInput().appendField(RUR.translate("at_goal"));
        this.setOutput(true, "Boolean");
        this.setTooltip(RUR.translate("True if desired destination."));
      }
    };
    Blockly.Python['_at_goal_'] = function(block) {
      return [RUR.translate("at_goal")+'()'];
    };
    Blockly.JavaScript['_at_goal_'] = function(block) {
      return [RUR.translate("at_goal")+'()'];
    };


    Blockly.Blocks['_carries_object_'] = {
      init: function() {
        this.setColour(RUR.color_condition);
        this.appendDummyInput().appendField(RUR.translate("carries_object"));
        this.setOutput(true, "Boolean");
        this.setTooltip(RUR.translate("True if robot carries at least one object."));
      }
    };
    Blockly.Python['_carries_object_'] = function(block) {
      return [RUR.translate("carries_object")+'()'];
    };
    Blockly.JavaScript['_carries_object_'] = function(block) {
      return [RUR.translate("carries_object")+'()'];
    };


    Blockly.Blocks['_object_here_'] = {
      init: function() {
        this.setColour(RUR.color_condition);
        this.appendDummyInput().appendField(RUR.translate("object_here"));
        this.setOutput(true, "Boolean");
        this.setTooltip(RUR.translate("True if there is at least one object here."));
      }
    };
    Blockly.Python['_object_here_'] = function(block) {
      return [RUR.translate("object_here")+'()'];
    };
    Blockly.JavaScript['_object_here_'] = function(block) {
      return [RUR.translate("object_here")+'()'];
    };


    Blockly.Blocks['_is_facing_north_'] = {
      init: function() {
        this.setColour(RUR.color_condition);
        this.appendDummyInput().appendField(RUR.translate("is_facing_north"));
        this.setOutput(true, "Boolean");
        this.setTooltip(RUR.translate("True if robot is facing North."));
      }
    };
    Blockly.Python['_is_facing_north_'] = function(block) {
      return [RUR.translate("is_facing_north")+'()'];
    };
    Blockly.JavaScript['_is_facing_north_'] = function(block) {
      return [RUR.translate("is_facing_north")+'()'];
    };


    Blockly.Blocks['_star_'] = {
      init: function() {
        this.appendDummyInput()
            .appendField(RUR.translate("star"))
            .appendField(new Blockly.FieldImage("src/images/star.png", 15, 15, RUR.translate("star")));
        this.setOutput(true, "String");
        this.setColour(0);
      }
    };
    Blockly.Python['_star_'] = function(block) {
      return [RUR.translate("star")];
    };
    Blockly.JavaScript['_star_'] = function(block) {
      return [RUR.translate("star")];
    };

    Blockly.Blocks['_token_'] = {
      init: function() {
        this.appendDummyInput()
            .appendField(RUR.translate("token"))
            .appendField(new Blockly.FieldImage("src/images/token.png", 15, 15, RUR.translate("token")));
        this.setOutput(true, "String");
        this.setColour(0);
      }
    };
    Blockly.Python['_token_'] = function(block) {
      return [RUR.translate("token")];
    };
    Blockly.JavaScript['_token_'] = function(block) {
      return [RUR.translate("token")];
    };

    Blockly.Blocks['_apple_'] = {
      init: function() {
        this.appendDummyInput()
            .appendField(RUR.translate("apple"))
            .appendField(new Blockly.FieldImage("src/images/apple.png", 15, 15, RUR.translate("apple")));
        this.setOutput(true, "String");
        this.setColour(0);
      }
    };
    Blockly.Python['_apple_'] = function(block) {
      return [RUR.translate("apple")];
    };
    Blockly.JavaScript['_apple_'] = function(block) {
      return [RUR.translate("apple")];
    };

    Blockly.Blocks['_carrot_'] = {
      init: function() {
        this.appendDummyInput()
            .appendField(RUR.translate("carrot"))
            .appendField(new Blockly.FieldImage("src/images/carrot.png", 15, 15, RUR.translate("carrot")));
        this.setOutput(true, "String");
        this.setColour(0);
      }
    };
    Blockly.Python['_carrot_'] = function(block) {
      return [RUR.translate("carrot")];
    };
    Blockly.JavaScript['_carrot_'] = function(block) {
      return [RUR.translate("carrot")];
    };

    Blockly.Blocks['_dandelion_'] = {
      init: function() {
        this.appendDummyInput()
            .appendField(RUR.translate("dandelion"))
            .appendField(new Blockly.FieldImage("src/images/dandelion.png", 15, 15, RUR.translate("dandelion")));
        this.setOutput(true, "String");
        this.setColour(0);
      }
    };
    Blockly.Python['_dandelion_'] = function(block) {
      return [RUR.translate("dandelion")];
    };
    Blockly.JavaScript['_dandelion_'] = function(block) {
      return [RUR.translate("dandelion")];
    };

    Blockly.Blocks['_daisy_'] = {
      init: function() {
        this.appendDummyInput()
            .appendField(RUR.translate("daisy"))
            .appendField(new Blockly.FieldImage("src/images/daisy.png", 15, 15, RUR.translate("daisy")));
        this.setOutput(true, "String");
        this.setColour(0);
      }
    };
    Blockly.Python['_daisy_'] = function(block) {
      return [RUR.translate("daisy")];
    };
    Blockly.JavaScript['_daisy_'] = function(block) {
      return [RUR.translate("daisy")];
    };

    Blockly.Blocks['_triangle_'] = {
      init: function() {
        this.appendDummyInput()
            .appendField(RUR.translate("triangle"))
            .appendField(new Blockly.FieldImage("src/images/triangle.png", 15, 15, RUR.translate("triangle")));
        this.setOutput(true, "String");
        this.setColour(0);
      }
    };
    Blockly.Python['_triangle_'] = function(block) {
      return [RUR.translate("triangle")];
    };
    Blockly.JavaScript['_triangle_'] = function(block) {
      return [RUR.translate("triangle")];
    };

    Blockly.Blocks['_square_'] = {
      init: function() {
        this.appendDummyInput()
            .appendField(RUR.translate("square"))
            .appendField(new Blockly.FieldImage("src/images/square.png", 15, 15, RUR.translate("square")));
        this.setOutput(true, "String");
        this.setColour(0);
      }
    };
    Blockly.Python['_square_'] = function(block) {
      return [RUR.translate("square")];
    };
    Blockly.JavaScript['_square_'] = function(block) {
      return [RUR.translate("square")];
    };

    Blockly.Blocks['_strawberry_'] = {
      init: function() {
        this.appendDummyInput()
            .appendField(RUR.translate("strawberry"))
            .appendField(new Blockly.FieldImage("src/images/strawberry.png", 15, 15, RUR.translate("strawberry")));
        this.setOutput(true, "String");
        this.setColour(0);
      }
    };
    Blockly.Python['_strawberry_'] = function(block) {
      return [RUR.translate("strawberry")];
    };
    Blockly.JavaScript['_strawberry_'] = function(block) {
      return [RUR.translate("strawberry")];
    };

    Blockly.Blocks['_leaf_'] = {
      init: function() {
        this.appendDummyInput()
            .appendField(RUR.translate("leaf"))
            .appendField(new Blockly.FieldImage("src/images/leaf.png", 15, 15, RUR.translate("leaf")));
        this.setOutput(true, "String");
        this.setColour(0);
      }
    };
    Blockly.Python['_leaf_'] = function(block) {
      return [RUR.translate("leaf")];
    };
    Blockly.JavaScript['_leaf_'] = function(block) {
      return [RUR.translate("leaf")];
    };

    Blockly.Blocks['_banana_'] = {
      init: function() {
        this.appendDummyInput()
            .appendField(RUR.translate("banana"))
            .appendField(new Blockly.FieldImage("src/images/banana.png", 15, 15, RUR.translate("banana")));
        this.setOutput(true, "String");
        this.setColour(0);
      }
    };
    Blockly.Python['_banana_'] = function(block) {
      return [RUR.translate("banana")];
    };
    Blockly.JavaScript['_banana_'] = function(block) {
      return [RUR.translate("banana")];
    };

    Blockly.Blocks['_tulip_'] = {
      init: function() {
        this.appendDummyInput()
            .appendField(RUR.translate("tulip"))
            .appendField(new Blockly.FieldImage("src/images/tulip.png", 15, 15, RUR.translate("tulip")));
        this.setOutput(true, "String");
        this.setColour(0);
      }
    };
    Blockly.Python['_tulip_'] = function(block) {
      return [RUR.translate("tulip")];
    };
    Blockly.JavaScript['_tulip_'] = function(block) {
      return [RUR.translate("tulip")];
    };

    Blockly.Blocks['_beeper_'] = {
      init: function() {
        this.appendDummyInput()
            .appendField(RUR.translate("beeper"))
            .appendField(new Blockly.FieldImage("src/images/beeper0.png", 15, 15, RUR.translate("beeper")));
        this.setOutput(true, "String");
        this.setColour(0);
      }
    };
    Blockly.Python['_beeper_'] = function(block) {
      return [RUR.translate("beeper")];
    };
    Blockly.JavaScript['_beeper_'] = function(block) {
      return [RUR.translate("beeper")];
    };

    Blockly.Blocks['_carries_object_or_here_'] = {
      init: function() {
        this.appendValueInput("action")
            .setCheck("String")
            .appendField(new Blockly.FieldDropdown([
                [RUR.translate("carries_object"), RUR.translate("carries_object")],
                [RUR.translate("object_here"), RUR.translate("object_here")]]), "condition");
        this.setOutput(true, "Boolean");
        this.setColour(RUR.color_condition);
      }
    };
    Blockly.Python['_carries_object_or_here_'] = function(block) {
      var dropdown_condition = block.getFieldValue('condition');
      var value_action = Blockly.Python.valueToCode(block, 'action', Blockly.Python.ORDER_ATOMIC);
      return [RUR.translate(dropdown_condition)+'("'+ value_action +'")'];
    };
    Blockly.JavaScript['_carries_object_or_here_'] = function(block) {
      var dropdown_condition = block.getFieldValue('condition');
      var value_action = Blockly.JavaScript.valueToCode(block, 'action', Blockly.JavaScript.ORDER_ATOMIC);
      return [RUR.translate(dropdown_condition)+'("'+ value_action +'")'];
    };


    Blockly.Blocks['_take_or_put_'] = {
      init: function() {
        this.appendValueInput("obj")
            .setCheck("String")
            .appendField(new Blockly.FieldDropdown([
                [RUR.translate("take"), RUR.translate("take")],
                [RUR.translate("put"), RUR.translate("put")]]), "action");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(RUR.color_basic);
      }
    };
    Blockly.Python['_take_or_put_'] = function(block) {
      var dropdown_action = block.getFieldValue('action');
      var value_obj = Blockly.Python.valueToCode(block, 'obj', Blockly.Python.ORDER_ATOMIC);
      return dropdown_action + '("' + value_obj + '")\n';
    };
    Blockly.JavaScript['_take_or_put_'] = function(block) {
      var dropdown_action = block.getFieldValue('action');
      var value_obj = Blockly.JavaScript.valueToCode(block, 'obj', Blockly.JavaScript.ORDER_ATOMIC);
      return dropdown_action + '("' + value_obj + '");\n';
    };



    /** Simple if skeletton from
    https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#k8aine
    ****/

    Blockly.Blocks['_if_'] = {
      init: function() {
        this.appendValueInput("condition")
            .setCheck("Boolean")
            .appendField(Blockly.Msg.CONTROLS_IF_MSG_IF);
        this.appendStatementInput("then")
            .setCheck(null)
            .appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(210);
        // this.setTooltip('');
      }
    };
    Blockly.JavaScript['_if_'] = function(block) {
      var value_condition = Blockly.JavaScript.valueToCode(block, 'condition', Blockly.JavaScript.ORDER_ATOMIC);
      var statements_then = Blockly.JavaScript.statementToCode(block, 'then');
      return "if (" + value_condition + ") {\n" + statements_then + "}\n";

    };
    Blockly.Python['_if_'] = function(block) {
      var value_condition = Blockly.Python.valueToCode(block, 'condition', Blockly.Python.ORDER_ATOMIC);
      var statements_then = Blockly.Python.statementToCode(block, 'then');
      return "if " + value_condition + ":\n" + statements_then;
    };


    Blockly.Blocks['_if_else_'] = {
      init: function() {
        this.appendValueInput("condition")
            .setCheck("Boolean")
            .appendField(Blockly.Msg.CONTROLS_IF_MSG_IF);
        this.appendStatementInput("then")
            .setCheck(null)
            .appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN);
        this.appendDummyInput()
            .appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSE);
        this.appendStatementInput("else")
            .appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(210);
        this.setTooltip('');
      }
    };
    Blockly.JavaScript['_if_else_'] = function(block) {
      var value_condition = Blockly.JavaScript.valueToCode(block, 'condition', Blockly.JavaScript.ORDER_ATOMIC);
      var statements_then = Blockly.JavaScript.statementToCode(block, 'then');
      var statements_else = Blockly.JavaScript.statementToCode(block, 'else');
      return "if (" + value_condition + ") {\n" + statements_then + "} else {\n" + statements_else+"}\n";
    };
    Blockly.Python['_if_else_'] = function(block) {
      var value_condition = Blockly.Python.valueToCode(block, 'condition', Blockly.Python.ORDER_ATOMIC);
      var statements_then = Blockly.Python.statementToCode(block, 'then');
      var statements_else = Blockly.Python.statementToCode(block, 'else');
      return "if " + value_condition + ":\n" + statements_then + "else:\n" + statements_else;
    };


    Blockly.Blocks['_if_else_if_else_'] = {
      init: function() {
        this.appendValueInput("condition")
            .setCheck("Boolean")
            .appendField(Blockly.Msg.CONTROLS_IF_MSG_IF);
        this.appendStatementInput("do")
            .setCheck(null)
            .appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN);
        this.appendValueInput("condition2")
            .setCheck("Boolean")
            .appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSEIF);
        this.appendStatementInput("do2")
            .setCheck(null)
            .appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN);
        this.appendDummyInput()
            .appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSE);
        this.appendStatementInput("else")
            .setCheck(null)
            .appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(210);
        this.setTooltip('');
      }
    };
    Blockly.JavaScript['_if_else_if_else_'] = function(block) {
      var value_condition = Blockly.JavaScript.valueToCode(block, 'condition', Blockly.JavaScript.ORDER_ATOMIC);
      var statements_do = Blockly.JavaScript.statementToCode(block, 'do');
      var value_condition2 = Blockly.JavaScript.valueToCode(block, 'condition2', Blockly.JavaScript.ORDER_ATOMIC);
      var statements_do2 = Blockly.JavaScript.statementToCode(block, 'do2');
      var statements_else = Blockly.JavaScript.statementToCode(block, 'else');
      return "if (" + value_condition + ") {\n" + statements_do +
             "} else if (" + value_condition2 + ") {\n" + statements_do2 +
             "} else {\n" + statements_else+"}\n";
    };
    Blockly.Python['_if_else_if_else_'] = function(block) {
      var value_condition = Blockly.Python.valueToCode(block, 'condition', Blockly.Python.ORDER_ATOMIC);
      var statements_do = Blockly.Python.statementToCode(block, 'do');
      var value_condition2 = Blockly.Python.valueToCode(block, 'condition2', Blockly.Python.ORDER_ATOMIC);
      var statements_do2 = Blockly.Python.statementToCode(block, 'do2');
      var statements_else = Blockly.Python.statementToCode(block, 'else');
      return "if " + value_condition + ":\n" + statements_do +
             "elif " + value_condition2 + ":\n" + statements_do2 +
             "else:\n" + statements_else;
    };

    $("#blocklyDiv").remove();
    $("#blockly-wrapper").append('<div id="blocklyDiv"></div>');
    $(".blocklyToolboxDiv").remove();


    RUR.blockly.workspace = Blockly.inject('blocklyDiv', {
        toolbox: document.getElementById('toolbox'),
        zoom:{
            controls: true,
            wheel: true,
            startScale: 1.0,
            maxScale: 3,
            minScale: 0.3,
            scaleSpeed: 1.2},
        trashcan: true});

    $("#blocklyDiv").resizable({
        resize: function() {
            $("#blocklyDiv:first-child").height($(this).height()-1).width($(this).width()-1);
            window.dispatchEvent(new Event('resize'));
        }
    });

    if (RUR.state.input_method == "python" ||
        RUR.state.input_method == "javascript" ||
        RUR.state.input_method == "py-repl") {
            $(".blocklyToolboxDiv").css({"pointer-events": "none", "opacity": 0.01});
        }

};

$("#blockly-wrapper").draggable({
    cursor: "move",
    handle: "p",
    drag: function( event, ui ) {
        window.dispatchEvent(new Event('resize'));
    },
    stop: function( event, ui ) {
        window.dispatchEvent(new Event('resize'));
    }
});



RUR.blockly.getValue = function () {
    var xml = Blockly.Xml.workspaceToDom(RUR.blockly.workspace);
    return Blockly.Xml.domToText(xml);
};
RUR.blockly.setValue = function (xml_text) {
    var xml = Blockly.Xml.textToDom(xml_text);
    RUR.blockly.workspace.clear();
    Blockly.Xml.domToWorkspace(xml, RUR.blockly.workspace);
};

},{"./../rur.js":44,"./../translator.js":46}],26:[function(require,module,exports){
/*  The purpose of this module is to act as an intermediary between end user
modules in various languages (e.g. reeborg_en.py or reeborg_fr.js) and
the other modules.  This way, in theory, (most) refactoring can take place in the
basic javascript code without affecting the end user code.

Convention: all "public" function names follow the pattern RUR._xyz_
            Use four spaces for indentation
            Order function names alphabetically (in English)
 */

//TODO: review the dependencies

require("./../rur.js");
require("./../translator.js");
require("./control.js");
require("./../ui/custom_world_select.js");
require("./../file_io/file_io.js");
require("./output.js");
require("./../drawing/visible_robot.js");
require("./../editors/update.js");
require("./../world_api/background_tile.js");

RUR._inspect_ = function (obj){
    var props, result, head = "<table border='1'><tr><th>name</th><th>type</th></tr>";
    result = head;
    for (props in obj) {
        result += "<tr><td>" + props + "</td><td>";
        if (Object.prototype.toString.call(obj[props]) == "[object Array]") {
            result += "Array</td></tr>";
        } else {
            result += typeof(obj[props]) + "</td></tr>";
        }
    }
    result += "</table>";
    RUR._print_html_(result, true); // true will replace existing content
};

function user_no_highlight () {
    if (RUR.state.highlight) {
        RUR.state.highlight = false;
        $("#highlight").addClass("blue-gradient");
        $("#highlight").removeClass("active-element");
        throw new RUR.ReeborgOK(RUR.translate("Turning highlighting off!"));
    }
}


RUR._at_goal_ = function () {
    return RUR.control.at_goal(RUR.get_current_world().robots[0]);
};

RUR._build_wall_ = function() {
    RUR.control.build_wall(RUR.get_current_world().robots[0]);
};

RUR._carries_object_ = function (arg) {
    return RUR.control.carries_object(RUR.get_current_world().robots[0], arg);
};

RUR._clear_print_ = RUR.output.clear_print;

RUR._color_here_ = function () {
    var robot = RUR.get_current_world().robots[0];
    return RUR.get_background_tile(robot.x, robot.y);
};

RUR._default_robot_body_ = function () { // simply returns body
    var body;
    try {
        body = RUR.get_current_world().robots[0];
    } catch (e) {
        body = {};
    }
    return body;
};

RUR._done_ = RUR.control.done;

RUR._front_is_clear_ = function() {
    return RUR.control.front_is_clear(RUR.get_current_world().robots[0]);
};


RUR._is_facing_north_ = function () {
    return RUR.control.is_facing_north(RUR.get_current_world().robots[0]);
};

RUR._move_ = function () {
    RUR.control.move(RUR.get_current_world().robots[0]);
};

RUR._new_robot_images_ = RUR.new_robot_images; // defined in visible_robot.js

RUR._no_highlight_ = user_no_highlight; // defined above

RUR._object_here_ = function (arg) {
    obj = RUR.world_get.object_at_robot_position(RUR.get_current_world().robots[0], arg);
    if (obj.length === 0) {
        return false;
    } 
    return obj;
};

RUR._paint_square_ = function (color) {
    // note that this can do more than simply setting the color: it can also
    // set the tile type.
    var robot = RUR.get_current_world().robots[0];
    RUR.add_colored_tile(color, robot.x, robot.y);
};

RUR._pause_ = RUR.control.pause;

RUR._print_html_ = function (html, replace) {
    RUR.output.print_html(html, replace);
};

RUR._put_ = function(arg) {
    RUR.control.put(RUR.get_current_world().robots[0], arg);
};

RUR._toss_ = function(arg) {
    RUR.control.toss(RUR.get_current_world().robots[0], arg);
};

RUR._recording_ = function(bool) {
    var current = !RUR.state.do_not_record;
    RUR.state.do_not_record = !bool;
    return current;
};

RUR._remove_robots_ = function () {
    RUR.get_current_world().robots = [];
};

RUR._right_is_clear_ = function() {
    return RUR.control.right_is_clear(RUR.get_current_world().robots[0]);
};

RUR._set_max_nb_steps_ = function(n){
    RUR.MAX_STEPS = n;
};

RUR._set_trace_color_ = function(color){
    RUR.control.set_trace_color(RUR.get_current_world().robots[0], color);
};

RUR._set_trace_style_ = function(style){
    RUR.control.set_trace_style(RUR.get_current_world().robots[0], style);
};

RUR._sound_ = RUR.control.sound;

RUR._take_ = function(arg) {
    RUR.control.take(RUR.get_current_world().robots[0], arg);
};

RUR._think_ = RUR.control.think;

RUR._turn_left_ = function () {
    RUR.control.turn_left(RUR.get_current_world().robots[0]);
};

RUR._wall_in_front_ = function() {
    return RUR.control.wall_in_front(RUR.get_current_world().robots[0]);
};

RUR._write_ = RUR.output.write;

RUR._write_ln = RUR.output.write_ln;

RUR._wall_on_right_ = function() {
    return RUR.control.wall_on_right(RUR.get_current_world().robots[0]);
};

RUR._MakeCustomMenu_ = RUR.custom_world_select.make;

RUR._World_ = RUR._load_world_from_program;

/*  methods below */

RUR._UR = {};

RUR._UR.at_goal_ = function (robot) {
    return RUR.control.at_goal(robot);
};

RUR._UR.build_wall_ = function (robot) {
    return RUR.control.build_wall(robot);
};

RUR._UR.carries_object_ = function (robot, obj) {
    return RUR.control.carries_object(robot, obj);
};

RUR._UR.color_here_ = function (robot_body) {
    return RUR.get_background_tile(robot_body.x, robot_body.y);
};

RUR._UR.front_is_clear_ = function (robot) {
    return RUR.control.front_is_clear(robot);
};

RUR._UR.is_facing_north_ = function (robot) {
    return RUR.control.is_facing_north(robot);
};

RUR._UR.move_ = function (robot) {
    RUR.control.move(robot);
};

RUR._UR.object_here_ = function (robot, obj) {
    return RUR.world_get.object_at_robot_position(robot, obj);
};

RUR._UR.paint_square_ = function (color, robot_body) {
    RUR.add_colored_tile(color, robot_body.x, robot_body.y);
};

RUR._UR.put_ = function (robot, obj) {
    RUR.control.put(robot, obj);
};

RUR._UR.toss_ = function (robot, obj) {
    RUR.control.toss(robot, obj);
};

RUR._UR.right_is_clear_ = function (robot) {
    return RUR.control.right_is_clear(robot);
};

RUR._UR.set_model_ = function (robot, model) {
    RUR.control.set_model(robot, model);
};

RUR._UR.set_trace_color_ = function (robot, color) {
    RUR.control.set_trace_color(robot, color);
};

RUR._UR.set_trace_style_ = function (robot, style) {
    RUR.control.set_trace_style(robot, style);
};

RUR._UR.take_ = function (robot, obj) {
    RUR.control.take(robot, obj);
};

RUR._UR.turn_left_ = function (robot) {
    RUR.control.turn_left(robot);
};

RUR._UR.wall_in_front_ = function (robot) {
    return RUR.control.wall_in_front(robot);
};

RUR._UR.wall_on_right_ = function (robot) {
    return RUR.control.wall_on_right(robot);
};

},{"./../drawing/visible_robot.js":9,"./../editors/update.js":12,"./../file_io/file_io.js":13,"./../rur.js":44,"./../translator.js":46,"./../ui/custom_world_select.js":48,"./../world_api/background_tile.js":75,"./control.js":27,"./output.js":29}],27:[function(require,module,exports){

require("./../rur.js");
require("./../translator.js");
require("./../default_tiles/tiles.js");
require("./output.js");
require("./../recorder/record_frame.js");
require("./exceptions.js");
require("./../world_get/world_get.js");
require("./../utils/supplant.js");
require("./../utils/key_exist.js");

require("./../world_api/walls.js");
require("./../world_api/obstacles.js");
require("./../world_api/background_tile.js");
require("./../world_api/pushables.js");
require("./../world_api/robot.js");
require("./../world_api/composition.js");
require("./../world_api/is_fatal.js");

RUR.control = {};

RUR.control.move = function (robot) {
    "use strict";
    var position, next_x, next_y, pushable_in_the_way,
        x_beyond, y_beyond, next_position, current_x, current_y,
        message;

    if (RUR.control.wall_in_front(robot)) {
        throw new RUR.WallCollisionError(RUR.translate("Ouch! I hit a wall!"));
    }

    position = RUR.get_position_in_front(robot);
    next_x = position.x;
    next_y = position.y;

    // attempt a move, by first saving the current position
    current_x = robot.x;
    current_y = robot.y;
    robot.x = next_x;
    robot.y = next_y;

    // If we move, are we going to push something else in front of us?
    pushable_in_the_way = RUR.get_pushable(next_x, next_y);
    if (pushable_in_the_way !== null) {
        next_position = RUR.get_position_in_front(robot);
        x_beyond = next_position.x;
        y_beyond = next_position.y;

        if (RUR.control.wall_in_front(robot) ||
            RUR.get_pushable(x_beyond, y_beyond) ||
            RUR.is_solid_obstacle(x_beyond, y_beyond) ||
            RUR.is_robot(x_beyond, y_beyond)) {
            // reverse the move
            robot.x = current_x;
            robot.y = current_y;
            throw new RUR.ReeborgError(RUR.translate("Something is blocking the way!"));
        } else {
            RUR._push_pushable(pushable_in_the_way, next_x, next_y, x_beyond, y_beyond);
            RUR.transform_tile(pushable_in_the_way, x_beyond, y_beyond);
        }
    }

    // We can now complete the move
    if (robot._is_leaky !== undefined && !robot._is_leaky) {
        // avoid messing the trace if and when we resume having a leaky robot
        robot._prev_x = robot.x;
        robot._prev_y = robot.y;
    } else {
        robot._prev_x = current_x;
        robot._prev_y = current_y;
    }
    RUR.state.sound_id = "#move-sound";


    // A move has been performed ... but it may have been a fatal decision
    message = RUR.is_fatal_position(robot.x, robot.y, robot);
    if (message) {
        throw new RUR.ReeborgError(message);
    }

    RUR.record_frame("move", robot.__id);
};


// leave end of line comments below such as using += 1
// as I (indirectly) refer to these comments in the programming tutorial

RUR.control.turn_left = function(robot){
    "use strict";
    var random;
    if (robot._orientation == RUR.RANDOM_ORIENTATION) {
        random = Math.floor(Math.random() * 4);
        robot._orientation = random;
        robot._prev_orientation = random;
    } else {
        robot._prev_orientation = robot._orientation;
        robot._orientation ++;
        robot._orientation %= 4;
    }
    robot._prev_x = robot.x;
    robot._prev_y = robot.y;

    RUR.state.sound_id = "#turn-sound";
    if (robot._is_leaky !== undefined && !robot._is_leaky) {  // update to avoid drawing from previous point.
        robot._prev_orientation = robot._orientation;
    }
    RUR.record_frame("turn_left", robot.__id);
};

RUR.control.__turn_right = function(robot){
    "use strict";
    robot._prev_orientation = (robot._orientation+2)%4; // fix so that oil trace looks right
    robot._prev_x = robot.x;
    robot._prev_y = robot.y;
    robot._orientation += 3;
    robot._orientation %= 4;
    if (robot._is_leaky !== undefined && !robot._is_leaky) {  // update to avoid drawing from previous point.
        robot._prev_orientation = robot._orientation;
    }
    RUR.record_frame("__turn_right", robot.__id);
};

RUR.control.pause = function (ms) {
    RUR.record_frame("pause", {pause_time:ms});
};

RUR.control.done = function () {
    RUR.state.done_executed = true;
    throw new RUR.ReeborgError(RUR.translate("Done!"));
};

RUR.control.put = function(robot, arg){
    "use strict";
    var arg_in_english, all_objects;
    RUR.state.sound_id = "#put-sound";
    arg_in_english = confirm_object_is_known(arg);
    all_objects = get_names_of_objects_carried(robot.objects);
    put_check_for_error (arg, arg_in_english, all_objects, robot.objects);
    // no error, we can proceed
    robot_put_or_toss_object(robot, arg_in_english, "put");
};

RUR.control.toss = function(robot, arg){
    "use strict";
    var arg_in_english, all_objects;
    arg_in_english = confirm_object_is_known(arg);
    all_objects = get_names_of_objects_carried(robot.objects);
    put_check_for_error (arg, arg_in_english, all_objects, robot.objects);
    // no error, we can proceed
    robot_put_or_toss_object(robot, arg_in_english, "throw");
};

function confirm_object_is_known(arg) {
    var arg_in_english;
    if (arg !== undefined) {
        arg_in_english = RUR.translate_to_english(arg);
        if (RUR.KNOWN_THINGS.indexOf(arg_in_english) == -1){
            throw new RUR.ReeborgError(RUR.translate("Unknown object").supplant({obj: arg}));
        }
    }
    return arg_in_english;
}

function get_names_of_objects_carried(objects_carried) {
    var obj_type, all_objects = [];
    for (obj_type in objects_carried) {
        if (objects_carried.hasOwnProperty(obj_type)) {
            all_objects.push(obj_type);
        }
    }
    return all_objects;
}

function put_check_for_error (arg, arg_in_english, all_objects, carried) {
    "use strict";
    if (arg !== undefined) {
        if (all_objects.length === 0){
            throw new RUR.MissingObjectError(RUR.translate("I don't have any object to put down!").supplant({obj:arg}));
        }
        if (carried[arg_in_english] === undefined) {
            throw new RUR.MissingObjectError(RUR.translate("I don't have any object to put down!").supplant({obj:arg}));
        }
    } else {
        if (all_objects.length === 0){
            throw new RUR.MissingObjectError(RUR.translate("I don't have any object to put down!").supplant({obj: RUR.translate("object")}));
        } else if (all_objects.length > 1){
             throw new RUR.MissingObjectError(RUR.translate("I carry too many different objects. I don't know which one to put down!"));
        }
    }
}

robot_put_or_toss_object = function (robot, obj, action) {
    "use strict";
    var objects_carried, coords, obj_type, position, x, y;

    RUR.utils.ensure_key_for_obj_exists(RUR.get_current_world(), "objects");
    if (action == "put") {
        x = robot.x;
        y = robot.y;
    } else if (action == "throw") {
        position = RUR.get_position_in_front(robot);
        x = position.x;
        y = position.y;
    } else {
        throw new RUR.ReeborgError("Fatal error, unknown action in put/throw :", action);
    }
    coords = x + "," + y;

    if (obj === undefined){
        //obj = Object.keys(robot.objects)[0]; // we have already ensured that there is only one
        objects_carried = robot.objects;
        for (obj_type in objects_carried) {
            if (objects_carried.hasOwnProperty(obj_type)) {
                obj = obj_type;
            }
        }
    }
    if (robot.objects[obj] != "infinite") {
        robot.objects[obj] -= 1;
    }
    if (robot.objects[obj] === 0) {
        delete robot.objects[obj];
    }

    RUR.utils.ensure_key_for_obj_exists(RUR.get_current_world().objects, coords);
    if (RUR.get_current_world().objects[coords][obj] === undefined) {
        RUR.get_current_world().objects[coords][obj] = 1;
    } else {
        RUR.get_current_world().objects[coords][obj] += 1;
    }

    RUR.transform_tile(obj, x, y);
    RUR.record_frame(action, [robot.__id, obj]);
};

function is_fatal_thing(thing, robot) {
    var protections;

    protections = RUR.get_protections(robot);

    if (RUR.get_property(thing, "fatal")) {
        if (protections.indexOf(RUR.get_property(thing, "fatal")) === -1) {
            return true;
        }
    }
    return false;
}

RUR.control.take = function(robot, arg){
    var translated_arg, objects_here, message;
    RUR.state.sound_id = "#take-sound";
    if (arg !== undefined) {
        translated_arg = RUR.translate_to_english(arg);
        if (RUR.KNOWN_THINGS.indexOf(translated_arg) == -1){
            throw new RUR.ReeborgError(RUR.translate("Unknown object").supplant({obj: arg}));
        }
    }

    objects_here = RUR.world_get.object_at_robot_position(robot, arg);
    if (arg !== undefined) {
        if (Array.isArray(objects_here) && objects_here.length === 0) {
            throw new RUR.MissingObjectError(RUR.translate("No object found here").supplant({obj: arg}));
        }  else if(is_fatal_thing(arg, robot)) {
            message = RUR.get_property(arg, 'message');
            if (!message) {
                message = "I picked up a fatal object.";
            }
            throw new RUR.ReeborgError(RUR.translate(message));
        } else {
            take_object_and_give_to_robot(robot, arg);
        }
    }  else if (Array.isArray(objects_here) && objects_here.length === 0){
        throw new RUR.MissingObjectError(RUR.translate("No object found here").supplant({obj: RUR.translate("object")}));
    }  else if (objects_here.length > 1){
        throw new RUR.MissingObjectError(RUR.translate("Many objects are here; I do not know which one to take!"));
    }  else if(is_fatal_thing(objects_here[0], robot)) {
        message = RUR.get_property(objects_here[0], 'message');
        if (!message) {
            message = "I picked up a fatal object.";
        }
        throw new RUR.ReeborgError(RUR.translate(message));
    } else {
        take_object_and_give_to_robot(robot, objects_here[0]);
    }
};

take_object_and_give_to_robot = function (robot, obj) {
    var objects_here, coords;
    obj = RUR.translate_to_english(obj);
    coords = robot.x + "," + robot.y;
    RUR.get_current_world().objects[coords][obj] -= 1;

    if (RUR.get_current_world().objects[coords][obj] === 0){
        delete RUR.get_current_world().objects[coords][obj];
        // Testing for empty array.
        // In Javascript []==[] is false and ![] is false ...
        // Python is so much nicer than Javascript.
        objects_here = RUR.world_get.object_at_robot_position(robot);
        if (Array.isArray(objects_here) && objects_here.length === 0){
            delete RUR.get_current_world().objects[coords];
        }
    }
    RUR.utils.ensure_key_for_obj_exists(robot, "objects");
    if (robot.objects[obj] === undefined){
        robot.objects[obj] = 1;
    } else {
        if (robot.objects[obj] != "infinite") {
            robot.objects[obj]++;
        }
    }
    RUR.record_frame("take", [robot.__id, obj]);
};


RUR.control.build_wall = function (robot){
    RUR.state.sound_id = "#build-sound";
    switch (robot._orientation){
    case RUR.EAST:
        RUR.add_wall("east", robot.x, robot.y); // records automatically
        break;
    case RUR.NORTH:
        RUR.add_wall("north", robot.x, robot.y);
        break;
    case RUR.WEST:
        RUR.add_wall("west", robot.x, robot.y);
        break;
    case RUR.SOUTH:
        RUR.add_wall("south", robot.x, robot.y);
        break;
    default:
        throw new RUR.ReeborgError("Should not happen: unhandled case in RUR.control.build_wall().");
    }
};


RUR.control.wall_in_front = function (robot) {
    switch (robot._orientation){
    case RUR.EAST:
        return RUR._is_wall("east", robot.x, robot.y);
    case RUR.NORTH:
        return RUR._is_wall("north", robot.x, robot.y);
    case RUR.WEST:
        return RUR._is_wall("west", robot.x, robot.y);
    case RUR.SOUTH:
        return RUR._is_wall("south", robot.x, robot.y);
    case RUR.RANDOM_ORIENTATION:
        throw new RUR.ReeborgError(RUR.translate("I am too dizzy!"));
    default:
        throw new RUR.ReeborgError("Should not happen: unhandled case in RUR.control.wall_in_front().");
    }
};

RUR.control.wall_on_right = function (robot) {
    var result, saved_recording_state;
    saved_recording_state = RUR._recording_(false);
    RUR.control.__turn_right(robot);
    result = RUR.control.wall_in_front(robot);
    RUR.control.turn_left(robot);
    RUR._recording_(saved_recording_state);
    return result;
};


RUR.control.front_is_clear = function(robot){
    var position, next_x, next_y;
    if( RUR.control.wall_in_front(robot)) {
        return false;
    }
    position = RUR.get_position_in_front(robot);
    next_x = position.x;
    next_y = position.y;

    if (RUR.is_fatal_position(next_x, next_y, robot) &&
        RUR.is_detectable_position(next_x, next_y)) {
        return false;
    }

    return true;
};

RUR.control.right_is_clear = function(robot){
    var result, saved_recording_state;
    saved_recording_state = RUR._recording_(false);
    RUR.control.__turn_right(robot);
    result = RUR.control.front_is_clear(robot);
    RUR.control.turn_left(robot);
    RUR._recording_(saved_recording_state);
    return result;
};

RUR.control.is_facing_north = function (robot) {
    return robot._orientation === RUR.NORTH;
};

RUR.control.think = function (delay) {
    var old_delay = RUR.PLAYBACK_TIME_PER_FRAME;
    RUR.PLAYBACK_TIME_PER_FRAME = delay;
    return old_delay;
};

RUR.control.at_goal = function (robot) {
    var goal = RUR.get_current_world().goal;
    if (goal !== undefined){
        if (goal.position !== undefined) {
            return (robot.x === goal.position.x && robot.y === goal.position.y);
        }
        throw new RUR.ReeborgError(RUR.translate("There is no position as a goal in this world!"));
    }
    throw new RUR.ReeborgError(RUR.translate("There is no goal in this world!"));
};


RUR.control.carries_object = function (robot, obj) {
    var obj_type, all_objects, carried=false;

    if (robot === undefined || robot.objects === undefined) {
        return 0;
    }

    all_objects = {};

    if (obj === undefined) {
        for (obj_type in robot.objects) {
            if (robot.objects.hasOwnProperty(obj_type)) {
                all_objects[RUR.translate(obj_type)] = robot.objects[obj_type];
                carried = true;
            }
        }
        if (carried) {
            return all_objects;
        } else {
            return 0;
        }
    } else {
        obj = RUR.translate_to_english(obj);
        for (obj_type in robot.objects) {
            if (robot.objects.hasOwnProperty(obj_type) && obj_type == obj) {
                return robot.objects[obj_type];
            }
        }
        return 0;
    }
};


RUR.control.set_model = function(robot, model){
    var default_robot;
    robot.model = model;
    default_robot = RUR.get_current_world().robots[0];
    if (default_robot.__id == robot.__id) {
        RUR.user_selected_model = undefined;  // overrides the user's choice
    }
    RUR.record_frame("set_model", robot.__id);
 };

/** @function set_model
 * @memberof RUR
 * @instance
 * @summary This function, intended for world creators, allow to set the
 * model for the default robot, overriding the user's default choice.
 *
 *  @param {string} model The name of the model
 */

RUR.set_model = function(model){
    var robot;
    robot = RUR.get_current_world().robots[0];
    robot.model = model;
    RUR.user_selected_model = undefined;  // overrides the user's choice
    RUR.record_frame("RUR.set_model", robot.__id);
 };


RUR.control.set_trace_color = function(robot, color){
    robot._trace_color = color;
 };

RUR.control.set_trace_style = function(robot, style){
    robot._trace_style = style;
 };

if (RUR.state === undefined){
    RUR.state = {};
}

RUR.state.sound_on = false;
RUR.control.sound = function(on){
    if(!on){
        RUR.state.sound_on = false;
        return;
    }
    RUR.state.sound_on = true;
};

},{"./../default_tiles/tiles.js":1,"./../recorder/record_frame.js":38,"./../rur.js":44,"./../translator.js":46,"./../utils/key_exist.js":66,"./../utils/supplant.js":71,"./../world_api/background_tile.js":75,"./../world_api/composition.js":77,"./../world_api/is_fatal.js":79,"./../world_api/obstacles.js":81,"./../world_api/pushables.js":82,"./../world_api/robot.js":83,"./../world_api/walls.js":85,"./../world_get/world_get.js":86,"./exceptions.js":28,"./output.js":29}],28:[function(require,module,exports){

require("./../rur.js");

// During evaluation of "onload", which is done before a program is
// running and only involves Javascript code, some errors may be thrown.
// In this situation we make sure that these errors are not passed to Brython.

RUR.ReeborgError = function (message) {
    if (RUR.state.input_method == "py-repl" ||
            (!RUR.state.evaluating_onload && RUR.state.programming_language == "python") ||
            (RUR.state.evaluating_onload && RUR.state.onload_programming_language == "python")
        ){
        try { // see comment above
            if (["en", "fr-en", "ko-en", "cn-en", "pt-en"].indexOf(RUR.state.human_language) != -1) {
                return __BRYTHON__.$call(window.ReeborgError_en)(message);
            } else if (["cn", "en-cn"].indexOf(RUR.state.human_language) != -1) {
                return __BRYTHON__.$call(window.ReeborgError_cn)(message);
            } else if (["pt"].indexOf(RUR.state.human_language) != -1) {
                return __BRYTHON__.$call(window.ReeborgError_pt)(message);
            } else {
                return __BRYTHON__.$call(window.ReeborgError_fr)(message);                
            }
        } catch (e) {}
    }
    this.name = "ReeborgError";
    this.message = message;
    this.reeborg_shouts = message;
};


RUR.ReeborgOK = function (message) {
    if (RUR.state.programming_language == "python"){
        try { // see comment above
            if (["en", "fr-en", "ko-en", "cn-en", "pt-en"].indexOf(RUR.state.human_language) != -1) {
                return __BRYTHON__.$call(window.ReeborgOK_en)(message);
            } else if (["cn", "en-cn"].indexOf(RUR.state.human_language) != -1) {
                return __BRYTHON__.$call(window.ReeborgOK_cn)(message);
            } else if (["pt"].indexOf(RUR.state.human_language) != -1) {
                return __BRYTHON__.$call(window.ReeborgOK_pt)(message);
            } else {
                return __BRYTHON__.$call(window.ReeborgOK_fr)(message);
            }
        } catch (e) {}
    }
    this.name = "ReeborgOK";
    this.reeborg_concludes = message;
    this.message = message;
};
RUR.ReeborgOk = RUR.ReeborgOK; // preventing an annoying typo...


RUR.WallCollisionError = function (message) {
    if (RUR.state.programming_language == "python"){
        if (["en", "fr-en", "ko-en", "cn-en", "pt-en"].indexOf(RUR.state.human_language) != -1) {
            return __BRYTHON__.$call(window.WallCollisionError_en)(message);
        } else if (["cn", "en-cn"].indexOf(RUR.state.human_language) != -1) {
                return __BRYTHON__.$call(window.WallCollisionError_cn)(message);
        } else if (["pt"].indexOf(RUR.state.human_language) != -1) {
                return __BRYTHON__.$call(window.WallCollisionError_pt)(message);
        } else {
            return __BRYTHON__.$call(window.WallCollisionError_fr)(message);            
        }
    }
    this.name = "WallCollisionError";
    this.message = message;
    this.reeborg_shouts = message;
};


RUR.MissingObjectError = function (message) {
    if (RUR.state.programming_language == "python"){
        if (["en", "fr-en", "ko-en", "cn-en", "pt-en"].indexOf(RUR.state.human_language) != -1) {
            return __BRYTHON__.$call(window.MissingObjectError_en)(message);
        } else if (["cn", "en-cn"].indexOf(RUR.state.human_language) != -1) {
                return __BRYTHON__.$call(window.MissingObjectError_cn)(message);
        } else if (["pt"].indexOf(RUR.state.human_language) != -1) {
                return __BRYTHON__.$call(window.MissingObjectError_pt)(message);
        } else {
            return __BRYTHON__.$call(window.MissingObjectError_fr)(message);
        }
    }
    this.name = "MissingObjectError";
    this.message = message;
    this.reeborg_shouts = message;
};

},{"./../rur.js":44}],29:[function(require,module,exports){

require("./../rur.js");
require("./../translator.js");
require("./../recorder/record_frame.js");

RUR.output = {};

RUR.output.write = function () {
    var output_string = '';
    RUR.state.sound_id = "#write-sound";
    for (var i = 0; i < arguments.length; i++) {
        if (typeof arguments[i] == "string") {
            output_string += arguments[i];
        } else {
            output_string += JSON.stringify(arguments[i]);
        }
    }
    RUR.print_cache += output_string;
    output_string = output_string.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
    RUR.record_frame("stdout", {"element": "#stdout", "message": output_string});
};

RUR.output.write_ln = function () {
    var output_string = '';
    RUR.state.sound_id = "#write-sound";
    for (var i = 0; i < arguments.length; i++) {
        if (typeof arguments[i] == "string") {
            output_string += arguments[i];
        } else {
            output_string += JSON.stringify(arguments[i]);
        }
    }
    RUR.print_cache += output_string + "\n";

    output_string = output_string.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
    output_string += "\n";
    RUR.record_frame("stdout", {"element": "#stdout", "message": output_string});
};

RUR.output.clear_print = function () {
    RUR.record_frame("stdout", {"element": "#stdout", "clear": true});
};

RUR.output.print_html = function (arg, replace) {
    if (replace) {
        RUR.record_frame("print_html", {"element": "#print-html", "message": arg});
    } else {
        RUR.record_frame("print_html", {"element": "#print-html", "message": arg, "append": true});
    }
};

RUR.output.watch_variables = function (arg) {
    RUR.record_frame("watch_variables", {"element": "#watch-variables", "message": arg});
};


/** @function get_print
 * @memberof RUR
 * @instance
 * @summary This function returns the content of the standard output,
 * produced by `print` in Python, and either `write` or `writeln` in
 * Javascript.
 * @return {string} The content of the print output.
 */
RUR.get_print = function () {
    return RUR.print_cache;
};

/** @function show_diff
 * @memberof RUR
 * @instance
 * @summary This function compares two strings and returns a single html string
 * with any differences highlighted. Newlines are converted to &#9166; followed
 * by `<br>`. The typical use case is to compare an expected result to the
 * one actually observed.
 *
 * **Note**: if you or one of your students find the color differences between
 * the inserted text and the deleted text too hard to distinguish, please
 * get in touch with me so that I can make this work better.
 *
 *  @param {string} expected The expected string
 *  @param {string} actual  The string that was obtained (from the student code)
 *  @param {boolean} [semantic] If set to `true`, a semantic comparison (word by word)
 *  is attempted rather than a character by character comparison.
 *  This may give a more readable output in some cases. 
 * 
 * @return {string} The content of the print output as a specially formatted html string.
 */

RUR.show_diff = function(expected, actual, semantic) {
    // adapted from diff_match_patch's diff_prettyHtml
    // See https://code.google.com/archive/p/google-diff-match-patch/wikis/API.wiki
    var diff_object = new diff_match_patch();
    var diffs = diff_object.diff_main(expected, actual);
    if (semantic) {
            diff_object.diff_cleanupSemantic(diffs);
    }

    var html = [];
    var pattern_amp = /&/g;
    var pattern_lt = /</g;
    var pattern_gt = />/g;
    var pattern_newline = /\n/g;
    for (var x = 0; x < diffs.length; x++) {
        var op = diffs[x][0];    // Operation (insert, delete, equal)
        var data = diffs[x][1];  // Text of change.
        var text = data.replace(pattern_amp, '&amp;').replace(pattern_lt, '&lt;')
            .replace(pattern_gt, '&gt;').replace(pattern_newline, '&#9166;<br>');
        switch (op) {
            case DIFF_INSERT:
                html[x] = '<ins style="background:#e6ffe6;">' + text + '</ins>';
                break;
            case DIFF_DELETE:
                html[x] = '<del style="background:#ffe6e6;">' + text + '</del>';
                break;
            case DIFF_EQUAL:
                html[x] = '<span>' + text + '</span>';
                break;
        }
    }
    return html.join('');
};


/** @function show_detailed_diff
 * @memberof RUR
 * @instance
 * @summary This function compares two strings and returns a summary of what
 * was expected, followed by an output showing the differences as highlighted.
 * This can be used, for example, to compare the output of a print statement
 * written by a student to an expected output. If one wants to compare the
 * result of a function returning a string, an additional option is to 
 * also show the actual output.
 *
 * **Note**: if you or one of your students find the color differences between
 * the inserted text and the deleted text too hard to distinguish, please
 * get in touch with me so that I can make this work better.
 *
 *  @param {string} expected The expected string
 *  @param {string} actual  The string that was obtained (from the student code)
 *  @param {Object} [options] A Javascript object (Python dict) containing some 
 *     additional optional options.
 *  @param {boolean} [options.semantic] If set to `true`, a semantic comparison 
 *  (word by word)
 *  is attempted rather than a character by character comparison.
 *  This may give a more readable output in some cases. 
 *  @param {string} [options.expected_heading] A string to use as the heading
 *  for the expected result.
 *  @param {string} [options.differences] A string to use as the heading
 *  for the highlighted differences.
 *  @param {boolean} [options.show_actual] If we wish to also display the actual
 *  result.
 *  @param {string} [options.actual_heading] A string to use as the heading
 *  for the actual result. This will be ignored if `options.show_actual` does
 *  not evaluate to `true`.
 *  
 * @return {string} A formatted html string.
 */

RUR.show_detailed_diff = function (expected, actual, options) {
    "use strict";
    var diff, expected_heading, differences_heading, actual_heading,
        div_begin, 
        expected_section, differences_section, actual_section='';

    div_begin = "<div style='margin-left:2em;'>";

    if (options && options.semantic) {
        diff = RUR.show_diff(expected, actual, true);
    } else {
        diff = RUR.show_diff(expected, actual);
    }
    
    if (options && options.expected_heading) {
        expected_heading = "<h3>" + options.expected_heading + "</h3>";
    } else {
        expected_heading = "<h3>" + RUR.translate("Expected result") + "</h3>";
    }
    expected_section = expected_heading + div_begin + expected.replace(/\n/g, '<br>') + "</div>";
    
    if (options && options.differences_heading) {
        differences_heading = "<h3>" + options.differences_heading + "</h3>";
    } else {
        differences_heading = "<h3>" + RUR.translate("Differences highlighted") + "</h3>";
    }
    differences_section = differences_heading + div_begin + diff + "</div>";

    if (options && options.show_actual) {
        if (options.actual_heading) {
            actual_heading = "<h3>" + options.actual_heading + "</h3>";
        } else {
            actual_heading = "<h3>" + RUR.translate("Actual result") + "</h3>";
        }
        actual_section = actual_heading + div_begin + actual.replace(/\n/g, '<br>') + "</div>";
    }

    return expected_section + actual_section + differences_section;
};
},{"./../recorder/record_frame.js":38,"./../rur.js":44,"./../translator.js":46}],30:[function(require,module,exports){
require("./../rur.js");
require("./commands.js");
require("./../world_api/robot.js");

/* See reeborg_en.js for an explanation about the purpose of this file. */

RUR.reset_definitions_cn = function () {

    window.到达目的地 = RUR._at_goal_;
    window.砌墙 = RUR._build_wall_;
    window.携带的物品 = RUR._carries_object_;
    window.此处的颜色 = RUR._color_here_;
    window.默认机器人 = function () {
        var r = Object.create(机器人.prototype);
        r.body = RUR._default_robot_body_();
        return r;
    };
    window.help_js = RUR._inspect_;
    window.完成 = RUR._done_;
    window.前方通畅 = RUR._front_is_clear_;
    window.面向北方 = RUR._is_facing_north_;
    window.前进 = RUR._move_;
    window.新机器人图片 = RUR._new_robot_images_;
    window.此处的物品 = RUR._object_here_;
    window.暂停 = RUR._pause_;
    window.粉刷格子 = RUR._paint_square_;
    window.此处的坐标 = function () {
        var body = RUR._default_robot_body_();
        return [body.x, body.y];
    };
    window.前方的坐标 = function () {
        var pos, body = RUR._default_robot_body_();
        pos = RUR.get_position_in_front(body);
        if (RUR.is_valid_position(pos["x"], pos["y"])) {
            return [pos["x"], pos["y"]];
        } else {
            return undefined;
        }
    };
    window.打印超文本 = window.print_html = RUR._print_html_;
    window.放下 = RUR._put_;
    window.抛出 = RUR._toss_;
    window.记录 = RUR._recording_;
    window.移除机器人 = RUR._remove_robots_;
    window.右侧通畅 = RUR._right_is_clear_;
    window.设置最大步骤 = RUR._set_max_nb_steps_;
    window.设置路径颜色 = RUR._set_trace_color_;
    window.音效 = RUR._sound_;
    window.拾起 = RUR._take_;
    window.思考 = RUR._think_;
    window.左转 = RUR._turn_left_;
    window.前方有墙 = RUR._wall_in_front_;
    window.右侧有墙 = RUR._wall_on_right_;
    window.write = RUR._write_;
    window.writeln = RUR._write_ln;
    window.创建定制菜单 = RUR._MakeCustomMenu_;
    window.世界 = RUR._World_;

    // The following are for OOP programming in Javascript
    var 机器人 = window.机器人 = function (x, y, orientation, tokens)  {
        this.body = RUR.robot.create_robot(x, y, orientation, tokens);
        RUR.add_robot(this.body);
    };

    机器人.prototype.到达目的地 = function () {
        return RUR._UR.at_goal_(this.body);
    };

    机器人.prototype.砌墙 = function () {
        RUR._UR.build_wall_(this.body);
    };

    机器人.prototype.携带的物品 = function () {
        return RUR._UR.carries_object_(this.body);
    };

    机器人.prototype.此处的颜色 = function() {
        return RUR._UR.color_here_(this.body);
    };

    机器人.prototype.前方通畅 = function () {
        return RUR._UR.front_is_clear_(this.body);
    };

    机器人.prototype.面向北方 = function () {
        return RUR._UR.is_facing_north_(this.body);
    };

    机器人.prototype.前进 = function () {
        RUR._UR.move_(this.body);
    };

    机器人.prototype.此处的物品 = function (obj) {
        return RUR._UR.object_here_(this.body, obj);
    };

    机器人.prototype.粉刷格子 = function (color) {
        RUR._UR.paint_square_(color, this.body);
    };

    机器人.prototype.此处的坐标 = function () {
        return [this.body.x, this.body.y];
    };

    机器人.prototype.前方的坐标 = function () {
        pos = RUR.get_position_in_front(this.body);
        if (RUR.is_valid_position(pos["x"], pos["y"])) {
            return [pos["x"], pos["y"]];
        }
        else {
            return undefined;
        }
    };

    机器人.prototype.放下 = function () {
        RUR._UR.put_(this.body);
    };

    机器人.prototype.抛出 = function () {
        RUR._UR.toss_(this.body);
    };

    机器人.prototype.右侧通畅 = function () {
        return RUR._UR.right_is_clear_(this.body);
    };

    机器人.prototype.设置模型 = function(model) {
        RUR._UR.set_model_(this.body, model);
    };

    机器人.prototype.设置路径颜色 = function (robot, color) {
        RUR._UR.set_trace_color_(robot, color);
    };

    机器人.prototype.设置路径风格 = function (robot, style) {
        RUR._UR.set_trace_style_(robot, style);
    };

    机器人.prototype.拾起 = function () {
        RUR._UR.take_(this.body);
    };

    机器人.prototype.左转 = function () {
        RUR._UR.turn_left_(this.body);
    };

    机器人.prototype.前方有墙 = function () {
        return RUR._UR.wall_in_front_(this.body);
    };

    机器人.prototype.右侧有墙 = function () {
        return RUR._UR.wall_on_right_(this.body);
    };

    // make prototype available with known English name in RUR namespace
    RUR.UsedRobot = 机器人;
};

},{"./../rur.js":44,"./../world_api/robot.js":83,"./commands.js":26}],31:[function(require,module,exports){
require("./../rur.js");
require("./commands.js");
require("./../world_api/robot.js");

/* See reeborg_en.js for an explanation about the purpose of this file. */

RUR.reset_definitions_de = function () {

    window.ist_am_ziel = RUR._at_goal_;
    window.baue_wand = RUR._build_wall_;
    window.hat_objekt = RUR._carries_object_;
    window.gib_farbe = RUR._color_here_;
    window.standard_roboter = function () {
        var r = Object.create(UsedRobot.prototype);
        r.body = RUR._default_robot_body_();
        return r;
    };
    window.help_js = RUR._inspect_;
    window.beenden = RUR._done_;
    window.ist_vorne_frei = RUR._front_is_clear_;
    window.ist_norden = RUR._is_facing_north_;
    window.schritt = RUR._move_;
    window.neues_roboter_bild = RUR._new_robot_images_;
    window.ist_objekt_hier = RUR._object_here_;
    window.pause = RUR._pause_;
    window.male_zelle = RUR._paint_square_;
    window.gib_koordinaten = function () {
        var body = RUR._default_robot_body_();
        return [body.x, body.y];
    };
    window.gib_koordinaten_vorne = function () {
        var pos, body = RUR._default_robot_body_();
        pos = RUR.get_position_in_front(body);
        if (RUR.is_valid_position(pos["x"], pos["y"])) {
            return [pos["x"], pos["y"]];}
        else {
            return undefined;
        }
    };
    window.drucke_html = RUR._print_html_;
    window.hinlegen = RUR._put_;
    window.hinwerfen = RUR._toss_;
    window.setze_aufnahme = RUR._recording_;
    window.entferne_roboter = RUR._remove_robots_;
    window.ist_rechts_frei = RUR._right_is_clear_;
    window.setze_max_anzahl_instruktionen = RUR._set_max_nb_steps_;
    window.setze_spur_farbe = RUR._set_trace_color_;
    window.ton_an = RUR._sound_;
    window.nimm = RUR._take_;
    window.denke = RUR._think_;
    window.drehe_links = RUR._turn_left_;
    window.ist_wand_vorne = RUR._wall_in_front_;
    window.ist_wand_rechts = RUR._wall_on_right_;
    window.gibaus = RUR._write_;
    window.gibaus_zeile = RUR._write_ln;
    window.ErstelleEigenesMenu = RUR._MakeCustomMenu_;
    window.Welt = RUR._World_;


    var UsedRobot = window.UsedRobot = function (x, y, orientation, tokens)  {
        this.body = RUR.robot.create_robot(x, y, orientation, tokens);
        RUR.add_robot(this.body);
    };

    UsedRobot.prototype.ist_am_ziel = function () {
        return RUR._UR.at_goal_(this.body);
    };

    UsedRobot.prototype.baue_wand = function () {
        RUR._UR.build_wall_(this.body);
    };

    UsedRobot.prototype.traegt_objekt = function () {
        return RUR._UR.carries_object_(this.body);
    };

    UsedRobot.prototype.farbe_hier = UsedRobot.prototype.color_here;

    UsedRobot.prototype.ist_vorne_frei = function () {
        return RUR._UR.front_is_clear_(this.body);
    };

    UsedRobot.prototype.ist_norden = function () {
        return RUR._UR.is_facing_north_(this.body);
    };

    UsedRobot.prototype.schritt = function () {
        RUR._UR.move_(this.body);
    };

    UsedRobot.prototype.ist_objekt_hier = function (obj) {
        return RUR._UR.object_here_(this.body, obj);
    };

    UsedRobot.prototype.male_zelle = function (color) {
        RUR._UR.paint_square_(color, this.body);
    };

    UsedRobot.prototype.gib_koordinaten = function () {
        return [this.body.x, this.body.y];
    };

    UsedRobot.prototype.gib_koordinaten_vorne = function () {
        pos = RUR.get_position_in_front(this.body);
        if (RUR.is_valid_position(pos["x"], pos["y"])) {
            return [pos["x"], pos["y"]];
        }
        else {
            return undefined;
        }
    };

    UsedRobot.prototype.hinlegen = function () {
        RUR._UR.put_(this.body);
    };
    UsedRobot.prototype.hinwerfen = function () {
        RUR._UR.toss_(this.body);
    };

    UsedRobot.prototype.ist_rechts_frei = function () {
        return RUR._UR.right_is_clear_(this.body);
    };

    UsedRobot.prototype.set_modell = function(model) {
        RUR._UR.set_model_(this.body, model);
    };

    UsedRobot.prototype.setze_spur_farbe = function (robot, color) {
        RUR._UR.set_trace_color_(robot, color);
    };

    UsedRobot.prototype.setze_spur_stil = function (robot, style) {
        RUR._UR.set_trace_style_(robot, style);
    };

    UsedRobot.prototype.nimm = function () {
        RUR._UR.take_(this.body);
    };


    UsedRobot.prototype.drehe_links = function () {
        RUR._UR.turn_left_(this.body);
    };

    UsedRobot.prototype.ist_wand_vorne = function () {
        return RUR._UR.wall_in_front_(this.body);
    };

    UsedRobot.prototype.ist_wand_rechts = function () {
        return RUR._UR.wall_on_right_(this.body);
    };

    // make prototype available with known English name in RUR namespace
    RUR.UsedRobot = UsedRobot;
};

},{"./../rur.js":44,"./../world_api/robot.js":83,"./commands.js":26}],32:[function(require,module,exports){
require("./../rur.js");
require("./commands.js");
require("./../world_api/robot.js");

/* Since Javascript is a dynamic language, a user or world creator could
    (possibly accidently) redefine a basic function, which could lead to some
    apparent bugs.  For this reason, we include a function whose role is to
    make it possible to reset the basic functions to their desired values.

    These functions have to be known globally; the standard way would be to do:

        var fn_name;
        RUR.reset_definitions = function () {
            fn_name = ...;
            ...
            UsedRobot.prototype.fn_name = ...
        }

    Instead we use the pattern following pattern which does not require to write
    a separate declaration.

        RUR.reset_definitions = function () {
            window.fn_name = ...;
            ...
            UsedRobot.prototype.fn_name = ...
        }
**/


RUR.reset_definitions_en = function () {

    window.at_goal = RUR._at_goal_;
    window.build_wall = RUR._build_wall_;
    window.carries_object = RUR._carries_object_;
    window.color_here = RUR._color_here_;
    window.colour_here = RUR._color_here_;
    window.default_robot = function () {
        var r = Object.create(UsedRobot.prototype);
        r.body = RUR._default_robot_body_();
        return r;
    };
    window.help_js = RUR._inspect_;
    window.done = RUR._done_;
    window.front_is_clear = RUR._front_is_clear_;
    window.is_facing_north = RUR._is_facing_north_;
    window.move = RUR._move_;
    window.new_robot_images = RUR._new_robot_images_;
    window.object_here = RUR._object_here_;
    window.pause = RUR._pause_;
    window.paint_square = RUR._paint_square_;
    window.position_here = function () {
        var body = RUR._default_robot_body_();
        return [body.x, body.y];
    };
    window.position_in_front = function () {
        var pos, body = RUR._default_robot_body_();
        pos = RUR.get_position_in_front(body);
        if (RUR.is_valid_position(pos["x"], pos["y"])) {
            return [pos["x"], pos["y"]];}
        else {
            return undefined;
        }
    };
    window.print_html = RUR._print_html_;
    window.put = RUR._put_;
    window.toss = RUR._toss_;
    window.recording = RUR._recording_;
    window.remove_robots = RUR._remove_robots_;
    window.right_is_clear = RUR._right_is_clear_;
    window.set_max_nb_steps = RUR._set_max_nb_steps_;
    window.set_trace_color = RUR._set_trace_color_;
    window.sound = RUR._sound_;
    window.take = RUR._take_;
    window.think = RUR._think_;
    window.turn_left = RUR._turn_left_;
    window.wall_in_front = RUR._wall_in_front_;
    window.wall_on_right = RUR._wall_on_right_;
    window.write = RUR._write_;
    window.writeln = RUR._write_ln;
    window.MakeCustomMenu = RUR._MakeCustomMenu_;
    window.World = RUR._World_;


    var UsedRobot = window.UsedRobot = function (x, y, orientation, tokens)  {
        this.body = RUR.robot.create_robot(x, y, orientation, tokens);
        RUR.add_robot(this.body);
    };

    UsedRobot.prototype.at_goal = function () {
        return RUR._UR.at_goal_(this.body);
    };

    UsedRobot.prototype.build_wall = function () {
        RUR._UR.build_wall_(this.body);
    };

    UsedRobot.prototype.carries_object = function () {
        return RUR._UR.carries_object_(this.body);
    };

    UsedRobot.prototype.color_here = function() {
        return RUR._UR.color_here_(this.body);
    };
    UsedRobot.prototype.colour_here = UsedRobot.prototype.color_here;

    UsedRobot.prototype.front_is_clear = function () {
        return RUR._UR.front_is_clear_(this.body);
    };

    UsedRobot.prototype.is_facing_north = function () {
        return RUR._UR.is_facing_north_(this.body);
    };

    UsedRobot.prototype.move = function () {
        RUR._UR.move_(this.body);
    };

    UsedRobot.prototype.object_here = function (obj) {
        return RUR._UR.object_here_(this.body, obj);
    };

    UsedRobot.prototype.paint_square = function (color) {
        RUR._UR.paint_square_(color, this.body);
    };

    UsedRobot.prototype.position_here = function () {
        return [this.body.x, this.body.y];
    };

    UsedRobot.prototype.position_in_front = function () {
        pos = RUR.get_position_in_front(this.body);
        if (RUR.is_valid_position(pos["x"], pos["y"])) {
            return [pos["x"], pos["y"]];
        }
        else {
            return undefined;
        }
    };

    UsedRobot.prototype.put = function () {
        RUR._UR.put_(this.body);
    };
    UsedRobot.prototype.toss = function () {
        RUR._UR.toss_(this.body);
    };

    UsedRobot.prototype.right_is_clear = function () {
        return RUR._UR.right_is_clear_(this.body);
    };

    UsedRobot.prototype.set_model = function(model) {
        RUR._UR.set_model_(this.body, model);
    };

    UsedRobot.prototype.set_trace_color = function (robot, color) {
        RUR._UR.set_trace_color_(robot, color);
    };

    UsedRobot.prototype.set_trace_style = function (robot, style) {
        RUR._UR.set_trace_style_(robot, style);
    };

    UsedRobot.prototype.take = function () {
        RUR._UR.take_(this.body);
    };


    UsedRobot.prototype.turn_left = function () {
        RUR._UR.turn_left_(this.body);
    };

    UsedRobot.prototype.wall_in_front = function () {
        return RUR._UR.wall_in_front_(this.body);
    };

    UsedRobot.prototype.wall_on_right = function () {
        return RUR._UR.wall_on_right_(this.body);
    };

    // make prototype available with known English name in RUR namespace
    RUR.UsedRobot = UsedRobot;

    // English specific and only for compatibility with rur-ple
    // do not translate the following
    window.put_beeper = put;
    window.pick_beeper = take;
    window.turn_off = done;
    window.on_beeper = object_here;
    window.next_to_a_beeper = object_here;
    window.carries_beepers = carries_object;
    window.set_delay = think;
    window.facing_north = is_facing_north;
};

},{"./../rur.js":44,"./../world_api/robot.js":83,"./commands.js":26}],33:[function(require,module,exports){
require("./../rur.js");
require("./commands.js");
require("./../world_api/robot.js");

/* See reeborg_en.js for an explanation about the purpose of this file. */

RUR.reset_definitions_fr = function () {

    window.au_but = RUR._at_goal_;
    window.construit_un_mur = RUR._build_wall_;
    window.transporte = RUR._carries_object_;
    window.couleur_ici = RUR._color_here_;
    window.robot_par_defaut = function () {
        var r = Object.create(RobotUsage.prototype);
        r.body = RUR._default_robot_body_();
        return r;
    };
    window.help_js = RUR._inspect_;
    window.termine = RUR._done_;
    window.rien_devant = RUR._front_is_clear_;
    window.est_face_au_nord = RUR._is_facing_north_;
    window.avance = RUR._move_;

    window.mur_devant = RUR._wall_in_front_;
    window.nouvelles_images_de_robot = function (images) {
        if (images.est !== undefined) {
            images.east = images.est;
        }
        if (images.ouest !== undefined) {
            images.west = images.ouest;
        }
        if (images.sud !== undefined) {
            images.south = images.sud;
        }
        if (images.nord !== undefined) {
            images.north = images.nord;
        }
        RUR._new_robot_images_(images);
    };
    window.objet_ici = RUR._object_here_;
    window.colorie = RUR._paint_square_;
    window.couleur_de_trace = RUR._set_trace_color_;
    window.pause = RUR._pause_;
    window.print_html = RUR._print_html_;
    window.depose = RUR._put_;
    window.dépose = RUR._put_;
    window.lance = RUR._toss_;
    window.enregistrement = RUR._recording_;
    window.plus_de_robots = RUR._remove_robots_;
    window.rien_a_droite = RUR._right_is_clear_;
    window.rien_à_droite = RUR._right_is_clear_;
    window.max_nb_instructions = RUR._set_max_nb_steps_;
    window.son = RUR._sound_;
    window.prend = RUR._take_;
    window.pense = RUR._think_;
    window.position_ici = function () {
        var body = RUR._default_robot_body_();
        return [body.x, body.y];
    };
    window.position_devant = function () {
        var pos, body = RUR._default_robot_body_();
        pos = RUR.get_position_in_front(body);
        if (RUR.is_valid_position(pos["x"], pos["y"])) {
            return [pos["x"], pos["y"]];
        }
        else {
            return undefined;
        }
    };
    window.tourne_a_gauche = RUR._turn_left_;
    window.tourne_à_gauche = RUR._turn_left_;
    window.mur_devant = RUR._wall_in_front_;
    window.mur_a_droite = RUR._wall_on_right_;
    window.mur_à_droite = RUR._wall_on_right_;
    window.ecrit = RUR._write_;
    window.writeln = RUR._write_ln;
    window.MenuPersonnalise = RUR._MakeCustomMenu_;
    window.MakeCustomMenu = RUR._MakeCustomMenu_;
    window.Monde = RUR._World_;

    // The following are for OOP programming in Javascript
    var RobotUsage = window.RobotUsage = function (x, y, orientation, tokens)  {
        this.body = RUR.robot.create_robot(x, y, orientation, tokens);
        RUR.add_robot(this.body);
    };
    RobotUsage.prototype.au_but = function () {
        return RUR._UR.at_goal_(this.body);
    };

    RobotUsage.prototype.construit_un_mur = function () {
        RUR._UR.build_wall_(this.body);
    };

    RobotUsage.prototype.transporte = function () {
        return RUR._UR.carries_object_(this.body);
    };

    RobotUsage.prototype.couleur_ici = function() {
        return RUR._UR.color_here_(this.body);
    };

    RobotUsage.prototype.rien_devant = function () {
        return RUR._UR.front_is_clear_(this.body);
    };

    RobotUsage.prototype.est_face_au_nord = function () {
        return RUR._UR.is_facing_north_(this.body);
    };

    RobotUsage.prototype.avance = function () {
        RUR._UR.move_(this.body);
    };

    RobotUsage.prototype.objet_ici = function (obj) {
        return RUR._UR.object_here_(this.body, obj);
    };

    RobotUsage.prototype.position_ici = function () {
        return [this.body.x, this.body.y];
    };

    RobotUsage.prototype.position_ici = function () {
        pos = RUR.get_position_in_front(this.body);
        if (RUR.is_valid_position(pos["x"], pos["y"])) {
            return [pos["x"], pos["y"]];
        }
        else {
            return undefined;
        }
    };

    RobotUsage.prototype.colorie = function (color) {
        RUR._UR.paint_square_(color, this.body);
    };

    RobotUsage.prototype.depose = function () {
        RUR._UR.put_(this.body);
    };

    RobotUsage.prototype.lance = function () {
        RUR._UR.toss_(this.body);
    };

    RobotUsage.prototype.rien_a_droite = function () {
        return RUR._UR.right_is_clear_(this.body);
    };

    RobotUsage.prototype.modele = function(model) {
        RUR._UR.set_model_(this.body, model);
    };

    RobotUsage.prototype.couleur_de_trace = function (robot, color) {
        RUR._UR.set_trace_color_(robot, color);
    };

    RobotUsage.prototype.style_de_trace = function (robot, style) {
        RUR._UR.set_trace_style_(robot, style);
    };

    RobotUsage.prototype.prend = function () {
        RUR._UR.take_(this.body);
    };

    RobotUsage.prototype.tourne_a_gauche = function () {
        RUR._UR.turn_left_(this.body);
    };

    RobotUsage.prototype.mur_devant = function () {
        return RUR._UR.wall_in_front_(this.body);
    };

    RobotUsage.prototype.mur_a_droite = function () {
        return RUR._UR.wall_on_right_(this.body);
    };

    // make prototype available with known English name in RUR namespace
    RUR.UsedRobot = RobotUsage;
};

},{"./../rur.js":44,"./../world_api/robot.js":83,"./commands.js":26}],34:[function(require,module,exports){
require("./../rur.js");
require("./commands.js");
require("./../world_api/robot.js");

/* Since Javascript is a dynamic language, a user or world creator could
    (possibly accidently) redefine a basic function, which could lead to some
    apparent bugs.  For this reason, we include a function whose role is to
    make it possible to reset the basic functions to their desired values.

    These functions have to be known globally; the standard way would be to do:

        var fn_name;
        RUR.reset_definitions = function () {
            fn_name = ...;
            ...
            UsedRobot.prototype.fn_name = ...
        }

    Instead we use the pattern following pattern which does not require to write
    a separate declaration.

        RUR.reset_definitions = function () {
            window.fn_name = ...;
            ...
            UsedRobot.prototype.fn_name = ...
        }
**/

RUR.reset_definitions_ko = function () {

    window.목적지에_도착함 = RUR._at_goal_;
    window.벽_만들기 = RUR._build_wall_;
    window.물건을_가지고_있음 = RUR._carries_object_;
    window.바닥_색상 = RUR._color_here_;
    window.기본_로봇 = function () {
        var r = Object.create(사용_로봇.prototype);
        r.body = RUR._default_robot_body_();
        return r;
    };
    window.help_js = RUR._inspect_;
    window.종료 = RUR._done_;
    window.앞이_비어_있음 = RUR._front_is_clear_;
    window.북쪽을_향하고_있음 = RUR._is_facing_north_;
    window.전진 = RUR._move_;
    window.새_로봇_그림 = RUR._new_robot_images_;
    window.바닥에_물건이_있음 = RUR._object_here_;
    window.정지 = RUR._pause_;
    window.바닥_색칠 = RUR._paint_square_;
    window.현재_좌표 = function () {
        var body = RUR._default_robot_body_();
        return [body.x, body.y];
    };
    window.전면_좌표 = function () {
        var pos, body = RUR._default_robot_body_();
        pos = RUR.get_position_in_front(body);
        if (RUR.is_valid_position(pos["x"], pos["y"])) {
            return [pos["x"], pos["y"]];
        } else {
            return undefined;
        }
    };
    window.print_html = RUR._print_html_;
    window.놓기 = RUR._put_;
    window.던지기 = RUR._toss_;
    window.기록 = RUR._recording_;
    window.로봇_제거 = RUR._remove_robots_;
    window.오른쪽이_비어_있음 = RUR._right_is_clear_;
    window.최대_명령실행_수_설정 = RUR._set_max_nb_steps_;
    window.경로_색상_설정 = RUR._set_trace_color_;
    //window.경로_모양_설정 = RUR._set_trace_style_;
    window.소리 = RUR._sound_;
    window.줍기 = RUR._take_;
    window.생각 = RUR._think_;
    window.좌회전 = RUR._turn_left_;
    window.앞에_벽이_있음 = RUR._wall_in_front_;
    window.오른쪽에_벽이_있음 = RUR._wall_on_right_;
    window.write = RUR._write_;
    window.writeln = RUR._write_ln;
    window.MakeCustomMenu = RUR._MakeCustomMenu_;
    window.월드 = RUR._World_;

    // The following are for OOP programming in Javascript
    var 사용_로봇 = window.사용_로봇 = function (x, y, orientation, tokens)  {
        this.body = RUR.robot.create_robot(x, y, orientation, tokens);
        RUR.add_robot(this.body);
    };

    사용_로봇.prototype.목적지에_도착함 = function () {
        return RUR._UR.at_goal_(this.body);
    };

    사용_로봇.prototype.벽_만들기 = function () {
        RUR._UR.build_wall_(this.body);
    };

    사용_로봇.prototype.물건을_가지고_있음 = function () {
        return RUR._UR.carries_object_(this.body);
    };

    사용_로봇.prototype.바닥_색상 = function() {
        return RUR._UR.color_here_(this.body);
    };

    사용_로봇.prototype.앞이_비어_있음 = function () {
        return RUR._UR.front_is_clear_(this.body);
    };

    사용_로봇.prototype.북쪽을_향하고_있음 = function () {
        return RUR._UR.is_facing_north_(this.body);
    };

    사용_로봇.prototype.전진 = function () {
        RUR._UR.move_(this.body);
    };

    사용_로봇.prototype.바닥에_물건이_있음 = function (obj) {
        return RUR._UR.object_here_(this.body, obj);
    };

    사용_로봇.prototype.바닥_색칠 = function (color) {
        RUR._UR.paint_square_(color, this.body);
    };

    사용_로봇.prototype.현재_좌표 = function () {
        return [this.body.x, this.body.y];
    };

    사용_로봇.prototype.전면_좌표 = function () {
        pos = RUR.get_position_in_front(this.body);
        if (RUR.is_valid_position(pos["x"], pos["y"])) {
            return [pos["x"], pos["y"]];
        }
        else {
            return undefined;
        }
    };

    사용_로봇.prototype.놓기 = function () {
        RUR._UR.put_(this.body);
    };

    사용_로봇.prototype.던지기 = function () {
        RUR._UR.toss_(this.body);
    };

    사용_로봇.prototype.오른쪽이_비어_있음 = function () {
        return RUR._UR.right_is_clear_(this.body);
    };

    사용_로봇.prototype.모델_설정 = function(model) {
        RUR._UR.set_model_(this.body, model);
    };

    사용_로봇.prototype.경로_색상_설정 = function (robot, color) {
        RUR._UR.set_trace_color_(robot, color);
    };

    사용_로봇.prototype.경로_모양_설정 = function (robot, style) {
        RUR._UR.set_trace_style_(robot, style);
    };

    사용_로봇.prototype.줍기 = function () {
        RUR._UR.take_(this.body);
    };

    사용_로봇.prototype.좌회전 = function () {
        RUR._UR.turn_left_(this.body);
    };

    사용_로봇.prototype.앞에_벽이_있음 = function () {
        return RUR._UR.wall_in_front_(this.body);
    };

    사용_로봇.prototype.오른쪽에_벽이_있음 = function () {
        return RUR._UR.wall_on_right_(this.body);
    };

    // make prototype available with known English name in RUR namespace
    RUR.UsedRobot = 사용_로봇;
};

},{"./../rur.js":44,"./../world_api/robot.js":83,"./commands.js":26}],35:[function(require,module,exports){
require("./../rur.js");
require("./commands.js");
require("./../world_api/robot.js");

/* Since Javascript is a dynamic language, a user or world creator could
    (possibly accidently) redefine a basic function, which could lead to some
    apparent bugs.  For this reason, we include a function whose role is to
    make it possible to reset the basic functions to their desired values.

    These functions have to be known globally; the standard way would be to do:

        var fn_name;
        RUR.reset_definitions = function () {
            fn_name = ...;
            ...
            UsedRobot.prototype.fn_name = ...
        }

    Instead we use the pattern following pattern which does not require to write
    a separate declaration.

        RUR.reset_definitions = function () {
            window.fn_name = ...;
            ...
            UsedRobot.prototype.fn_name = ...
        }
**/


RUR.reset_definitions_lt = function () {

    window.prie_tikslo = RUR._at_goal_;
    window.statyti_sieną = RUR._build_wall_;
    window.neša_objektą = RUR._carries_object_;
    window.color_here = RUR._color_here_;
    window.colour_here = RUR._color_here_;
    window.default_robot = function () {
        var r = Object.create(NaudojamasRobotas.prototype);
        r.body = RUR._default_robot_body_();
        return r;
    };
    window.help_js = RUR._inspect_;
    window.baigti = RUR._done_;
    window.priekyje_laisva = RUR._front_is_clear_;
    window.pasisukęs_šiaurėn = RUR._is_facing_north_;
    window.pirmyn = RUR._move_;
    window.new_robot_images = RUR._new_robot_images_;
    window.aptiktas_objektas = RUR._object_here_;
    window.pauzė = RUR._pause_;
    window.paint_square = RUR._paint_square_;
    window.position_here = function () {
        var body = RUR._default_robot_body_();
        return [body.x, body.y];
    };
    window.position_in_front = function () {
        var pos, body = RUR._default_robot_body_();
        pos = RUR.get_position_in_front(body);
        if (RUR.is_valid_position(pos["x"], pos["y"])) {
            return [pos["x"], pos["y"]];}
        else {
            return undefined;
        }
    };
    window.print_html = RUR._print_html_;
    window.padėti = RUR._put_;
    window.mesti = RUR._toss_;
    window.recording = RUR._recording_;
    window.remove_robots = RUR._remove_robots_;
    window.dešinėje_laisva = RUR._right_is_clear_;
    window.set_max_nb_steps = RUR._set_max_nb_steps_;
    window.set_trace_color = RUR._set_trace_color_;
    window.garsas = RUR._sound_;
    window.paimti = RUR._take_;
    window.galvoti = RUR._think_;
    window.suktis_kairėn = RUR._turn_left_;
    window.priekyje_siena = RUR._wall_in_front_;
    window.dešinėje_siena = RUR._wall_on_right_;
    window.rašyti = RUR._write_;
    window.writeln = RUR._write_ln;
    window.MakeCustomMenu = RUR._MakeCustomMenu_;
    window.Pasaulis = RUR._World_;


    var NaudojamasRobotas = window.NaudojamasRobotas = function (x, y, orientation, tokens)  {
        this.body = RUR.robot.create_robot(x, y, orientation, tokens);
        RUR.add_robot(this.body);
    };

    NaudojamasRobotas.prototype.prie_tikslo = function () {
        return RUR._UR.at_goal_(this.body);
    };

    NaudojamasRobotas.prototype.statyti_sieną = function () {
        RUR._UR.build_wall_(this.body);
    };

    NaudojamasRobotas.prototype.neša_objektą = function () {
        return RUR._UR.carries_object_(this.body);
    };

    NaudojamasRobotas.prototype.color_here = function() {
        return RUR._UR.color_here_(this.body);
    };
    NaudojamasRobotas.prototype.colour_here = NaudojamasRobotas.prototype.color_here;

    NaudojamasRobotas.prototype.priekyje_laisva = function () {
        return RUR._UR.front_is_clear_(this.body);
    };

    NaudojamasRobotas.prototype.pasisukęs_šiaurėn = function () {
        return RUR._UR.is_facing_north_(this.body);
    };

    NaudojamasRobotas.prototype.pirmyn = function () {
        RUR._UR.move_(this.body);
    };

    NaudojamasRobotas.prototype.aptiktas_objektas = function (obj) {
        return RUR._UR.object_here_(this.body, obj);
    };

    NaudojamasRobotas.prototype.paint_square = function (color) {
        RUR._UR.paint_square_(color, this.body);
    };

    NaudojamasRobotas.prototype.position_here = function () {
        return [this.body.x, this.body.y];
    };

    NaudojamasRobotas.prototype.position_in_front = function () {
        pos = RUR.get_position_in_front(this.body);
        if (RUR.is_valid_position(pos["x"], pos["y"])) {
            return [pos["x"], pos["y"]];
        }
        else {
            return undefined;
        }
    };

    NaudojamasRobotas.prototype.padėti = function () {
        RUR._UR.put_(this.body);
    };
    NaudojamasRobotas.prototype.mesti = function () {
        RUR._UR.toss_(this.body);
    };

    NaudojamasRobotas.prototype.dešinėje_laisva = function () {
        return RUR._UR.right_is_clear_(this.body);
    };

    NaudojamasRobotas.prototype.set_model = function(model) {
        RUR._UR.set_model_(this.body, model);
    };

    NaudojamasRobotas.prototype.set_trace_color = function (robot, color) {
        RUR._UR.set_trace_color_(robot, color);
    };

    NaudojamasRobotas.prototype.set_trace_style = function (robot, style) {
        RUR._UR.set_trace_style_(robot, style);
    };

    NaudojamasRobotas.prototype.paimti = function () {
        RUR._UR.take_(this.body);
    };


    NaudojamasRobotas.prototype.suktis_kairėn = function () {
        RUR._UR.turn_left_(this.body);
    };

    NaudojamasRobotas.prototype.priekyje_siena = function () {
        return RUR._UR.wall_in_front_(this.body);
    };

    NaudojamasRobotas.prototype.dešinėje_siena = function () {
        return RUR._UR.wall_on_right_(this.body);
    };

    // make prototype available with known English name in RUR namespace
    RUR.UsedRobot = NaudojamasRobotas;

};

},{"./../rur.js":44,"./../world_api/robot.js":83,"./commands.js":26}],36:[function(require,module,exports){
require("./../rur.js");
require("./commands.js");
require("./../world_api/robot.js");

/* Since Javascript is a dynamic language, a user or world creator could
    (possibly accidently) redefine a basic function, which could lead to some
    apparent bugs.  For this reason, we include a function whose role is to
    make it possible to reset the basic functions to their desired values.

    These functions have to be known globally; the standard way would be to do:

        var fn_name;
        RUR.reset_definitions = function () {
            fn_name = ...;
            ...
            RobotWUzyciu.prototype.fn_name = ...
        }

    Instead we use the pattern following pattern which does not require to write
    a separate declaration.

        RUR.reset_definitions = function () {
            window.fn_name = ...;
            ...
            RobotWUzyciu.prototype.fn_name = ...
        }
**/


RUR.reset_definitions_pl = function () {

    window.u_celu = RUR._at_goal_;
    window.wybuduj_mur = RUR._build_wall_;
    window.obiekt_niesiony = RUR._carries_object_;
    window.color_here = RUR._color_here_;
    window.colour_here = RUR._color_here_;
    window.default_robot = function () {
        var r = Object.create(RobotWUzyciu.prototype);
        r.body = RUR._default_robot_body_();
        return r;
    };
    window.help_js = RUR._inspect_;
    window.skonczone = RUR._done_;
    window.droga_wolna = RUR._front_is_clear_;
    window.skierowany_na_polnoc = RUR._is_facing_north_;
    window.ruch = RUR._move_;
    window.new_robot_images = RUR._new_robot_images_;
    window.wykryto_obiekt = RUR._object_here_;
    window.pauza = RUR._pause_;
    window.paint_square = RUR._paint_square_;
    window.position_here = function () {
        var body = RUR._default_robot_body_();
        return [body.x, body.y];
    };
    window.position_in_front = function () {
        var pos, body = RUR._default_robot_body_();
        pos = RUR.get_position_in_front(body);
        if (RUR.is_valid_position(pos["x"], pos["y"])) {
            return [pos["x"], pos["y"]];}
        else {
            return undefined;
        }
    };
    window.print_html = RUR._print_html_;
    window.odloz = RUR._put_;
    window.toss = RUR._toss_;
    window.recording = RUR._recording_;
    window.remove_robots = RUR._remove_robots_;
    window.prawo_wolne = RUR._right_is_clear_;
    window.set_max_nb_steps = RUR._set_max_nb_steps_;
    window.set_trace_color = RUR._set_trace_color_;
    window.dzwiek = RUR._sound_;
    window.wez = RUR._take_;
    window.mysl = RUR._think_;
    window.obrot_w_lewo = RUR._turn_left_;
    window.mur_z_przodu = RUR._wall_in_front_;
    window.mur_po_prawej = RUR._wall_on_right_;
    window.napisz = RUR._write_;
    window.writeln = RUR._write_ln;
    window.MakeCustomMenu = RUR._MakeCustomMenu_;
    window.swiat = RUR._World_;


    var RobotWUzyciu = window.RobotWUzyciu = function (x, y, orientation, tokens)  {
        this.body = RUR.robot.create_robot(x, y, orientation, tokens);
        RUR.add_robot(this.body);
    };

    RobotWUzyciu.prototype.u_celu = function () {
        return RUR._UR.at_goal_(this.body);
    };

    RobotWUzyciu.prototype.wybuduj_mur = function () {
        RUR._UR.build_wall_(this.body);
    };

    RobotWUzyciu.prototype.obiekt_niesiony = function () {
        return RUR._UR.carries_object_(this.body);
    };

    RobotWUzyciu.prototype.color_here = function() {
        return RUR._UR.color_here_(this.body);
    };
    RobotWUzyciu.prototype.colour_here = RobotWUzyciu.prototype.color_here;

    RobotWUzyciu.prototype.droga_wolna = function () {
        return RUR._UR.front_is_clear_(this.body);
    };

    RobotWUzyciu.prototype.skierowany_na_polnoc = function () {
        return RUR._UR.is_facing_north_(this.body);
    };

    RobotWUzyciu.prototype.ruch = function () {
        RUR._UR.move_(this.body);
    };

    RobotWUzyciu.prototype.wykryto_obiekt = function (obj) {
        return RUR._UR.object_here_(this.body, obj);
    };

    RobotWUzyciu.prototype.paint_square = function (color) {
        RUR._UR.paint_square_(color, this.body);
    };

    RobotWUzyciu.prototype.position_here = function () {
        return [this.body.x, this.body.y];
    };

    RobotWUzyciu.prototype.position_in_front = function () {
        pos = RUR.get_position_in_front(this.body);
        if (RUR.is_valid_position(pos["x"], pos["y"])) {
            return [pos["x"], pos["y"]];
        }
        else {
            return undefined;
        }
    };

    RobotWUzyciu.prototype.odloz = function () {
        RUR._UR.put_(this.body);
    };
    RobotWUzyciu.prototype.toss = function () {
        RUR._UR.toss_(this.body);
    };

    RobotWUzyciu.prototype.prawo_wolne = function () {
        return RUR._UR.right_is_clear_(this.body);
    };

    RobotWUzyciu.prototype.set_model = function(model) {
        RUR._UR.set_model_(this.body, model);
    };

    RobotWUzyciu.prototype.set_trace_color = function (robot, color) {
        RUR._UR.set_trace_color_(robot, color);
    };

    RobotWUzyciu.prototype.set_trace_style = function (robot, style) {
        RUR._UR.set_trace_style_(robot, style);
    };

    RobotWUzyciu.prototype.wez = function () {
        RUR._UR.take_(this.body);
    };


    RobotWUzyciu.prototype.obrot_w_lewo = function () {
        RUR._UR.turn_left_(this.body);
    };

    RobotWUzyciu.prototype.mur_z_przodu = function () {
        return RUR._UR.wall_in_front_(this.body);
    };

    RobotWUzyciu.prototype.mur_po_prawej = function () {
        return RUR._UR.wall_on_right_(this.body);
    };

    // make prototype available with known English name in RUR namespace
    RUR.UsedRobot = RobotWUzyciu;

};

},{"./../rur.js":44,"./../world_api/robot.js":83,"./commands.js":26}],37:[function(require,module,exports){
require("./../rur.js");
require("./commands.js");
require("./../world_api/robot.js");

/* See reeborg_en.js for an explanation about the purpose of this file. */

RUR.reset_definitions_pt = function () {

    window.chegou = RUR._at_goal_;
    window.frente_esta_livre = RUR._build_wall_;
    window.carrega_objeto = RUR._carries_object_;
    window.cor_aqui = RUR._color_here_;
    window.standard_roboter = function () {
        var r = Object.create(UsedRobot.prototype);
        r.body = RUR._default_robot_body_();
        return r;
    };
    window.help_js = RUR._inspect_;
    window.pronto = RUR._done_;
    window.frente_esta_livre = RUR._front_is_clear_;
    window.virado_norte = RUR._is_facing_north_;
    window.mover = RUR._move_;
    window.novo_Robo_imagens = RUR._new_robot_images_;
    window.objeto_aqui = RUR._object_here_;
    window.pausar = RUR._pause_;
    window.pintar_quadrado = RUR._paint_square_;
    window.coordenadas = function () {
        var body = RUR._default_robot_body_();
        return [body.x, body.y];
    };
    window.dar_coordenadas = function () {
        var pos, body = RUR._default_robot_body_();
        pos = RUR.get_position_in_front(body);
        if (RUR.is_valid_position(pos["x"], pos["y"])) {
            return [pos["x"], pos["y"]];}
        else {
            return undefined;
        }
    };
    window.imprimir_html = RUR._print_html_;
    window.colocar = RUR._put_;
    window.gerar = RUR._toss_;
    window.gravar = RUR._recording_;
    window.remover_robô = RUR._remove_robots_;
    window.direita_esta_livre = RUR._right_is_clear_;
    window.definir_max_passos = RUR._set_max_nb_steps_;
    window.definir_cor_linha = RUR._set_trace_color_;
    window.som = RUR._sound_;
    window.pegar = RUR._take_;
    window.pensar = RUR._think_;
    window.virar_esquerda = RUR._turn_left_;
    window.parede_a_frente = RUR._wall_in_front_;
    window.parede_a_direita = RUR._wall_on_right_;
    window.salvar = RUR._write_;
    window.salvar_sobre = RUR._write_ln;
    window.criarMenu = RUR._MakeCustomMenu_;
    window.MakeCustomMenu = RUR._MakeCustomMenu_;
    window.Mundo = RUR._World_;


    var UsedRobot = window.UsedRobot = function (x, y, orientation, tokens)  {
        this.body = RUR.robot.create_robot(x, y, orientation, tokens);
        RUR.add_robot(this.body);
    };

    UsedRobot.prototype.chegou = function () {
        return RUR._UR.at_goal_(this.body);
    };

    UsedRobot.prototype.construir_parede = function () {
        RUR._UR.build_wall_(this.body);
    };

    UsedRobot.prototype.carrega_objeto = function () {
        return RUR._UR.carries_object_(this.body);
    };

    UsedRobot.prototype.cor_aqui = UsedRobot.prototype.color_here;

    UsedRobot.prototype.frente_esta_livre = function () {
        return RUR._UR.front_is_clear_(this.body);
    };

    UsedRobot.prototype.virado_norte = function () {
        return RUR._UR.is_facing_north_(this.body);
    };

    UsedRobot.prototype.mover = function () {
        RUR._UR.move_(this.body);
    };

    UsedRobot.prototype.objeto_aqui = function (obj) {
        return RUR._UR.object_here_(this.body, obj);
    };

    UsedRobot.prototype.pintar_quadrado = function (color) {
        RUR._UR.paint_square_(color, this.body);
    };

    UsedRobot.prototype.coordenadas = function () {
        return [this.body.x, this.body.y];
    };

    UsedRobot.prototype.dar_coordenadas = function () {
        pos = RUR.get_position_in_front(this.body);
        if (RUR.is_valid_position(pos["x"], pos["y"])) {
            return [pos["x"], pos["y"]];
        }
        else {
            return undefined;
        }
    };

    UsedRobot.prototype.colocar = function () {
        RUR._UR.put_(this.body);
    };
    UsedRobot.prototype.gerar = function () {
        RUR._UR.toss_(this.body);
    };

    UsedRobot.prototype.direita_esta_livre = function () {
        return RUR._UR.right_is_clear_(this.body);
    };

    UsedRobot.prototype.definir_modelo = function(model) {
        RUR._UR.set_model_(this.body, model);
    };

    UsedRobot.prototype.definir_cor_linha = function (robot, color) {
        RUR._UR.set_trace_color_(robot, color);
    };

    UsedRobot.prototype.definir_estilo_linha = function (robot, style) {
        RUR._UR.set_trace_style_(robot, style);
    };

    UsedRobot.prototype.pegar = function () {
        RUR._UR.take_(this.body);
    };


    UsedRobot.prototype.virar_esquerda = function () {
        RUR._UR.turn_left_(this.body);
    };

    UsedRobot.prototype.parede_a_frente = function () {
        return RUR._UR.wall_in_front_(this.body);
    };

    UsedRobot.prototype.parede_a_direita = function () {
        return RUR._UR.wall_on_right_(this.body);
    };

    // make prototype available with known English name in RUR namespace
    RUR.UsedRobot = UsedRobot;
};
},{"./../rur.js":44,"./../world_api/robot.js":83,"./commands.js":26}],38:[function(require,module,exports){

require("./../rur.js");
require("./../programming_api/exceptions.js");
require("./../playback/show_immediate.js");
require("./../utils/supplant.js");
var identical = require("./../utils/identical.js").identical;

function update_trace_history() {
    var robot, world = RUR.get_current_world();
    if (world.robots !== undefined){
        for (robot of world.robots) { // jshint ignore:line
            update_robot_trace_history(robot);
        }
    }
}

update_robot_trace_history = function (robot) {
    var offset, prev_offset, trace_segment={}, prev_trace_segment;
    // if we keep track of the trace during world editing tests,
    // it can end up saving a world with a trace history
    // defined.
    if (RUR.state.editing_world) {
        robot._trace_history = [];
        return;
    }
    if (robot._prev_x == robot.x &&
        robot._prev_y == robot.y &&
        robot._prev_orientation == robot._orientation) {
            return;
        }

    if (robot._trace_style == "invisible" || !robot._is_leaky) {
        trace_segment["color"] = "rgba(0,0,0,0)";
    } else {
        trace_segment["color"] = robot._trace_color;
    }

    offset = [[30, 30], [30, 20], [20, 20], [20, 30]];

    if(RUR.get_current_world().small_tiles) {
        offset = [[12, 12], [12, 12], [12, 12], [12, 12]];
        trace_segment["thickness"] = 2;  
    } else if (robot._trace_style === "thick") {
        offset = [[25, 25], [25, 25], [25, 25], [25, 25]];
        trace_segment["thickness"] = 4;
    }  else if (robot._trace_style === "default") {
        trace_segment["thickness"] = 2;
    } // else, invisible and we do not care.

    prev_offset = offset[robot._prev_orientation%4];
    offset = offset[robot._orientation%4];

    trace_segment["prev_x"] = robot._prev_x * RUR.WALL_LENGTH + prev_offset[0];
    trace_segment["x"] = robot.x * RUR.WALL_LENGTH + offset[0];
    trace_segment["prev_y"] = RUR.HEIGHT - (robot._prev_y+1) * RUR.WALL_LENGTH + prev_offset[1];
    trace_segment["y"] = RUR.HEIGHT - (robot.y+1) * RUR.WALL_LENGTH + offset[1];
    // the following are not required for drawing but may be used by a world
    // creator to confirm that the correct path is being followed.
    // See RUR.print_path and other functions in path_utils.js
    trace_segment["grid_x"] = robot.x;
    trace_segment["grid_y"] = robot.y;

    if (robot._trace_history.length > 0) {
        prev_trace_segment = robot._trace_history[robot._trace_history.length-1];
        if (identical(prev_trace_segment, trace_segment)) {
            return;
        }
    }

    robot._trace_history.push(trace_segment);
};


RUR.record_frame = function (name, obj) {
    "use strict";
    var py_err, frame = {}, prev_frame;

    if (RUR.nb_frames > 0) {
        prev_frame = RUR.frames[RUR.nb_frames-1];
    }

    /* TODO: Document RUR.frame_insertion and put a link here.    */

    if (name !== "highlight" && RUR.frame_insertion !== undefined && !RUR.state.frame_insertion_called){
        // avoid recursive calls as this would make it too difficult
        // to use frame_insertion
        if (name === undefined) {
            name = "RUR.record_frame: missing first argument";
        }
        if (obj === undefined) {
            obj = "RUR.record_frame: missing second argument";
        }
        RUR.state.frame_insertion_called = true;
        if (RUR.state.programming_language === "python") {
            py_err = RUR.frame_insertion(name, obj);
            RUR.state.frame_insertion_called = false;
            if (py_err && py_err.__name__) {
                if (RUR[py_err.__name__] !== undefined) {
                    throw new RUR[py_err.__name__](py_err.reeborg_shouts);
                } else {
                    throw new RUR.ReeborgError(py_err.__name__);
                }
            }
        } else {
            try {
                RUR.frame_insertion(name, obj); // may throw an error
            } finally {
                RUR.state.frame_insertion_called = false;
            }
        }
    }

// TODO: document a test that would fail if we were to remove the condition
// name!="error" below -- this addition was done by
// 1. turning off recording
// 2. doing stuff ... including something that should have raised an error
// 3. resuming recording.
// The program stopped, but no error was shown.

    if (RUR.state.input_method==="py-repl") {
        /* if the REPL is active, we do not record anything, and show
           immediately the updated world. */
        update_trace_history();
        return RUR._show_immediate(name, obj);
    } else if ((RUR.state.do_not_record || RUR.state.prevent_playback) && name != "error") {
        return;
    } else if (name == "watch_variables" && prev_frame !== undefined && prev_frame.highlight === undefined) {
        /* Watched variables are appended to previous frame so as to avoid
          generating too many extra frames. */
        prev_frame["watch_variables"] = obj;
        return;
    }

    update_trace_history();
    frame.world_map = RUR.world_map();

    if (name && obj) {
        frame[name] = obj;
    } else if (name) {
        frame[name] = true;
    } else {
        frame["no name"] = true;
    }

    frame.delay = RUR.PLAYBACK_TIME_PER_FRAME;
    if (RUR.state.sound_id && RUR.state.sound_on && frame.delay >= RUR.MIN_TIME_SOUND) {
        frame.sound_id = RUR.state.sound_id;
    }

/* In an earlier version, we only recorded values to RUR.rec_line_numbers if
Python was selected and RUR.state.highlight was set to true. However,
in order to avoid recording frames when nothing changed (no world state change,
no change in the line being highlighted), the logic became rather convoluted.

This new version always record a value for RUR.current_line_no; a valid value
is an array of consecutive line numbers, like [2, 3, 4]. If highlighting is
is not performed, we just set this to a string value "ignore" as a "code comment";
with highlihting turned off, during playback, the content of RUR.rec_line_numbers
will be ignored no matter what its content is.
*/

    if (RUR.state.programming_language === "python" && RUR.state.highlight) {
        if (RUR.current_line_no === undefined) {
            RUR.current_line_no = [0];
        }
        if (RUR.nb_frames > 0){
            // avoid logging frames if nothing changed
            if (identical(prev_frame, frame) &&
                RUR.rec_line_numbers [RUR.nb_frames-1] == RUR.current_line_no) {
                    return;
            } else if (frame.highlight !== undefined && prev_frame.highlight === undefined){
                //RUR.rec_line_numbers [RUR.nb_frames-1] = RUR.current_line_no;
                prev_frame.highlight = frame.highlight;
                return;
            }
        } else {
            RUR.rec_line_numbers[0] = RUR.current_line_no;
        }
    }

    RUR.frames[RUR.nb_frames] = frame;
    RUR.nb_frames++;
    RUR.state.sound_id = undefined;
    if (name === "error"){
        RUR.state.error_recorded = true;
        return;
    }

    if (RUR.nb_frames > RUR.MAX_STEPS) {
        throw new RUR.ReeborgError(RUR.translate("Too many steps:").supplant({max_steps: RUR.MAX_STEPS}));
    }
};


},{"./../playback/show_immediate.js":24,"./../programming_api/exceptions.js":28,"./../rur.js":44,"./../utils/identical.js":65,"./../utils/supplant.js":71}],39:[function(require,module,exports){

require("./../rur.js");
require("./../drawing/visible_world.js");
require("./../world_get/world_get.js");
require("./../translator.js");
require("./../programming_api/exceptions.js");
require("./../ui/pause.js");
require("./../ui/stop.js");
require("./../ui/user_progress.js");
require("./../playback/play_sound.js");
require("./../editors/create.js");
require("./../recorder/record_frame.js");

var identical = require("./../utils/identical.js").identical;

RUR.rec = {};

RUR.set_lineno_highlight = function(lineno) {
    RUR.current_line_no = lineno;
    if (RUR.current_line_no != RUR.prev_line_no) {
        RUR.record_frame("highlight", lineno);
    }
    RUR.prev_line_no = RUR.current_line_no;
    return true;
};

function update_editor_highlight(frame_no) {
    "use strict";
    var i, frame;

    frame = RUR.frames[frame_no];
    if (frame !== undefined && frame.highlight !== undefined) {
        for (i=0; i < editor.lineCount(); i++){
            editor.removeLineClass(i, 'background', 'editor-highlight');
        }
        for(i=0; i < frame.highlight.length; i++){
            editor.addLineClass(frame.highlight[i], 'background', 'editor-highlight');
        }
    }
}

RUR.rec.display_frame = function () {
    // set current world to frame being played.
    "use strict";
    var frame;

    $("#thought").hide();

    if (RUR.current_frame_no >= RUR.nb_frames) {
        RUR.update_frame_nb_info();
        if (RUR.state.error_recorded) {
            return;
        }
        return RUR.rec.conclude();
    }

    frame = RUR.frames[RUR.current_frame_no];
    RUR.update_frame_nb_info();
    if ((RUR.state.programming_language === "python" && RUR.state.highlight)) {
        update_editor_highlight(RUR.current_frame_no);
    }
    RUR.current_frame_no++;

    if (frame === undefined){
        RUR.vis_world.refresh();
        return;
    }

    // many of the following if statements are exlusive of others ...
    // but to give more flexibility
    // in adding options (and prevent bugs!!), we do not use an
    // if/else if/... structure, but rather a series of if clauses
    // unless it is clear that they are completely independent

    if (frame.delay !== undefined){
        RUR.PLAYBACK_TIME_PER_FRAME = frame.delay;
    }

    if (frame.pause) {
        RUR.pause(frame.pause.pause_time);
        return "pause";
    } else if (frame.error !== undefined) {
        RUR.set_current_world(frame.world_map, true);
        RUR.vis_world.refresh();
        return RUR.rec.handle_error(frame);
    }

    if (frame.stdout !== undefined) {
        if (frame.stdout.clear) { // for clearprint
            $(frame.stdout.element).html('');
        } else {
            $(frame.stdout.element).append(frame.stdout.message);
        }
        $("#Reeborg-writes").dialog("open");
    }

    if (frame.print_html !== undefined) {
        if (frame.print_html.append){
            $(frame.print_html.element).append(frame.print_html.message);
        } else {
            $(frame.print_html.element).html(frame.print_html.message);
        }
        $("#Reeborg-proclaims").dialog("open");
    }

    if (frame.watch_variables !== undefined) {
        $(frame.watch_variables.element).html(frame.watch_variables.message);
        $("#Reeborg-watches").dialog("open");
    }

    RUR.set_current_world(frame.world_map, true);

    if (frame.sound_id !== undefined){
        RUR._play_sound(frame.sound_id);
    }
    RUR.vis_world.refresh();
};

RUR.rec.conclude = function () {
    var frame, goal_status;

    if (RUR.nb_frames > 0) {
        frame = RUR.frames[RUR.nb_frames-1];
    }
    if (frame === undefined) {
        frame = {};
        frame.world_map = RUR.world_map();
    }
    if (frame.world_map.goal !== undefined){
        goal_status = RUR.rec.check_goal(frame);
        if (goal_status.success) {
            RUR.update_progress();
            if (RUR.state.sound_on) {
                RUR._play_sound("#success-sound");
            }
            if (RUR.success_custom_message !== undefined) {
                RUR.show_feedback("#Reeborg-concludes", RUR.success_custom_message);
            } else {
                RUR.show_feedback("#Reeborg-concludes", goal_status.message);
            }
        } else {
            if (RUR.state.sound_on) {
                RUR._play_sound("#error-sound");
            }
            if (RUR.failure_custom_message !== undefined) {
                RUR.show_feedback("#Reeborg-shouts", RUR.failure_custom_message);
            } else {
                RUR.show_feedback("#Reeborg-shouts", goal_status.message);
            }
        }
    } else {
        RUR.update_progress();
        if (RUR.state.sound_on) {
            RUR._play_sound("#success-sound");
        }

        if (RUR.success_custom_message !== undefined) {
            RUR.show_feedback("#Reeborg-concludes", RUR.success_custom_message);
        } else {
            RUR.show_feedback("#Reeborg-concludes",
                             "<p class='center'>" +
                             RUR.translate("Last instruction completed!") +
                             "</p>");
        }
    }
    RUR.stop();
    return "stopped";
};

RUR.rec.handle_error = function (frame) {
    "use strict";
    if (frame.error.reeborg_shouts === RUR.translate("Done!")){
        if (frame.world_map.goal !== undefined){
            return RUR.rec.conclude();
        } else{
            if (RUR.state.sound_on) {
                RUR._play_sound("#success-sound");
            }
            RUR.show_feedback("#Reeborg-concludes",
                RUR.translate("<p class='center'>Instruction <code>done()</code> executed.</p>"));
        }
    } else if (frame.error.name == "ReeborgOK") {
        RUR.show_feedback("#Reeborg-concludes",
                             "<p class='center'>" +
                             frame.error.message +
                             "</p>");
    } else {
        if (RUR.state.sound_on) {
            RUR._play_sound("#error-sound");
        }
        RUR.show_feedback("#Reeborg-shouts", frame.error.message);
    }
    RUR.stop();
    return "stopped";
};

RUR.rec.check_current_world_status = function() {
    // this function is to check goals from the Python console.
    "use strict";
    var frame = {}, goal_status;
    frame.world_map = RUR.get_current_world();
    if (frame.world_map.goal === undefined){
        if (RUR.success_custom_message !== undefined) {
            RUR.show_feedback("#Reeborg-concludes", RUR.success_custom_message);
        } else {
            RUR.show_feedback("#Reeborg-concludes",
                             "<p class='center'>" +
                             RUR.translate("Last instruction completed!") +
                             "</p>");
        }
    } else {
        goal_status = RUR.rec.check_goal(frame);
        if (goal_status.success) {
            RUR.show_feedback("#Reeborg-concludes", goal_status.message);
        } else {
            RUR.show_feedback("#Reeborg-shouts", goal_status.message);
        }
    }
};

RUR.rec.check_goal = function (frame) {
    var g, world, goal_status = {"success": true}, result;

    g = frame.world_map.goal;
    if (g === undefined) {   // This is only needed for some functional tests
        return goal_status;  // which call check_goal directly
    } else if (Object.keys(g).length === 0) { // no real goal to check
        if (RUR.success_custom_message !== undefined) {
            goal_status.message =  RUR.success_custom_message;
        } else {
            goal_status.message = "<p class='center'>" +
                     RUR.translate("Last instruction completed!") +
                     "</p>";
        }
        return goal_status;
    }

    world = frame.world_map;
    goal_status.message = "<ul>";
    if (g.position !== undefined){
        if (g.position.x === world.robots[0].x){
            goal_status.message += RUR.translate("<li class='success'>Reeborg is at the correct x position.</li>");
        } else {
            goal_status.message += RUR.translate("<li class='failure'>Reeborg is at the wrong x position.</li>");
            goal_status.success = false;
        }
        if (g.position.y === world.robots[0].y){
            goal_status.message += RUR.translate("<li class='success'>Reeborg is at the correct y position.</li>");
        } else {
            goal_status.message += RUR.translate("<li class='failure'>Reeborg is at the wrong y position.</li>");
            goal_status.success = false;
        }
    }
    if (g.pushables !== undefined) {
        result = identical(g.pushables, world.pushables, true);
        if (result){
            goal_status.message += RUR.translate("<li class='success'>All objects are at the correct location.</li>");
        } else {
            goal_status.message += RUR.translate("<li class='failure'>One or more objects are not at the correct location.</li>");
            goal_status.success = false;
        }
    }

    if (g.objects !== undefined) {
        result = identical(g.objects, world.objects, true);
        if (result){
            goal_status.message += RUR.translate("<li class='success'>All objects are at the correct location.</li>");
        } else {
            goal_status.message += RUR.translate("<li class='failure'>One or more objects are not at the correct location.</li>");
            goal_status.success = false;
        }
    }
    if (g.walls !== undefined) {
        result = true;
        loop:
        for(var w in g.walls){
            for(var i=0; i < g.walls[w].length; i++){
                if ( !(world.walls !== undefined &&
                       world.walls[w] !== undefined &&
                       world.walls[w].indexOf(g.walls[w][i]) !== -1)){
                    result = false;
                    break loop;
                }
            }
        }
        if (result){
            goal_status.message += RUR.translate("<li class='success'>All walls have been built correctly.</li>");
        } else {
            goal_status.message += RUR.translate("<li class='failure'>One or more walls missing or built at wrong location.</li>");
            goal_status.success = false;
        }
    }
    goal_status.message += "</ul>";
    if (goal_status.message == "<ul></ul>") { // there was no goal to check
        if (RUR.success_custom_message !== undefined) {
            goal_status.message =  RUR.success_custom_message;
        } else {
            goal_status.message = "<p class='center'>" +
                     RUR.translate("Last instruction completed!") +
                     "</p>";
        }       
    }
    return goal_status;
};

},{"./../drawing/visible_world.js":10,"./../editors/create.js":11,"./../playback/play_sound.js":23,"./../programming_api/exceptions.js":28,"./../recorder/record_frame.js":38,"./../rur.js":44,"./../translator.js":46,"./../ui/pause.js":54,"./../ui/stop.js":59,"./../ui/user_progress.js":62,"./../utils/identical.js":65,"./../world_get/world_get.js":86}],40:[function(require,module,exports){
require("./../rur.js");
require("./../editors/create.js"); // to ensure editor is defined
require("./../world_utils/import_world.js"); // for process_onload
require("./../drawing/visible_robot.js"); // for RUR.reset_default_robot_images

RUR.reset_world = function() {
    var i;
    RUR.reset_pre_run_defaults();
    $("#thought").hide(); // just in case
    RUR.success_custom_message = undefined;
    RUR.failure_custom_message = undefined;

    if (RUR.state.reset_default_robot_images_needed) {
        RUR.reset_default_robot_images(); // will reset state/flag to false
    }

    try {
        RUR.update_frame_nb_info(); // slider may not be defined initially
    } catch (e) {}

    clearTimeout(RUR._TIMER);

    if (RUR.state.programming_language === "python" &&
        RUR.state.highlight) {
        for (i=0; i < editor.lineCount(); i++){
            editor.removeLineClass(i, 'background', 'editor-highlight');
        }
    }

    if (RUR.state.editing_world){
        return;
    }

    RUR.set_current_world(RUR.clone_world(RUR.WORLD_BEFORE_ONLOAD));
    RUR.world_utils.process_onload();
};

},{"./../drawing/visible_robot.js":9,"./../editors/create.js":11,"./../rur.js":44,"./../world_utils/import_world.js":88}],41:[function(require,module,exports){

require("./../rur.js");
require("./../translator.js");
require("./../programming_api/exceptions.js");
require("./../utils/validator.js");

RUR.robot = {};

RUR.robot.__ID = 1;

RUR.robot.create_robot = function (x, y, orientation, tokens) {
    "use strict";
    var saved_model, robot = {};
    robot.x = x || 1;
    robot.y = y || 1;
    robot.objects = {};
    if (tokens !== undefined){
        tokens = RUR.utils.filterInt(tokens);
        if (tokens > 0) {
            robot.objects.token = tokens;
        }
    }

    saved_model = localStorage.getItem("robot_default_model");
    if (saved_model !== undefined) {
        robot.model = saved_model;
    } else {
        robot.model = RUR.reeborg_default_model;
    }

    if (orientation === undefined){
        robot._orientation = RUR.EAST;
    } else {
        try {
            orientation = orientation.toLowerCase();
        } catch (e) {}
        switch (orientation){
        case "e":
        case RUR.translation.east:
            robot._orientation = RUR.EAST;
            break;
        case "n":
        case RUR.translation.north:
            robot._orientation = RUR.NORTH;
            break;
        case "w":
        case RUR.translation.west:
            robot._orientation = RUR.WEST;
            break;
        case "s":
        case RUR.translation.south:
            robot._orientation = RUR.SOUTH;
            break;
        case "random":
            robot._orientation = RUR.RANDOM_ORIENTATION;
            break;
        default:
            throw new RUR.ReeborgError(RUR.translate("Unknown orientation for robot."));
        }
    }
    RUR.robot.set_private_defaults(robot);

    return robot;
};

RUR.robot.set_private_defaults = function(robot) {
    robot._is_leaky = true;
    robot._prev_x = robot.x;
    robot._prev_y = robot.y;
    robot._prev_orientation = robot._orientation;

    robot._trace_history = [];
    robot._trace_style = "default";
    robot._trace_color = RUR.DEFAULT_TRACE_COLOR;
    robot.__id = assign_id();
};

/* Robot definitions in World files has changed as
   new features were added; we make sure that they are properly
   updated when needed. This should be called when a world is
   imported. */
RUR.robot.modernize = function (robot) {
    "use strict";
    var obj_name, objects_carried = {};
    // In previous version, worlds were recorded with object nb == 0;
    // we need to remove such objects with the new notation.
    // i.e.  {"token": 0} --> {}
    for (obj_name in robot.objects) {
        if (robot.objects.hasOwnProperty(obj_name)){
             if (robot.objects[obj_name] == "infinite" ||
                 robot.objects[obj_name] > 0){
                objects_carried[obj_name] = robot.objects[obj_name];
            }
        }
    }
    robot.objects = objects_carried;
    // handling legacy notation
    if (robot.orientation !== undefined){
        robot._orientation = robot.orientation;
        delete robot.orientation;
    }

    RUR.robot.set_private_defaults(robot);
};

assign_id = function () {
    RUR.robot.__ID += 1;
    return RUR.robot.__ID;
};

},{"./../programming_api/exceptions.js":28,"./../rur.js":44,"./../translator.js":46,"./../utils/validator.js":72}],42:[function(require,module,exports){

require("./../rur.js");
require("./../translator.js");
require("./../drawing/visible_world.js");
require("./../editors/update.js");
require("./../programming_api/blockly.js");
require("./../recorder/recorder.js");
require("./world_init.js");
require("./../editors/create.js");
require("./../utils/supplant.js");

RUR.runner = {};

/* A user program is evaluated when the user clicks on "run" or "step" for
   the first time and the result is stored in a series of frames.
   The playback is then done automatically (clicking on "run") or can be done
   frame by frame (clicking on "step").  When clicking on "step" repeatedly,
   we do not need to evaluate the program again, but simply to show a frame
   recorded.  The RUR.state.code_evaluated flag is used to determine if we
   only need to show a frame already recorded, or if we need to evaluate the
   program.
 */

RUR.runner.run = function (playback) {
    "use strict";
    var fatal_error_found = false, xml, xml_text;
    if (!RUR.state.code_evaluated) {
        if (RUR.state.editing_world) {
        // TODO: check that this is ok
        RUR.WORLD_AFTER_ONLOAD = RUR.clone_world(RUR.get_current_world());
        }
        RUR.set_current_world(RUR.clone_world(RUR.WORLD_AFTER_ONLOAD));
        RUR.world_init();

        if (!(RUR.state.programming_language === "python" && RUR.state.highlight) ) {
            RUR.record_frame();  // record the starting state as first frame;
            // for python with highlighting on, the first frame will be the first
            // instruction to be executed highlighted.
        }

        if (RUR.state.input_method === "blockly-py") {
            editor.setValue(Blockly.Python.workspaceToCode(RUR.blockly.workspace));
        } else if (RUR.state.input_method === "blockly-js") {
            editor.setValue(Blockly.JavaScript.workspaceToCode(RUR.blockly.workspace));
        }
        if (RUR.state.input_method === "blockly-py" ||
            RUR.state.input_method === "blockly-js") {
                xml = Blockly.Xml.workspaceToDom(RUR.blockly.workspace);
                xml_text = Blockly.Xml.domToText(xml);
                localStorage.setItem("blockly", xml_text);
        }
        fatal_error_found = RUR.runner.eval(editor.getValue()); // jshint ignore:line
    }
    $("#thought").hide();
    if (!fatal_error_found) {
        // save program so that it a new browser session can use it as
        // starting point.
        try {
            localStorage.setItem("editor", editor.getValue());
            localStorage.setItem("library", library.getValue());
        } catch (e) {}
        // "playback" is a function called to play back the code in a sequence of frames
        // or a "null function", f(){} can be passed if the code is not
        // dependent on the robot world.
        if (RUR.state.prevent_playback) {
            return;
        }
        playback();
    }
};

/* RUR.runner.eval returns true if a fatal error is found, false otherwise */
RUR.runner.eval = function(src) {  // jshint ignore:line
    "use strict";
    var message, response, other_info, error;
    other_info = '';

    /* At some point around version 3.2.0, Brython changed the way it
       handled uncaught errors, and no longer pass a "nice" object
       to the surrounding Javascript environment - since this is not
       the way Brython programmers normally do things.   While this
       has been changed back some time after version 3.2.3, we nonetheless
       guard against any future changes by doing our own handling. */

    RUR.__python_error = false;
    try {
        if (RUR.state.programming_language === "javascript") {
            RUR.runner.eval_javascript(src);
        } else if (RUR.state.programming_language === "python") {
            RUR.runner.eval_python(src);
            // This is the error handling referenced in the above comment.
            if (RUR.__python_error) {
                throw RUR.__python_error;
            }
        } else {
            alert("FATAL ERROR: Unrecognized programming language.");
            return true;
        }
    } catch (e) {
        RUR.state.code_evaluated = true;
        if (RUR.__debug){
            console.dir(e);
        }
        error = {};
        if (e.reeborg_concludes !== undefined) {  // indicates success
            error.message = e.reeborg_concludes;
            error.name = "ReeborgOK";
            if (RUR.state.prevent_playback) {
                RUR.show_feedback("#Reeborg-concludes", e.reeborg_concludes);
            } else {
                RUR.record_frame("error", error);
            }
            return false; // since success, not a fatal error.
        }
        if (RUR.state.programming_language === "python") {
            error.reeborg_shouts = e.reeborg_shouts;
            response = RUR.runner.simplify_python_traceback(e);
            message = response.message;
            other_info = response.other_info;
            error.name = response.error_name;
            let translated_error;
            translated_error = error.name;
            // if (error.name === "ReeborgError")
            translated_error = RUR.translate(message);
            error.message = "<h3>" + error.name + "</h3><p>" +
                translated_error + "</p><p>" + other_info + '</p>';
            if (RUR.state.prevent_playback) {
                RUR.show_feedback("#Reeborg-concludes", e.reeborg_concludes);
            } else {
                RUR.record_frame("error", error);
            }
            if (error.name === "ReeborgOK") return false;
            if (error.name === "ReeborgError") return false;
            if (error.name === "MissingObjectError") return false;
            if (error.name === "WallCollisionError") return false;
        } else {
            error.name = e.name;
            message = e.message;
            other_info = '';
            if (e.reeborg_shouts !== undefined) {
                error.message = e.reeborg_shouts;
                error.reeborg_shouts = e.reeborg_shouts;
            }
        }

        if (e.reeborg_shouts !== undefined){
            RUR.record_frame("error", error);
        } else {
            RUR.show_feedback("#Reeborg-shouts",
                                    "<h3>" + error.name + "</h3><p>" +
                                    RUR.translate(message) + "</p><p>" + other_info + '</p>' + RUR.add_ai_button(error));
            return true;
        }
    }
    RUR.state.code_evaluated = true;
    return false;
};

RUR.add_ai_button = function(error) {
    let button_string;
    let call = "RUR.makeRequest('ree_explanations', '" + error.message + "');";
    button_string = "<button id=\"explanation_button\" class=\"blue-gradient\" onclick=\"" + call + "\">DI paaiškinimas</button>";
    button_string += "<div id=\"AI_hints\"></div>";
    return button_string;
}

RUR.displayAIfailure = function(error) {
    document.getElementById("AI_hints").classList.remove('invisible');
    document.getElementById("AI_hints").classList.add('visible');
    document.getElementById("AI_hints").innerHTML = "<pre style='white-space: pre-wrap;'>" + error.message + "</pre>";
}

RUR.displayAIresults = function(data) {
    RUR.show_feedback("#Reeborg-shouts",
        "<h3>Paaiškinimas (nebūtinai teisingas)</h3><p>" +
        "<pre style='white-space: pre-wrap;'>" + data.choices[0].message.content + "</pre>");
    // document.getElementById("AI_hints").innerHTML = "<pre style='white-space: pre-wrap;'>" + data.choices[0].message.content + "</pre>";
}

RUR.makeRequest = function(purpose, error) {

    let baseUrl = 'https://arzinai.lt/scormAPI/';
    let editor_code = editor.getValue();
    let library_code = library.getValue();

    var postData = {
        "code" : incrs.encode(editor_code),
        "library" : incrs.encode(library_code),
        "error" : incrs.encode(error),
        "language" : 'lt'
    };

    var requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData)
    };

    document.getElementById("AI_hints").innerHTML = '';
    node = document.getElementById("loading_spinner");
    clone = node.cloneNode(true);
    document.getElementById("AI_hints").append(clone);

    let apiUrl = baseUrl + purpose;

    fetch(apiUrl, requestOptions)
        .then(response => response.json())
        .then(data => {
            RUR.displayAIresults(data);
        })
        .catch(error => {
            RUR.displayAIfailure(error);
        });

    if(purpose === "explanations") {
        document.getElementById("explanation_button").style.display = "none";
    }

    // TODO : make corrections and purpose buttons
    // if(purpose == "corrections") {
    //     document.getElementById("correction_button").style.display = "none";
    // }
    // if(purpose == "reviews") {
    //     document.getElementById("review_button").style.display = "none";
    // }
}

var incrs={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(r){var e,t,o,a,h,d,C,c="",f=0;for(r=incrs._utf8_encode(r);f<r.length;)e=r.charCodeAt(f++),t=r.charCodeAt(f++),o=r.charCodeAt(f++),a=e>>2,h=(3&e)<<4|t>>4,d=(15&t)<<2|o>>6,C=63&o,isNaN(t)?d=C=64:isNaN(o)&&(C=64),c=c+this._keyStr.charAt(a)+this._keyStr.charAt(h)+this._keyStr.charAt(d)+this._keyStr.charAt(C);return c},decode:function(r){var e,t,o,a,h,d,C,c="",f=0;for(r=r.replace(/[^A-Za-z0-9\+\/\=]/g,"");f<r.length;)a=this._keyStr.indexOf(r.charAt(f++)),h=this._keyStr.indexOf(r.charAt(f++)),d=this._keyStr.indexOf(r.charAt(f++)),C=this._keyStr.indexOf(r.charAt(f++)),e=a<<2|h>>4,t=(15&h)<<4|d>>2,o=(3&d)<<6|C,c+=String.fromCharCode(e),64!=d&&(c+=String.fromCharCode(t)),64!=C&&(c+=String.fromCharCode(o));return incrs._utf8_decode(c)},_utf8_encode:function(r){r=r.replace(/\r\n/g,"\n");for(var e="",t=0;t<r.length;t++){var o=r.charCodeAt(t);o<128?e+=String.fromCharCode(o):o>127&&o<2048?(e+=String.fromCharCode(o>>6|192),e+=String.fromCharCode(63&o|128)):(e+=String.fromCharCode(o>>12|224),e+=String.fromCharCode(o>>6&63|128),e+=String.fromCharCode(63&o|128))}return e},_utf8_decode:function(r){for(var e="",t=0,o=c1=c2=0;t<r.length;)(o=r.charCodeAt(t))<128?(e+=String.fromCharCode(o),t++):o>191&&o<224?(e+=String.fromCharCode((31&o)<<6|63&(c2=r.charCodeAt(t+1))),t+=2):(e+=String.fromCharCode((15&o)<<12|(63&(c2=r.charCodeAt(t+1)))<<6|63&(c3=r.charCodeAt(t+2))),t+=3);return e}}

RUR.runner.eval_javascript = function (src) {
    // do not "use strict"
    var pre_code, post_code;
    pre_code = pre_code_editor.getValue();
    post_code = post_code_editor.getValue();
    RUR.reset_definitions();
    src = pre_code + "\n" + src + "\n" + post_code;
    try {
        eval(src); // jshint ignore:line
    } catch (e) {
        if (RUR.state.done_executed){
            eval(post_code); // jshint ignore:line
        }
        throw e;// throw original message from Done if nothing else is raised
    } 
};


RUR.runner.eval_python = function (src) {
    // do not  "use strict"
    var pre_code, post_code;
    RUR.reset_definitions();
    pre_code = pre_code_editor.getValue();
    post_code = "\n" + post_code_editor.getValue();
    translate_python(src, RUR.state.highlight, RUR.state.watch_vars, pre_code, post_code);
};

RUR.runner.simplify_python_traceback = function(e) {
    "use strict";
    var message, error_name, other_info, diagnostic, parts;
    other_info = '';
    if (e.reeborg_shouts === undefined) {
        message = e.args[0];
        error_name = e.__name__ || e.__class__.__name__;
        diagnostic = '';
        switch (error_name) {
            case "SyntaxError":
                try {
                    other_info = RUR.runner.find_line_number(e.args[4]);
                    if (RUR.runner.check_colons(e.args[4])) {
                        other_info += RUR.translate("<br>Perhaps a missing colon is the cause.");
                    } else if (RUR.runner.check_func_parentheses(e.args[4])){
                        other_info += RUR.translate("<br>Perhaps you forgot to add parentheses ().");
                    } else {
                        console.log(e.args);
                    }
                    try {
                        other_info = "<pre class='error'>" + e.args[4] + "</pre>" + other_info;
                    } catch (e1) {
                        console.log("error in simplifying traceback: ", e1);
                    }
                } catch (e2) { // jshint ignore:line
                    other_info = "I could not analyze this error; you might want to contact my programmer with a description of this problem.";
                    console.log("error in simplifying traceback: ", e2);
                }
                break;
            case "IndentationError":
                message = RUR.translate("The code is not indented correctly.");
                try {
                    other_info = RUR.runner.find_line_number(e.args[4]);
                    if (e.args[4].indexOf("RUR.set_lineno_highlight([") == -1){
                        other_info = "<pre class='error'>" + e.args[4] + "</pre>" + other_info;
                    } else if (RUR.state.highlight) {
                        other_info += "Try turning off syntax highlighting; if this fixes the problem, please file a bug.";
                    }
                } catch (e1) {  // jshint ignore:line
                    if (RUR.state.highlight) {
                        other_info += "Try turning off syntax highlighting; if this fixes the problem, please file a bug.";
                    } else {
                        other_info = "I could not analyze this error; you might want to contact my programmer with a description of this problem.";
                        other_info = "<pre class='error'>" + e.args[4] + "</pre>" + other_info;
                    }
                }
                break;
            case "NameError":
                try {
                    parts = message.split("'");
                    if (parts.length == 3 && parts[0] == "name " && parts[2] == " is not defined" ) {
                        message = parts[1];
                        other_info = RUR.runner.find_line_number(message);
                        other_info += RUR.translate("<br>Perhaps you misspelled a word or forgot to define a function or a variable.");
                    }
                } catch (e1) {  // jshint ignore:line
                    other_info = "I could not analyze this error; you might want to contact my programmer.";
                }
                break;
            case "Internal Javascript error: SyntaxError":
            case "Internal Javascript error: TypeError":
                error_name = "Invalid Python Code - " + error_name;
                console.log(e.args);
                message = '';
                other_info = RUR.translate("I cannot help you with this problem.");
                break;
            default:
                other_info = "";
        }
    } else {
        message = e.reeborg_shouts;
        if (e.__name__ === undefined) {
            error_name = "ReeborgError";
        } else {
            error_name = e.__name__;
        }
    }
    return {message:message, other_info:other_info, error_name:error_name};
};


RUR.runner.find_line_number = function(bad_code) {
    /** With the possibility of having code inserted by the highlighting routine,
        with some pre-code, and with Brython not counting empty lines at the
        beginning of a program, it is more reliable to scan the source code
        for the offending code as identified by Brython and see if it occurs
        only once in the user's program */

    var lines, lineno;
    if (bad_code.indexOf("RUR.set_lineno_highlight([") != -1){
        bad_code = bad_code.replace("RUR.set_lineno_highlight([", "");
        lines = bad_code.split("]");
        lineno = lines[0] + 1;
        return RUR.translate("Error found at or near line {number}.").supplant({number: lineno.toString()});
    }
    lines = editor.getValue().split("\n");
    for (lineno=0; lineno<lines.length; lineno++) {
        if(lines[lineno].indexOf(bad_code) != -1){
            return RUR.translate(
                    "Error found at or near line {number}.").supplant(
                        {number: (lineno+1).toString()});
        }
    }
    return '';
};


RUR.runner.check_colons = function(line_of_code) {
    "use strict";
    var tokens, nb_token;
    tokens = ['if ', 'if(', 'else', 'elif ','elif(','while ','while(',
              'for ','for(', 'def '];
    for (nb_token=0; nb_token < tokens.length; nb_token++){
        if (line_of_code.indexOf(tokens[nb_token]) != -1){
            if (line_of_code.indexOf(":") == -1){
                return true;    // missing colon
            }
        }
    }
    return false;  // no missing colon
};

RUR.runner.check_func_parentheses = function(line_of_code) {
    if (line_of_code.indexOf('def') != -1){
        if (line_of_code.indexOf("(") == -1){
            return true;    // missing parentheses
        }
    }
    return false;  // no missing parentheses
};

},{"./../drawing/visible_world.js":10,"./../editors/create.js":11,"./../editors/update.js":12,"./../programming_api/blockly.js":25,"./../recorder/recorder.js":39,"./../rur.js":44,"./../translator.js":46,"./../utils/supplant.js":71,"./world_init.js":43}],43:[function(require,module,exports){
require("./../drawing/visible_world.js");
require("./../rur.js");

// Returns a random integer between min and max (both included)
randint = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


/** @function world_init
 * @memberof RUR
 * @instance
 * @summary This function is called automatically just before a program is run.
 * It identifies which objects (including goals) are initially assigned unknown
 * random values, and assigns the required values.  A world creator should
 * never need to call this function.
 *
 */
RUR.world_init = function () {
    "use strict";
    var coords, i, obj, objects, objects_here, nb, range, robot;
    var position, goal, total_nb_objects = {};
    var world = RUR.get_current_world();

   // First, deal with objects

    if (world.objects !== undefined){
        objects = world.objects;
        for (coords in objects){
            if (objects.hasOwnProperty(coords)){
                objects_here = objects[coords];
                for (obj in objects_here){
                    if (objects_here.hasOwnProperty(obj)){
                        nb = objects_here[obj];
                        if (nb.toString().indexOf("-") != -1){
                            range = nb.split("-");
                            nb = randint(parseInt(range[0], 10), parseInt(range[1], 10));
                            if (nb !== 0){
                                objects_here[obj] = nb;
                            } else {
                                delete objects_here[obj];
                            }
                        }
                        if (total_nb_objects[obj] === undefined){
                            if (parseInt(nb, 10) !== 0) {
                                total_nb_objects[obj] = parseInt(nb, 10);
                            }
                        } else {
                            total_nb_objects[obj] += parseInt(nb, 10);
                        }
                    }
                }
                if (Object.keys(world.objects[coords]).length === 0){
                    delete world.objects[coords];
                }
            }
        }
    }

    // then look for "goals" with "all" as value;

    if (world.goal !== undefined &&
        world.goal.objects !== undefined){
        objects = world.goal.objects;
        for (coords in objects){
            if (objects.hasOwnProperty(coords)){
                objects_here = objects[coords];
                for (obj in objects_here){
                    if (objects_here.hasOwnProperty(obj)){
                        nb = objects_here[obj];
                        if (nb == "all") {
                            try {
                                if (total_nb_objects[obj] !== undefined) {
                                    objects_here[obj] = total_nb_objects[obj];
                                } else {
                                    delete objects[coords][obj];
                                }
                            } catch (e) {
                                $("#world-info-button").click();
                                $("#World-info").html("<b>Warning</b> Trying to assign a goal when no corresponding objects are found in the world.");
                            }
                        }
                    }
                }
                if (Object.keys(world.goal.objects[coords]).length === 0){
                    delete world.goal.objects[coords];
                }
            }
        }
    }

    // next, initial position for robot
    // we can have many robots, with randomly chosen positions
    if (world.robots !== undefined && world.robots.length >= 1){
        for (i=0; i < world.robots.length; i++){
            robot = world.robots[i];
            if (robot.possible_initial_positions !== undefined) {
                position = robot.possible_initial_positions[randint(0, robot.possible_initial_positions.length-1)];
                robot.x = position[0];
                robot.y = position[1];
                robot._prev_x = robot.x;
                robot._prev_y = robot.y;
                delete robot.possible_initial_positions;
            }
            if (robot._orientation == RUR.RANDOM_ORIENTATION){
                robot._orientation = randint(0, 3);
                robot._prev_orientation = robot._orientation;
            }
            robot.initial_position = [robot.x, robot.y]; // used for RUR.check_path
        }
    }
    if (world.goal !== undefined &&
        world.goal.possible_final_positions !== undefined &&
        world.goal.possible_final_positions.length > 1) {
        goal = world.goal;
        position = goal.possible_final_positions[randint(0, goal.possible_final_positions.length-1)];
        goal.position.x = position[0];
        goal.position.y = position[1];
        delete goal.possible_final_positions;
    }
    RUR.vis_world.draw_all(); // draw_all instead of refresh in case
                              // small_tiles was set in the meantime
};

},{"./../drawing/visible_world.js":10,"./../rur.js":44}],44:[function(require,module,exports){
/** @namespace RUR
 * @desc The namespace reserved for all the Reeborg World methods.
 * All the method documented here **must** be prefixed by `RUR`.
 *
 * When a `name` must be specified, and your language is set
 * to something else than English (currently only French is fully supported; and Korean
 * is mostly supported for object names), you should specify the French (or Korean) name.
 * Internally, the names are converted into English and missing translations are
 * ignored so you might get away with using English names.
 *
 * To see what name to use, execute `RUR.show_all_things()` and see if a translated
 * name exists for the language Reeborg's World is currently using.
 *
 * _Si vous utilisez l'interface française, il est recommandé de spécifier le nom
 * des "choses" en français._
 */

window.RUR = RUR || {}; // RUR should be already defined in the html file;
                        // however, it might not when running tests.

/* In order to make it easier to have a version of Reeborg's World
   installed on different servers, or from different location with
   respect to the base directory, we use RUR.BASE_URL as global variables that
   is used to obtain the relative path to use when loading various
   files elsewhere */
var pathname;
try {
    pathname = window.location.pathname;  // not defined for unit tests
    if (pathname.indexOf("qunit") !== -1 ){  // running integration/qunit test
        RUR.BASE_URL = '../..';
    } else {
        RUR.BASE_URL = window.location.pathname.substr(0, window.location.pathname.lastIndexOf('/'));
    }
} catch (e) {
    RUR.BASE_URL = '';
}


/*========================================================
  Namespaces
==========================================================*/

RUR.initial_defaults = {};
RUR.listeners = {};
RUR.utils = {};
RUR.world_utils = {};
RUR.UnitTest = {}; // used to provide links to function mused for unit tests
RUR.state = {};    /* Reeborg's World can be in different states
                      (running a program, editing a world, etc.) and the
                      behaviour of some features can be affected (
                      e.g. enabled or disabled) depending on that state.*/
RUR.public = {}; // To be used by world creators.


/*========================================================
  Global containers

  These are never reset; they only grow
==========================================================*/

RUR.THINGS = {}; // something which can be drawn, like "token"
RUR.KNOWN_THINGS = []; // keeping track of their names only
RUR.KNOWN_ROBOT_MODELS = [];
RUR.CANVASES = []; // html canvases ...
RUR.ALL_CTX = [];  // and their corresponding 2d context

/*========================================================
  Constants
==========================================================*/

RUR.EAST = 0;
RUR.NORTH = 1;
RUR.WEST = 2;
RUR.SOUTH = 3;
RUR.RANDOM_ORIENTATION = -1;
RUR.TILE_SIZE = RUR.DEFAULT_WALL_LENGTH = 40;
RUR.DEFAULT_WALL_THICKNESS = 4;
RUR.COORDINATES_COLOR = "black";
RUR.AXIS_LABEL_COLOR = "brown";
RUR.DEFAULT_TRACE_COLOR = "seagreen";
RUR.MAX_X_DEFAULT = 14; // These two values are used in the dialog used to resize
RUR.MAX_Y_DEFAULT = 12; // a world, hard-coded in the html dialog #dialog-set-dimensions.
RUR.END_CYCLE = "end cycle"; // for animated images

RUR.CHECKMARK = " ✓🤖"; // do not add multiple spaces; they are irrelevant for
// the display and prevent strip_checkmark from working correctly in all cases.

// The following are editors (content) that can be part of a world.
RUR.WORLD_EDITORS = ["description", "editor", "library", "pre", "post", "onload"];

/*========================================================
  World constants

  These can take different values based on world definition,
  but are otherwise constant within a given world.
==========================================================*/

RUR.USE_SMALL_TILES = false;
// The non-default values below can be cut in half when using worlds with small tiles.
RUR.SCALE = 1;
RUR.WALL_LENGTH = RUR.DEFAULT_WALL_LENGTH;
RUR.WALL_THICKNESS = RUR.DEFAULT_WALL_THICKNESS;

RUR.CURRENT_WORLD = null; // needs to be created explicitly
    // Note that, if at all possible, RUR.CURRENT_WORLD should not be used
    // directly in other javascript functions; some of the functions
    // defined near the end of this file should be used instead.

RUR.BACKGROUND_IMAGE = new Image();  // Background image whose src attribute
   // is set when importing a world.

RUR.HEIGHT = 550;
RUR.WIDTH = 625;
set_canvases(); // defined below and hoisted by javascript. It can
                // redefine RUR.HEIGHT and RUR.WIDTH
RUR.MAX_Y = Math.floor(RUR.HEIGHT / RUR.WALL_LENGTH) - 1;
RUR.MAX_X = Math.floor(RUR.WIDTH / RUR.WALL_LENGTH) - 1;

/*========================================================
  User session configuration

  If changed, saved in the browser's local storage for use
  in later sessions.
==========================================================*/

RUR.GREEN = "green"; // for colour blind people; see
RUR.RED = "red";     // RUR.configure_red_green() below

/*=========================================================
  The following is potentially useful for world creators; if
  set to true, it will include the contents of the various
  editors when the world's description is shown.
==========================================================*/

RUR.SHOW_EDITORS_CONTENTS = false;

/*=========================================================
  Grid visibility when background tiles or background image
  would other wise hide it.

  This would be a value assigned to RUR.state.visible_grid
==========================================================*/

RUR.ALL_GRID_VISIBLE = 1;
RUR.PATH_ONLY = "grid_visible_on_path_only";

/*========================================================
  Some initial defaults
==========================================================*/
RUR.initial_defaults.human_language = 'en';
RUR.initial_defaults.input_method = 'python';

/*========================================================
   State changed through UI interaction or from initial URI
==========================================================*/

RUR.state.session_initialized = false; // when first loading the site

RUR.state.human_language = undefined;
RUR.state.input_method = undefined;
RUR.state.programming_language = undefined;

RUR.state.world_name = undefined;
RUR.state.world_url = undefined;
RUR.state.current_menu = undefined;

RUR.state.onload_programming_language = undefined; // determined by content of onload editor

RUR.state.x = undefined; // recorded mouse clicks
RUR.state.y = undefined;

RUR.state.run_button_clicked = false;
RUR.state.playback = false;  // from pause/play/stop
RUR.state.highlight = true;
RUR.state.watch_vars = false;
RUR.state.editing_world = false;

RUR.state.extra_code_visible = false;

RUR.state.user_progress = {}; // names of worlds solved
RUR.state.user_solutions = {}; // programs for worlds solved


// This will keep track of the current font size if changed by the user.
RUR.state.editors_font_size = undefined;

RUR.state.ui_ready = false;

/*========================================================

   Animated images

==========================================================*/

// when user add new robot images or, more importantly, replace existing ones
RUR.state.reset_default_robot_images_needed = false;


RUR.reset_animated_images = function () {
    // Per-program containers ensuring that proper animation sequence is respected
    RUR._ORDERED = {};
    RUR._SYNC = {};
    RUR._SYNC_VALUE = {};
    RUR._CYCLE_STAY = {};
    RUR._CYCLE_REMOVE = {};
    RUR.ANIMATION_TIME = 120; // time delay between each new image in animation
    //
    RUR.ROBOT_ANIMATION_TIME = 150;
    RUR.state.animated_robots = false; // set to true when we add animated robots
};

RUR.reeborg_default_model = "classic"; // global default; never reset

RUR.reset_pre_run_defaults = function () {
    // by contrast with RUR.reeborg_default_model above, the user selection can
    // be temporarily overriden by a program; it is thus reset each time.
    try { // localStorage not defined during unit tests
        RUR.user_selected_model = localStorage.getItem("robot_default_model");
    } catch (e) {}

    /* recording and playback values */
    RUR.frames = [];
    RUR.nb_frames = 0;
    RUR.current_frame_no = 0;
    RUR.current_line_no = undefined;
    RUR.rec_line_numbers = [];
    RUR.state.playback = false;
    RUR.state.error_recorded = false;
    RUR.state.do_not_record = false;
    RUR.watched_expressions = [];
    //RUR._max_lineno_highlighted = 0; need to erase highlights first in RUR.reset_world
    clearTimeout(RUR._TIMER);
    RUR.state.code_evaluated = false;
        // sound has to be turned on explicitly, each time a program is run.
    RUR.state.sound_id = undefined;
    RUR.state.sound_on = false;
        // When loading a file using a World() instruction in a program,
        // we do not want the rest of the program to execute; this is then
        // set to true.
    RUR.state.prevent_playback = false;

    RUR.state.visible_grid = false; /* if true, will be shown above tiles */
    RUR.public = {}; // reset

    RUR.state.do_not_draw_info = false; // see document titled
                    // "How to show just the path followed by Reeborg"

    /* Avoiding infinite loops */
    RUR.MAX_STEPS = 1000; // maximum nb of instructions in a user program;
                          // user-adjustable via max_nb_instructions() in French
                          // or set_max_nb_steps() in English

    /* time frames */
    RUR.PLAYBACK_TIME_PER_FRAME = 300; // ajustable by a program via think()
    RUR.MIN_TIME_SOUND = 250; // if RUR.PLAYBACK_TIME_PER_FRAME is below
                              // this value, no sound will be heard
    RUR.reset_animated_images(); // see above; will reset RUR.ANIMATION_TIME and
                                 // RUR.ROBOT_ANIMATION_TIME

    /* extra frame insertion */
    RUR.state.frame_insertion_called = false;
    RUR.frame_insertion = undefined; // special function available to world creators

    /* others */
    RUR.state.evaluating_onload = false; // true/false toggle in RUR.process_onload
    RUR.state.specific_object = undefined; // used only in menu-driven world editor

    RUR.__python_error = false; // used to catch Python error in custom format

    RUR.current_maze = undefined; // special namespace when mazes are created

    RUR.state.done_executed = 0; // = false in both Python and Javascript
                                // Used to monitor if done is used 
                                // preventing the evaluation of Post code.

    RUR.print_cache = '';  // capturing the standard output from a user's program.

    // The following may be specified by a world creator to replace the
    // standard/default message when a goal is checked at the end of a run
    RUR.success_custom_message = undefined;
    RUR.failure_custom_message = undefined;

};
RUR.reset_pre_run_defaults();


/* Every time we load an image elsewhere, we should have defined the
   onload method to be RUR.onload_new_image.
*/
RUR.onload_new_image = function  () {
    // we do not require the file in which it is defined
    // to avoid a circular import.
    if (RUR.vis_world === undefined) { // not ready yet
        return;
    }
    redraw_all();
};

var initial_drawing_timer, last_drawing_time = Date.now();
function redraw_all() {
    // redraws everything with intervals at least greater than 200 ms
    // to avoid consuming a lot of time redrawing the world initially
    // every time an image is loaded.
    var now, elapsed;
    now = Date.now();
    elapsed = now - last_drawing_time;
    clearTimeout(initial_drawing_timer);
    if (elapsed > 200) {
        try{
            RUR.vis_world.draw_all();
            last_drawing_time = now;
        } catch (e) {}
    } else { // the last image loaded may never be drawn if we do not do this:
        initial_drawing_timer = setTimeout(redraw_all, 200);
    }
}

/*----------------------------------------------------------------
 We use multiple canvases to facilitate the drawing of objects
 without having to worry much about the order in which we draw
 the various types of objects.

 The order in which the canvases are overlayed one on top of another
 is set in the CSS file and should not be inferred from the
 Javascript code below (even though we try to keep them in the same order)

 When doing integration tests, the canvases are defined; when doing unit tests,
 they are not. So we enclose these definitions in a function
 that does ignores canvases when appropriate.
*/
function set_canvases () {
    if (window.document === undefined) { // doing unit tests
        return;
    }

    function create_ctx(canvas, ctx) {
        RUR[ctx] = canvas.getContext("2d");
        RUR.CANVASES.push(canvas);
        RUR.ALL_CTX.push(RUR[ctx]);
    }

    RUR.BACKGROUND_CANVAS = document.getElementById("background-canvas"); //1
    create_ctx(RUR.BACKGROUND_CANVAS, "BACKGROUND_CTX");
    RUR.BACKGROUND_CTX.font = "bold 12px sans-serif";
    // Get default width and height from html files; these are shared
    // by all canvases, and can be changed when a new world is
    // loaded or created
    RUR.HEIGHT = RUR.BACKGROUND_CANVAS.height;
    RUR.WIDTH = RUR.BACKGROUND_CANVAS.width;

    RUR.THINGS_CANVAS = document.getElementById("tiles-canvas");  //2
    create_ctx(RUR.THINGS_CANVAS, "TILES_CTX");

    RUR.THINGS_CANVAS_ANIM = document.getElementById("tiles-canvas-anim"); // 3
    create_ctx(RUR.THINGS_CANVAS_ANIM, "TILES_ANIM_CTX");

    RUR.BRIDGE_CANVAS = document.getElementById("bridge-canvas");  //4
    create_ctx(RUR.BRIDGE_CANVAS, "BRIDGE_CTX");

    RUR.BRIDGE_CANVAS_ANIM = document.getElementById("bridge-canvas-anim");  //5
    create_ctx(RUR.BRIDGE_CANVAS_ANIM, "BRIDGE_ANIM_CTX");

    RUR.DECORATIVE_OBJECTS_CANVAS = document.getElementById("decorative-objects-canvas"); // 6
    create_ctx(RUR.DECORATIVE_OBJECTS_CANVAS, "DECORATIVE_OBJECTS_CTX");

    RUR.DECORATIVE_OBJECTS_CANVAS_ANIM = document.getElementById("decorative-objects-canvas-anim"); // 7
    create_ctx(RUR.DECORATIVE_OBJECTS_CANVAS_ANIM, "DECORATIVE_OBJECTS_ANIM_CTX");

    RUR.OBSTACLES_CANVAS = document.getElementById("obstacles-canvas"); // 8
    create_ctx(RUR.OBSTACLES_CANVAS, "OBSTACLES_CTX");

    RUR.OBSTACLES_CANVAS_ANIM = document.getElementById("obstacles-canvas-anim"); // 9
    create_ctx(RUR.OBSTACLES_CANVAS_ANIM, "OBSTACLES_ANIM_CTX");

    RUR.GOAL_CANVAS = document.getElementById("goal-canvas"); // 10
    create_ctx(RUR.GOAL_CANVAS, "GOAL_CTX");

    // 11 removed

    RUR.GOAL_CANVAS_ANIM = document.getElementById("goal-canvas-anim"); //12
    create_ctx(RUR.GOAL_CANVAS_ANIM, "GOAL_ANIM_CTX");

    RUR.OBJECTS_CANVAS = document.getElementById("objects-canvas");  //13
    create_ctx(RUR.OBJECTS_CANVAS, "OBJECTS_CTX");

    RUR.OBJECTS_CANVAS_ANIM = document.getElementById("objects-canvas-anim"); //14
    create_ctx(RUR.OBJECTS_CANVAS_ANIM, "OBJECTS_ANIM_CTX");

    RUR.TRACE_CANVAS = document.getElementById("trace-canvas"); //15
    create_ctx(RUR.TRACE_CANVAS, "TRACE_CTX");

    // line drawing on canvas is drawn on overlapping pixels; 
    // see https://stackoverflow.com/a/7531540/558799 and
    // https://stackoverflow.com/a/13884434/558799 for an explanation.
    // Rather than adding 0.5 pixel each time we with to draw a line,
    // we shift the entire trace canvas by 0.5, and can work with integer
    // values.
    RUR.TRACE_CTX.translate(0.5, 0.5);


    RUR.PUSHABLES_CANVAS = document.getElementById("pushables-canvas"); //16
    create_ctx(RUR.PUSHABLES_CANVAS, "PUSHABLES_CTX");

    RUR.PUSHABLES_CANVAS_ANIM = document.getElementById("pushables-canvas-anim"); //17
    create_ctx(RUR.PUSHABLES_CANVAS_ANIM, "PUSHABLES_ANIM_CTX");

    RUR.WALL_CANVAS = document.getElementById("wall-canvas"); //18
    create_ctx(RUR.WALL_CANVAS, "WALL_CTX");

    RUR.ROBOT_CANVAS = document.getElementById("robot-canvas"); //19
    create_ctx(RUR.ROBOT_CANVAS, "ROBOT_CTX");

    RUR.ROBOT_ANIM_CANVAS = document.getElementById("robot-anim-canvas"); //20
    create_ctx(RUR.ROBOT_ANIM_CANVAS, "ROBOT_ANIM_CTX");
}

/*-------------------------------------------
 World-related functions;
 Most of these are left without JSdoc-type comments as they are intended
 only for internal usage.
---------------------------------------------*/
RUR.get_current_world = function () {
    return RUR.CURRENT_WORLD;
};

/** @function world_map
 * @memberof RUR
 * @instance
 *
 * @desc  This function returns a World as a json object. Since the
 *  internal structure of worlds is subject to change, it is
 *  not advised to make use of this function inside a world definition.
 *
 *  However, **when using Javascript**, it can be useful as a means to explore
 *  the world structure, or assign advanced students to write their own
 *  functions based on the world structure (for example: find
 *  the shortest path in a maze using various search algorithms.)
 *
 * **When using Python, see `SatelliteInfo()` instead.**
 *
 */

RUR.world_map = function () {
    "use strict";
    var world, i;
    // clone the world so as not to modify the original
    world = JSON.parse(JSON.stringify(RUR.get_current_world()));
    // we don't need the editor content
    for (i=0; i < RUR.WORLD_EDITORS.length; i++) {
        if (world[RUR.WORLD_EDITORS[i]] !== undefined) {
            delete world[RUR.WORLD_EDITORS[i]];
        }
    }
    return world;
};


RUR.set_current_world = function (world, merge_editors) {
    "use strict";
    var editor_name, i;
    // merge_editor is used when a copy of the world was obtained
    // using world_map, which removed the editor content.
    if (merge_editors) {
        for (i=0; i < RUR.WORLD_EDITORS.length; i++) {
            editor_name = RUR.WORLD_EDITORS[i];
            if (RUR.CURRENT_WORLD[editor_name] !== undefined) {
                world[editor_name] = RUR.CURRENT_WORLD[editor_name];
            }
        }
    }
    RUR.CURRENT_WORLD = world;
};


RUR.export_world = function (world) {
    var content, editor_name, i, world_copy;

    world_copy = RUR.clone_world(world);
    for (i=0; i < RUR.WORLD_EDITORS.length; i++) {
        editor_name = RUR.WORLD_EDITORS[i];
        content = world_copy[editor_name];
        /* editors content can be saved either as a string (old format)
           with embedded new lines characters or as an array of lines (new format)
           */
        if (content !== undefined && typeof content == "string") {
            world_copy[editor_name] = content.split("\n");
        }
    }    
    return JSON.stringify(world_copy, null, 2);
};


RUR.clone_world = function (world) {
    if (world === undefined) {
        return JSON.parse(JSON.stringify(RUR.get_current_world()));
    } else {
        return JSON.parse(JSON.stringify(world));
    }
};


/** @function print_world_map
 * @memberof RUR
 * @instance
 *
 * @desc Prints a formatted version of the world map.
 * For Python, use `SatelliteInfo.print_world_map()` instead.
 *
 */

RUR.print_world_map = function () {
    RUR.output.write(JSON.stringify(RUR.world_map(), null, 2), "\n");
};


// Used by SatelliteInfo class in Python
RUR._world_map = function () {
    return JSON.stringify(RUR.world_map(), null, 2);
};

/** @function print_maze
 * @memberof RUR
 * @instance
 *
 * @desc Prints a formatted version of the current maze info if a maze exists.
 *
 */
RUR.print_maze = function () {
    var maze = RUR.world_map().maze;
    if (maze === undefined) {
        RUR.output.write("undefined\n");
    } else {
        RUR.output.write(JSON.stringify(maze, null, 2), "\n");
    }
};

/** @function configure_red_green
 * @memberof RUR
 * @instance
 *
 * @desc  Colour blind users may use this function to choose two colours,
 * instead of red and green, to indicate if the number of objects required
 * as a goal at a given location has been achieved or not.  The choices made
 * are saved in the browser's local storage and should only need to be
 * entered once.
 *
 * @param {string} red A colour indicated either as a named colour, like
 * `"red"`, `"indigo"`, etc., an rgb value like `"rgb(125, 34, 22)"`,
 * or an rgba value, or a hexadecimal colour like `"#FA2336"`.
 *
 * @param {string} green Another colour, seen as contrasting with `red` by
 * the user.
 */
RUR.configure_red_green = function (red, green) {
    RUR.GREEN = green;
    RUR.RED = red;
    localStorage.setItem("userchoice_red", red);
    localStorage.setItem("userchoice_green", green);
};

//--------------------------------------------------------
// We communicate information to the user using various
// styled dialog windows; this generic function specifies
// which dialog (html "element") to use and the content to
// display to the user.
//
RUR.show_feedback = function (element, content) {
    $(element).html(content).dialog("open");
};


/** @function randint
 * @memberof RUR
 * @instance
 * @desc Like the Python function random.randit, it returns a
 * random integer in range [min, max], including both end points.
 * @param [integer] min
 * @param [integer] max
 */
RUR.randint = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


RUR.hide_end_dialogs = function () {
    $("#Reeborg-concludes").dialog("close");
    $("#Reeborg-shouts").dialog("close");
    // reset the options in case the user has dragged the dialogs as it would
    // then open at the top left of the window
    $("#Reeborg-concludes").dialog("option", {minimize: false, maximize: false,
        autoOpen:false, width:500, dialogClass: "concludes",
        position:{my: "left", at: "left", of: $("#editor-panel")}});
    $("#Reeborg-shouts").dialog("option", {minimize: false, maximize: false,
        autoOpen:false, width:500, dialogClass: "alert",
        position:{my: "left", at: "left", of: $("#editor-panel")}});
};
},{}],45:[function(require,module,exports){
/* This file documents methods used to save worlds to and retrieve them
   from a browser's local storage.

   When a program is run successfully, it is saved in the browser; this
   way, when a user quits the site and starts a new session, he or she
   can resume from where they were.

   Furthermore, when editing a world, it is useful to save it; it is stored
   in the browser and its name is appended to the world html select menu.
   All such worlds are available to a user, unless they explicitly delete
   them from the menu.
*/

require("./../rur.js");
require("./../translator.js");
require("./../ui/world_select.js");

RUR.storage = {};

RUR.storage._save_world = function (name){
    "use strict";
    if (localStorage.getItem("user_world:" + name) !== null){
        if (!window.confirm(RUR.translate("Name already exist; confirm that you want to replace its content."))){
            return;
        }
        // replace existing
        localStorage.setItem("user_world:"+ name, RUR.export_world(RUR.get_current_world()));
    } else {
        RUR.storage.save_world(name);
    }
    /* In editing world mode, the onload code should not have been run */
    if (RUR.state.editing_world) {
        RUR.WORLD_BEFORE_ONLOAD = RUR.clone_world();
    }
};

RUR.storage.save_world = function (name){
    "use strict";
    var url = "user_world:"+ name;
    if (RUR.state.editing_world) {
        localStorage.setItem(url, RUR.export_world(RUR.get_current_world()));
    } else {
        localStorage.setItem(url, RUR.export_world(RUR.WORLD_BEFORE_ONLOAD));
    }
    RUR.storage.append_world_name(name);
};

RUR.storage.append_world_name = function (name){
    "use strict";
    var url = "user_world:"+ name;
    RUR.storage.appending_world_name_flag = true;
    RUR.world_selector.append_world({url:url, shortname:name, local_storage:true});
    if (RUR.state.session_initialized){
        RUR.world_selector.set_url(url);  // reload as updating select choices blanks the world.
    }
    /* appends name to world selector and to list of possible worlds to delete */
    $('#delete-world h3').append(
        '<button class="blue-gradient inline-block" onclick="RUR.storage.delete_world(' +
            "'"+ name + "'" + ');$(this).remove()"">' + RUR.translate('Delete ') + name + '</button>');
    $('#delete-world').show();
};

RUR.storage.delete_world = function (name){
    "use strict";
    var i, key;
    localStorage.removeItem("user_world:" + name);
    $("select option[value='" + "user_world:" + name +"']").remove();

    try {
        RUR.world_selector.set_url(
            RUR.world_selector.url_from_shortname(
                localStorage.getItem("world_name"))
            );
    } catch (e) {
        RUR.world_selector.set_default();
    }

    for (i = localStorage.length - 1; i >= 0; i--) {
        key = localStorage.key(i);
        if (key.slice(0, 11) === "user_world:") {
            return;
        }
    }
    $('#delete-world').hide();
};

},{"./../rur.js":44,"./../translator.js":46,"./../ui/world_select.js":63}],46:[function(require,module,exports){
require("./rur.js");
var uien = require("./../lang/ui_en.js"),
    uifr = require("./../lang/ui_fr.js"),
    uiko = require("./../lang/ui_ko.js"),
    uipl = require("./../lang/ui_pl.js"),
    uilt = require("./../lang/ui_lt.js"),
    uipt = require("./../lang/ui_pt.js"),
    uicn = require("./../lang/ui_cn.js"),
    uide = require("./../lang/ui_de.js"),
    en = require("./../lang/en.js"),
    fr = require("./../lang/fr.js"),
    ko = require("./../lang/ko.js"),
    cn = require("./../lang/cn.js"),
    pl = require("./../lang/pl.js"),
    lt = require("./../lang/lt.js"),
    pt = require("./../lang/pt.js"),
    de = require("./../lang/de.js");

RUR.ui_en = uien.ui_en;
RUR.en_to_en = uien.en_to_en;
RUR.ui_fr = uifr.ui_fr;
RUR.fr_to_en = uifr.fr_to_en;
RUR.ui_ko = uiko.ui_ko;
RUR.ko_to_en = uiko.ko_to_en;
RUR.ui_pl = uipl.ui_pl;
RUR.pl_to_en = uipl.pl_to_en;
RUR.ui_lt = uilt.ui_lt;
RUR.lt_to_en = uilt.lt_to_en;
RUR.ui_pt = uipt.ui_pt;
RUR.pt_to_en = uipt.pt_to_en;
RUR.ui_cn = uicn.ui_cn;
RUR.cn_to_en = uicn.cn_to_en;
RUR.ui_de = uide.ui_de;
RUR.de_to_en = uide.de_to_en;

RUR.en = en.en;
RUR.fr = fr.fr;
RUR.ko = ko.ko;
RUR.cn = cn.cn;
RUR.pl = pl.pl;
RUR.lt = lt.lt;
RUR.pt = pt.pt;
RUR.de = de.de;

RUR.untranslated = {"en":true, "fr":true, "cn":true, "pl": true, "lt": true, "de": true, "ko": true, "pt": true};

function merge_dicts (base, other) {
    var key;
    for(key in other){
        if(other.hasOwnProperty(key)){
            base[key] = other[key];
        }
    }
}
RUR.translation = RUR.ui_en;
merge_dicts(RUR.translation, RUR.en);
RUR.translation_to_english = RUR.en_to_en;

RUR._translation_needed = {};
RUR._translation_to_english_needed = {};

function is_color(s) { // avoid giving warning about missing translation
    if (s.startsWith("#") || s.startsWith("rgb")) {
        return true;
    }
    return false;
}

RUR.translate = function (s) {
    if (s==undefined) {
        return "";
    }
    if (RUR.untranslated[s] || is_color(s)) {
        return s;
    } else if (RUR.translation[s] !== undefined) {
        return RUR.translation[s];
    } else {
        if (RUR._translation_needed[s] == undefined) { // avoid giving multiple warnings
            console.warn("Translation needed for " + s);
            RUR._translation_needed[s] = true;
        }
        return s;
    }
};

RUR.translate_to_english = function (s) {
    if (RUR.untranslated[s] || is_color(s)) {
        return s;
    } else if (RUR.translation_to_english[s] !== undefined) {
        return RUR.translation_to_english[s];
    } else {
        if (RUR._translation_to_english_needed[s] == undefined) { // avoid giving multiple warnings
            console.warn("Translation to English needed for " + s);
            RUR._translation_to_english_needed[s] = true;
        }
        return s;
    }
};

},{"./../lang/cn.js":89,"./../lang/de.js":90,"./../lang/en.js":91,"./../lang/fr.js":92,"./../lang/ko.js":93,"./../lang/lt.js":94,"./../lang/pl.js":96,"./../lang/pt.js":97,"./../lang/ui_cn.js":98,"./../lang/ui_de.js":99,"./../lang/ui_en.js":100,"./../lang/ui_fr.js":101,"./../lang/ui_ko.js":102,"./../lang/ui_lt.js":103,"./../lang/ui_pl.js":104,"./../lang/ui_pt.js":105,"./rur.js":44}],47:[function(require,module,exports){
/* To ensure that all elements are found before listeners are added,
   we attempt to keep all of the relevant activation functions
   in this single module whose main function is only executed when
   the document has been entirely loaded.

   When we did not do this, but instead tried to attach listeners as
   we defined the relevant functions in separate javascript module, 
   unpredictable "glitches" could occur where a given element did
   not get the proper listener attached.

   Note that there is a somewhat mixed notation (some using JQuery,
   other using plain Javascript) as the relevant code was copied
   from separate functions written over a long period. At some point
   it might be desirable to rewrite everything to not use JQuery, 
   but it is not a priority.

   The unusual choice of defining variables with the var keyword just
   above the one line of code that uses it is not something that is
   going to change.
 */
require("../rur.js");
require("./editors_tabs.js");
require("./frame_slider.js");
require("./human_language.js");
require("./pause.js");
require("./stop.js");
require("./programming_mode.js");
require("./reload.js");
require("./run.js");
require("./step.js");
require("./toggle_highlight.js");
require("./toggle_watch.js");
require("./world_select.js");


$(document).ready(function () {

    // in editor_tabs.js; "tabs" is a jqueryUI method
    $("#tabs").tabs({
        heightStyle: "content",
        activate: RUR.listeners['tabs.activate']
    });

    $("#editor-panel").resizable({
        resize: RUR.listeners['editor-panel.resize']
    }).draggable({cursor: "move", handle: "ul"});
    
    $("#editor-tab").on("click", RUR.listeners['editor-tab']);
    $("#library-tab").on("click", RUR.listeners['library-tab']);
    $("#extra-tab").on("click", RUR.listeners['extra-tab']);

    // in frame_slider.js
    $("#frame-selector").on("input change", function() {
        RUR.listeners['frame-selector']();
    });

    // in human_language.js
    $("#human-language").change(RUR.listeners['human-language']);

    // in pause.js
    var pause_button = document.getElementById("pause");
    pause_button.addEventListener("click", RUR.pause, false);

    // in programming_mode.js
    $('#editor-visible-input').change(function() {
        RUR.listeners['editor-visible-input']();
    });
    $("#programming-mode").change(function() {
        RUR.listeners['programming-mode']();
    });

    // in reload.js
    var reload_button = document.getElementById("reload");
    reload_button.addEventListener("click", RUR.reload, false);

    var reload2_button = document.getElementById("reload2");
    reload2_button.addEventListener("click", RUR.reload2, false);

    // in run.js
    var run_button = document.getElementById("run");
    run_button.addEventListener("click", RUR.listeners.run, false);

    // in step.js
    var step_button = document.getElementById("step");
    step_button.addEventListener("click", RUR.listeners.step, false);
    var reverse_step_button = document.getElementById("reverse-step");
    reverse_step_button.addEventListener("click", RUR.listeners.reverse_step, false);

    // in stop.js
    var stop_button = document.getElementById("stop");
    stop_button.addEventListener("click", RUR.stop, false);

    // in toggle_highlight.js
    var highlight_button = document.getElementById("highlight");
    highlight_button.addEventListener("click", RUR.toggle_highlight, false);

    // in toggle_watch.js
    var watch_button = document.getElementById("watch-variables-btn");
    watch_button.addEventListener("click", toggle_watch_variables, false);

    // in world_select.js
    $("#select-world").change(RUR.listeners['select-world.change']);


    RUR.state.ui_ready = true;
});
},{"../rur.js":44,"./editors_tabs.js":50,"./frame_slider.js":51,"./human_language.js":52,"./pause.js":54,"./programming_mode.js":55,"./reload.js":56,"./run.js":57,"./step.js":58,"./stop.js":59,"./toggle_highlight.js":60,"./toggle_watch.js":61,"./world_select.js":63}],48:[function(require,module,exports){
/* In this module, we make it possible for a user to define their
   own world menu selection. We also include some default world menus. */
require("./../rur.js");
require("./../translator.js");
require("./world_select.js");
require("./../storage/storage.js");

RUR.custom_world_select = {};

RUR.custom_world_select.make = function (contents) {  // aka RUR._MakeCustomMenu_
    "use strict";
    var i;

    RUR.state.creating_menu = true;
    RUR.world_selector.empty_menu();
    RUR.state.current_menu = RUR.state.world_url;
    for(i=0; i<contents.length; i++){
        RUR.world_selector.append_world( {url:contents[i][0],
                                        shortname:contents[i][1]});
    }
    load_user_worlds();
    localStorage.setItem("world_menu", RUR.state.current_menu);
    RUR.state.creating_menu = false;

    if (RUR.state.session_initialized) {
        RUR.world_selector.set_default();
    }
};

function load_user_worlds() {
    var key, name, i;

    for (i = localStorage.length - 1; i >= 0; i--) {
        key = localStorage.key(i);
        if (key.slice(0, 11) === "user_world:") {
            name = key.slice(11);
            RUR.storage.append_world_name(name);
            $('#delete-world').show();
        }
    }
}

RUR.make_default_menu = function(language) {
    if (RUR.state.session_initialized) {
        RUR.state.world_url = undefined;
        RUR.state.world_name = undefined;
        RUR.state.current_menu = undefined;
    }

    switch (language) {
        case 'en':
        case 'fr-en':
            RUR.initial_defaults.initial_menu = RUR.BASE_URL + RUR.DEFAULT_MENU_EN;
            RUR.load_world_file(RUR.BASE_URL + RUR.DEFAULT_MENU_EN);
            break;
        case 'ko-en':
            RUR.initial_defaults.initial_menu = RUR.BASE_URL + RUR.DEFAULT_MENU_KO;
            RUR.load_world_file(RUR.BASE_URL + RUR.DEFAULT_MENU_KO);
            break;
        case 'fr':
        case 'en-fr':
            RUR.load_world_file(RUR.BASE_URL + RUR.DEFAULT_MENU_FR);
            RUR.initial_defaults.initial_menu = RUR.BASE_URL + RUR.DEFAULT_MENU_FR;
            break;
        case 'cn':
        case 'en-cn':
            RUR.load_world_file(RUR.BASE_URL + RUR.DEFAULT_MENU_CN);
            RUR.initial_defaults.initial_menu = RUR.BASE_URL + RUR.DEFAULT_MENU_CN;
            break;
        default:
            RUR.load_world_file(RUR.BASE_URL + RUR.DEFAULT_MENU_EN);
            RUR.initial_defaults.initial_menu = RUR.BASE_URL + RUR.DEFAULT_MENU_EN;
    }

};

},{"./../rur.js":44,"./../storage/storage.js":45,"./../translator.js":46,"./world_select.js":63}],49:[function(require,module,exports){

require("./../rur.js");

exports.toggle = function () {
    var world = RUR.get_current_world();
    if ("robots" in world && world.robots.length > 0) {
        $(".robot-absent").hide();
        $(".robot-present").show();
    } else {
        $(".robot-absent").show();
        $(".robot-present").hide();
    }
};

},{"./../rur.js":44}],50:[function(require,module,exports){
require("../rur.js");
require("./../editors/create.js");
var record_id = require("./../../lang/msg.js").record_id;

record_id("editor-tab", "Python Code");
record_id("library-tab", "LIBRARY");
record_id("extra-tab", "EXTRA");
record_id("pre-code-tab", "PRE");
record_id("post-code-tab", "POST");
record_id("description-tab", "DESCRIPTION");
record_id("onload-editor-tab", "ONLOAD");

RUR.listeners['tabs.activate'] = function(event, ui){
    var height_adjust = $(this).height()-60;
    editor.setSize(null, height_adjust);
    library.setSize(null, height_adjust);
    extra_editor.setSize(null, height_adjust);
    pre_code_editor.setSize(null, height_adjust);
    post_code_editor.setSize(null, height_adjust);
    description_editor.setSize(null, height_adjust);
    onload_editor.setSize(null, height_adjust);
};


RUR.listeners['editor-panel.resize'] = function() {
    var height_adjust = $(this).height()-60;
    editor.setSize(null, height_adjust);
    library.setSize(null, height_adjust);
    pre_code_editor.setSize(null, height_adjust);
    post_code_editor.setSize(null, height_adjust);
    description_editor.setSize(null, height_adjust);
    onload_editor.setSize(null, height_adjust);
};

RUR.listeners['editor-tab'] = function (evt) {
    if (RUR.state.programming_language == "python" && !RUR.state.editing_world) {
        $("#highlight").show();
        $("#watch-variables-btn").show();
    } else {
        $("#highlight").hide();
        $("#watch-variables-btn").hide();
    }
};

RUR.listeners['library-tab'] = function (evt) {
    $("#highlight").hide();
    $("#watch-variables-btn").hide();
};

RUR.listeners['extra-tab'] = function (evt) {
    $("#highlight").hide();
    $("#watch-variables-btn").hide();
};


/**
 * @function set_extra_content
 * @memberof RUR
 * @instance
 *
 * @desc "Installs" a python module defined as a string parameter to
 * this function. When called, the **extra** editor tab is shown in read-only mode.
 * Once "installed", this content remains available only during the current
 * browser's session.  It can be updated at any time by calling this function
 * again. It is suggested to call this function from the **Onload** editor,
 * as part of the world creation.
 *
 * @param {string} python_code The Python code which is the content of the
 * desired module, and shown in the **extra** editor tab.
 * @param {bool} [hidden] If `true/True`, the **extra** editor tab (and its
 * content) will be hidden.
 *
 * @example {@lang python}
 * # set the content from a string
 * RUR.set_extra_content('''
 * def turn_right():
 *     turn_left()
 *     turn_left()
 *     turn_left()
 * ''')
 *
 * # set the content from the code present in the editor
 * # when saving/creating the world
 * RUR.set_extra_content(RUR.get_editor_from_world())
 *
 * # similar to the above except for code in the library
 * RUR.set_extra_content(RUR.get_library_from_world())
 */
RUR.set_extra_content = function (python_code, hidden) {
    if (python_code) {
        extra_editor.setValue(python_code);
        if (!hidden) {
            RUR.state.extra_code_visible = true;
            if (RUR.state.programming_language == "python" && !RUR.state.editing_world) {
                $("#extra-tab").parent().show();
            }
        } else {
            RUR.state.extra_code_visible = false;
            $("#extra-tab").parent().hide();
        }
    }
};

/**
 * @function get_editor_from_world
 * @memberof RUR
 * @instance
 *
 * @desc A world can be saved with the content shown in the main code
 * editor at the time; the person loading the world usually does not
 * see this content since what is shown in the main editor is their own code.
 * However, this content can be retrieved by calling
 * this function. Its only use case is to set the content of the
 * extra editor/module.
 *
 * @example {@lang python}
 * RUR.set_extra_content(RUR.get_editor_from_world())
 *
 */
RUR.get_editor_from_world = function () {
    var world = RUR.get_current_world();
    if (world.editor !== undefined) {
        return world.editor;
    }
    return '';
};

/**
 * @function get_library_from_world
 * @memberof RUR
 * @instance
 *
 * @desc A world can be saved with the content shown in the library tab
 * at the time; the person loading the world usually does not
 * see this content since what is shown in the library is their own code.
 * However, this content can be retrieved by calling
 * this function. Its only use case is to set the content of the
 * extra editor/module.
 *
 * @example {@lang python}
 * RUR.set_extra_content(RUR.get_library_from_world())
 *
 */
RUR.get_library_from_world = function () {
    var world = RUR.get_current_world();
    if (world.library !== undefined) {
        return world.library;
    }
    return '';
};

},{"../rur.js":44,"./../../lang/msg.js":95,"./../editors/create.js":11}],51:[function(require,module,exports){
require("./../rur.js");
require("./../runner/runner.js");

var frame_selector = document.getElementById("frame-selector"),
    frame_id_info = document.getElementById("frame-id");

RUR.update_frame_nb_info = function() {
    var frame_no=0, max_frame_nb;
    if (RUR.state.error_recorded) {
        max_frame_nb = RUR.nb_frames-1;
    } else {
        max_frame_nb = RUR.nb_frames;
    }
    try {  // termporarily keeping the "old" version compatible
        if (RUR.nb_frames === 0) {
            frame_id_info.innerHTML = "0/0";
            frame_selector.value = 0;
            frame_selector.min = 0;
            frame_selector.max = 0;
        } else {
            frame_selector.max = max_frame_nb;
            frame_selector.value = RUR.current_frame_no;
            // do not display zero-based index as this would confuse
            // beginners ... especially without no additional explanation.
            frame_no = Math.min(RUR.current_frame_no+1, max_frame_nb+1);
            frame_id_info.innerHTML = frame_no + "/" + (max_frame_nb+1);
        }
    } catch (e) {}
};

RUR.listeners['frame-selector'] = function () {
    if (RUR.state.playback) {
        return;
    }
    RUR.current_frame_no = parseInt(frame_selector.value, 10);
    if (RUR.current_frame_no <= 0){
        $("#reverse-step").attr("disabled", "true");
    } else if ($("#reverse-step").attr("disabled")) {
        $("#reverse-step").removeAttr("disabled");
    }

    if (RUR.current_frame_no == RUR.nb_frames) {
        $("#step").attr("disabled", "true");
    } else if ($("#step").attr("disabled")) {
        $("#step").removeAttr("disabled");
    }
    RUR.update_frame_nb_info();
    // TODO: see if dependency needs to be set properly
    RUR.rec.display_frame();
};

},{"./../runner/runner.js":42,"./../rur.js":44}],52:[function(require,module,exports){
require("./../rur.js");
require("./../programming_api/reeborg_en.js");
require("./../programming_api/reeborg_fr.js");
require("./../programming_api/reeborg_ko.js");
require("./../programming_api/reeborg_cn.js");
require("./../programming_api/reeborg_pl.js");
require("./../programming_api/reeborg_lt.js");
require("./../programming_api/reeborg_de.js");
require("./../programming_api/reeborg_pt.js");

require("./../programming_api/blockly.js");
require("./../ui/custom_world_select.js");
require("./../permalink/permalink.js");

var msg = require("./../../lang/msg.js");
msg.record_id("human-language");
msg.record_id("mixed-language-info");

function merge_dicts (base, other) {
    var key;
    for(key in other){
        if(other.hasOwnProperty(key)){
            base[key] = other[key];
        }
    }
}

function update_translations(lang) {
    $("#mixed-language-info").show();
    $("#mixed-language-info").fadeOut(5000);
    switch(lang) {
        case "en":
            RUR.translation = RUR.ui_en;
            merge_dicts(RUR.translation, RUR.en);
            RUR.translation_to_english = RUR.en_to_en;
            blockly_init_en();
            $("#mixed-language-info").hide();
            break;
        case "fr":
            RUR.translation = RUR.ui_fr;
            merge_dicts(RUR.translation, RUR.fr);
            RUR.translation_to_english = RUR.fr_to_en;
            blockly_init_fr();
            $("#mixed-language-info").hide();
            break;
        case "ko":
            RUR.translation = RUR.ui_ko;
            merge_dicts(RUR.translation, RUR.ko);
            RUR.translation_to_english = RUR.ko_to_en;
            blockly_init_ko();
            $("#mixed-language-info").hide();
            break;
        case "de":
            RUR.translation = RUR.ui_de;
            merge_dicts(RUR.translation, RUR.de);
            RUR.translation_to_english = RUR.de_to_en;
            blockly_init_de();
            $("#mixed-language-info").hide();
            break;
        case "pl":
            RUR.translation = RUR.ui_pl;
            merge_dicts(RUR.translation, RUR.pl);
            RUR.translation_to_english = RUR.pl_to_en;
            blockly_init_pl();
            $("#mixed-language-info").hide();
            break;
        case "lt":
            RUR.translation = RUR.ui_lt;
            merge_dicts(RUR.translation, RUR.lt);
            RUR.translation_to_english = RUR.lt_to_en;
            blockly_init_lt();
            $("#mixed-language-info").hide();
            break;
        case "pt":
            RUR.translation = RUR.ui_pt;
            merge_dicts(RUR.translation, RUR.pt);
            RUR.translation_to_english = RUR.pt_to_en;
            blockly_init_en();  // Need to add portuguese
            $("#mixed-language-info").hide();
            break;
        case "cn":
            RUR.translation = RUR.ui_cn;
            merge_dicts(RUR.translation, RUR.cn);
            RUR.translation_to_english = RUR.cn_to_en;
            blockly_init_cn();
            $("#mixed-language-info").hide();
            break;
        case "en-fr":
            RUR.translation = RUR.ui_en;
            merge_dicts(RUR.translation, RUR.fr);
            RUR.translation_to_english = RUR.en_to_en;
            blockly_init_fr();
            break;
        case "fr-en":
            RUR.translation = RUR.ui_fr;
            merge_dicts(RUR.translation, RUR.en);
            RUR.translation_to_english = RUR.fr_to_en;
            blockly_init_en();
            break;
        case "en-ko":
            RUR.translation = RUR.ui_en;
            merge_dicts(RUR.translation, RUR.ko);
            RUR.translation_to_english = RUR.en_to_en;
            blockly_init_fr();
            break;
        case "ko-en":
            RUR.translation = RUR.ui_ko;
            merge_dicts(RUR.translation, RUR.en);
            RUR.translation_to_english = RUR.ko_to_en;
            blockly_init_ko();
            break;
        case "pl-en":
            RUR.translation = RUR.ui_pl;
            merge_dicts(RUR.translation, RUR.en);
            RUR.translation_to_english = RUR.pl_to_en;
            blockly_init_pl(); // to be updated
            break;
        case "lt-en":
            RUR.translation = RUR.ui_lt;
            merge_dicts(RUR.translation, RUR.en);
            RUR.translation_to_english = RUR.lt_to_en;
            blockly_init_lt(); // to be updated
            break;
        case "pt-en":
            RUR.translation = RUR.ui_pt;
            merge_dicts(RUR.translation, RUR.en);
            RUR.translation_to_english = RUR.pt_to_en;
            blockly_init_en(); // Need to add portuguese
            break;
        case "en-cn":
            RUR.translation = RUR.ui_en;
            merge_dicts(RUR.translation, RUR.cn);
            RUR.translation_to_english = RUR.en_to_en;
            blockly_init_cn();
            break;
        case "cn-en":
            RUR.translation = RUR.ui_cn;
            merge_dicts(RUR.translation, RUR.en);
            RUR.translation_to_english = RUR.cn_to_en;
            blockly_init_en();
            break;
        case "en-de":
            RUR.translation = RUR.ui_en;
            merge_dicts(RUR.translation, RUR.de);
            RUR.translation_to_english = RUR.en_to_en;
            blockly_init_de();
            break;
        case "de-en":
            RUR.translation = RUR.ui_de;
            merge_dicts(RUR.translation, RUR.en);
            RUR.translation_to_english = RUR.de_to_en;
            blockly_init_en();
            break;            
        default:
        console.log("Default used");
            RUR.translation = RUR.ui_en;
            merge_dicts(RUR.translation, RUR.en);
            RUR.translation_to_english = RUR.en_to_en;
            blockly_init_en();
            $("#mixed-language-info").hide();
            break;
    }
    $("#mixed-language-info").html(RUR.translate(lang));
}

function update_commands (lang) {
    switch(lang) {
        case "de":
        case "en-de":
            RUR.reset_definitions = RUR.reset_definitions_de;
            RUR.library_name = "bibliothek";
            RUR.from_import = "from reeborg_de import *";
            break;        
        case "fr":
        case "en-fr":
            RUR.reset_definitions = RUR.reset_definitions_fr;
            RUR.library_name = "biblio";
            RUR.from_import = "from reeborg_fr import *";
            break;
        case "ko":
        case "en-ko":
            RUR.reset_definitions = RUR.reset_definitions_ko;
            RUR.library_name = "library_ko";
            RUR.from_import = "from reeborg_ko import *";
            break;
        case "pl":  // TODO: complete this
        case "en-pl":
            RUR.reset_definitions = RUR.reset_definitions_pl;
            RUR.library_name = "bibliotekapl";
            RUR.from_import = "from reeborg_pl import *";
            break;
        case "lt":  // TODO: complete this
        case "en-lt":
            RUR.reset_definitions = RUR.reset_definitions_lt;
            RUR.library_name = "biblioteka";
            RUR.from_import = "from reeborg_lt import *";
            break;
        case "pt":
            RUR.reset_definitions = RUR.reset_definitions_pt;
            RUR.library_name = "biblioteca";
            RUR.from_import = "from reeborg_pt import *";
            break;
        case "cn":
        case "en-cn":
            RUR.reset_definitions = RUR.reset_definitions_cn;
            RUR.library_name = "库";
            RUR.from_import = "from reeborg_cn import *";
            break;
        case "en":
        case "fr-en":
        case "pt-en":
        case "de-en":
        case "ko-en":
            RUR.reset_definitions = RUR.reset_definitions_en;
            RUR.library_name = "library";
            RUR.from_import = "from reeborg_en import *";
            break;
        default:
            RUR.library_name = "library";
            RUR.from_import = "from reeborg_en import *";
            RUR.reset_definitions = RUR.reset_definitions_en;
    }
    RUR.reset_definitions();
}

function update_home_url (lang) {
    switch(lang) {
        case "fr":
        case "fr-en":
            $("#logo").prop("href", "index_fr.html");
            break;
        case "cn":
        case "cn-en":
            $("#logo").prop("href", "index_cn.html");
            break;
        case "en":
        case "en-fr":
            $("#logo").prop("href", "index_en.html");
            break;
        default:
            $("#logo").prop("href", "index_en.html");
    }
}

RUR.listeners['human-language'] = function() {
    var lang = $(this).val();

    RUR.state.human_language = lang;
    update_translations(lang);
    msg.update_ui(lang);
    update_commands(lang);
    update_home_url(lang);
    RUR.make_default_menu(lang);

    RUR.blockly.init();

    if (RUR.state.programming_language == "python") {
        $("#editor-tab").html(RUR.translate("Python Code"));
    } else {
        $("#editor-tab").html(RUR.translate("Javascript Code"));
    }

    if (RUR.state.input_method == "py-repl") {
        try {
            restart_repl();
        } catch (e) {
            console.warn("Problem with human-language change: can not re/start repl", e);
        }
    }
    localStorage.setItem("human_language", lang);
    if (RUR.state.session_initialized) {
        RUR.permalink.update_URI();
    }
};

},{"./../../lang/msg.js":95,"./../permalink/permalink.js":21,"./../programming_api/blockly.js":25,"./../programming_api/reeborg_cn.js":30,"./../programming_api/reeborg_de.js":31,"./../programming_api/reeborg_en.js":32,"./../programming_api/reeborg_fr.js":33,"./../programming_api/reeborg_ko.js":34,"./../programming_api/reeborg_lt.js":35,"./../programming_api/reeborg_pl.js":36,"./../programming_api/reeborg_pt.js":37,"./../rur.js":44,"./../ui/custom_world_select.js":48}],53:[function(require,module,exports){
/*  Original idea from Dan Schellenberg for saving and loading a solution
    using standard keyboard shortcuts using the world's name as base file name
    and, if using Python, include the code from the library in the saved file.
*/

require("../rur.js");
require("./../translator.js");
require("./user_progress.js");
var remove_fileInput_listener = require("../listeners/onclick.js").remove_fileInput_listener;


function saveSolution() {
    /* Saves the solution (code in the editor and, if using Python,
    code in the library) for a given world in a single file.

    The base file name is taken to be the World's name, as it appears
    in the html selector.
    */
    var blob, extension, filename, filetype, parts, selectedWorld;

    selectedWorld = document.getElementById("select-world");

    filename = selectedWorld.options[selectedWorld.selectedIndex].text;
    // If the world was loaded from a URL without using a second argument
    // the filename might contain "/" which is an invalid filename character
    if (filename.indexOf("/") !== -1) {
        parts = filename.split("/");
        filename = parts[parts.length-1];
    }

    filename = RUR.strip_checkmark(filename); // remove marks for completed task.


    switch(RUR.state.input_method) {
        case "python":
            filetype = "text/python;charset=utf-8";
            extension = ".py";
            content = editor.getValue() + RUR.library_separator()+ library.getValue();
            break;
        case "blockly-py":
        case "blockly-js":
            filetype = "text/xml;charset=utf-8";
            extension = ".xml";
            content = RUR.blockly.getValue();
            break;
        case "javascript":
            filetype = "text/javascript;charset=utf-8";
            extension = ".js";
            content = editor.getValue();
            break;
        case "py-repl":
            alert(RUR.translate("No solution can be saved when using REPL (Py)."));
            return;
    }

    blob = new Blob([content], {type: filetype});
    saveAs(blob, filename + extension, true);
}


function loadSolution () {
    /* see saveSolution above */
    var fileInput;
    remove_fileInput_listener();
    $("#fileInput").click();
    fileInput = document.getElementById('fileInput');


    fileInput.addEventListener('change', function(e) {
        var file, reader;
        reader = new FileReader();
        reader.onload = function(e) {
            var content, parts, target;
            switch(RUR.state.input_method) {
                case "python":
                case "javascript":
                    target = editor;
                    break;
                case "blockly-py":
                case "blockly-js":
                    target = RUR.blockly;
                    break;
                case "py-repl":
                    alert(RUR.translate(
                            "No solution can be loaded when using REPL (Py).")
                         );
                    return;
            }
            content = reader.result;
            parts = content.split(RUR.library_separator());
            if (parts.length == 2) {
                library.setValue(parts[1]);
            }
            target.setValue(parts[0]);
            fileInput.value = '';
        };

        file = fileInput.files[0];
        // We assume that the file name has been saved with the default
        //    world name.py
        // where "world name" is the name of the corresponding world as
        // shown in the HTML select. We thus remove the .py extension
        // and try to load that world, for convenience.
        let worldToLoad = file.name.split(".")[0];
        let worldURL = RUR.world_selector.url_from_shortname(worldToLoad);
        if (worldURL !== undefined) {
            RUR.world_selector.set_url(worldURL);
        }
        //It could be a good idea to provide a UI dialogue if the world can't auto-load?
        // else {
        //     alert("Can't auto-load the correct world file... please select the correct world from the menu."));
        // }
        RUR.reload();
        reader.readAsText(file);
    });
}


document.onkeydown = function (e) {
    if (e.keyCode == 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
        e.preventDefault();
        saveSolution();
    }

    if (e.keyCode == 79 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
        e.preventDefault();
        loadSolution();
    }
};

$(document).ready(function() {
    $("#open-solution-btn").on("click", function (evt) {
    loadSolution();
    });
    $("#save-solution-btn").on("click", function (evt) {
        saveSolution();
    });
});



},{"../listeners/onclick.js":20,"../rur.js":44,"./../translator.js":46,"./user_progress.js":62}],54:[function(require,module,exports){
require("./../rur.js");
require("./../playback/play.js");
var record_id = require("./../../lang/msg.js").record_id;

record_id("pause");

RUR.pause = function (ms) {
    // ms can be a mouse event, if called from clicking on the pause button,
    // undefined, if called from a program without an argument,
    // or a number, if wanting to only temporarily pause from within a program.
    RUR.state.playback = false;
    clearTimeout(RUR._TIMER);
    $("#pause").attr("disabled", "true");
    if (ms !== undefined && typeof ms == "number"){ // pause called via a program instruction
        RUR._TIMER = setTimeout(RUR.play, ms);  // will reset RUR.state.playback to true
    } else {
        $("#run").removeAttr("disabled");
        $("#step").removeAttr("disabled");
        $("#reverse-step").removeAttr("disabled");
        $("#frame-selector").removeAttr("disabled").addClass("enabled").removeClass("disabled");
    }
};

},{"./../../lang/msg.js":95,"./../playback/play.js":22,"./../rur.js":44}],55:[function(require,module,exports){
require("./../rur.js");
require("./reload.js");
require("./../gui_tools/special_keyboard.js");
require("./../editors/create.js");
require("./../permalink/permalink.js");

var record_id = require("./../../lang/msg.js").record_id;

record_id("programming-mode");

/** @function onload_set_programming_language
 * @memberof RUR
 * @instance
 * @summary This function must ONLY be called from the Onload editor. It is
 * used to set which of two programming languages are allowed. If the
 * programming mode is compatible with that language, then it is not changed;
 * otherwise, it is change to the default mode (with Code editor) for
 * that language.
 *
 * **This should only be required if the world contains some content to
 * be run** (either in the editor, or in the pre- or post- code editors.)
 * Otherwise, do not use so that the world can be used using either programming
 * language.
 *
 * @param {string} language  Either `"python"` or `"javascript"`. If the language
 * is not recognized, it is set to `"python"`.
 *
 * @see RUR#onload_set_programming_mode
 * @see {@tutorial custom_goals} for more details about the example mentioned below.
 *
 * @example {@lang python}
 * # Execute the following and, after the world has loaded,
 * # click on **World Info** to see how this code is used.
 * World("worlds/examples/simple_path_explained.json")
 */

RUR.onload_set_programming_language = function(language) {
    if (!RUR.state.evaluating_onload) {
        alert("RUR.onload_set_programming_language should only be called from the 'Onload' editor.");
        return;
    }
    language = language.toLowerCase();  // make it more user-friendly
    if (language == "python") {
        if (!(RUR.state.input_method == "py-repl" ||
            RUR.state.input_method == "python" ||
            RUR.state.input_method == "blockly-py")) {
            RUR.onload_set_programming_mode("python");
        }
    } else if (language == "javascript") {
        if (!(RUR.state.input_method == "javascript" ||
            RUR.state.input_method == "blockly-js")) {
            RUR.onload_set_programming_mode("javascript");
        }
    } else {
        RUR.onload_set_programming_mode("python");
    }
};


/** @function onload_set_programming_mode
 * @memberof RUR
 * @instance
 * @summary This function must ONLY be called from the Onload editor. It is used
 * to specify which of five modes must be used for a given world.
 *
 * **This should only be required if the world contains some content to
 * be run** (either as blocks, in the editor, or in the pre- or post- code editors)
 * which does require a specific mode.
 * Otherwise, do not use so that the world can be used using all possible
 * programming modes.
 *
 * @param {string} mode  One of `["python", "javascript", "py-repl", "blockly-js", "blockly-py"]`.
 *   If the mode is not a recognized value, it will be set to `"python"`.
 *
 * @example
 * // shows how to switch mode to Blockly, where some blocks are already placed.
 * World("/worlds/examples/square_blockly.json", "Square")
 */

RUR.onload_set_programming_mode = function(mode) {
    if (!RUR.state.evaluating_onload) {
        alert("RUR.onload_set_programming_mode should only be called from the 'Onload' editor.");
        return;
    }
    mode = mode.toLowerCase(); // make it more user-friendly
    if (RUR.state.input_method == mode) {
        return;
    }

    /* When a world is imported from a program using World() or Monde(),
       and the onload editor contains a call to RUR.set_programming_mode,
       it might be useful to delay its execution so that any error thrown
       (e.g. info about changed world) be handled properly by the language
       used to run the original program.
     */
    setTimeout( function() {
        $("#programming-mode").val(mode);
        // the following will ensure that "python" is used as default if
        // the mode is not recognized as a valid one.
        $("#programming-mode").change();
    }, 100);
};

RUR.listeners['programming-mode'] = function () {
    "use strict";
    var choice = $('#programming-mode').val();
    RUR.state.input_method = choice;
    localStorage.setItem("input_method", choice);
    hide_everything();

    switch(choice) {
        case "python":
            RUR.state.programming_language = "python";
            $("#editor-tab").html(RUR.translate("Python Code"));
            show_editor("python");
            editor.setOption("readOnly", false);
            editor.setOption("theme", "reeborg-dark");
            try {
                $("#kbd-undo").show();
                $("#kbd-redo").show();
            } catch(e) {}
            break;
        case "javascript":
            RUR.state.programming_language = "javascript";
            $("#editor-tab").html(RUR.translate("Javascript Code"));
            show_editor("javascript");
            editor.setOption("readOnly", false);
            editor.setOption("theme", "reeborg-dark");
            try {
                $("#kbd-undo").show();
                $("#kbd-redo").show();
            } catch(e) {}
            break;
        case "blockly-py":
            RUR.state.programming_language = "python";
            $("#editor-tab").html(RUR.translate("Python Code"));
            show_blockly();
            editor.setOption("readOnly", true);
            editor.setOption("theme", "reeborg-readonly");
            break;
        case "blockly-js":
            RUR.state.programming_language = "javascript";
            $("#editor-tab").html(RUR.translate("Javascript Code"));
            show_blockly();
            editor.setOption("readOnly", true);
            editor.setOption("theme", "reeborg-readonly");
            break;
        case "py-repl":
            RUR.state.programming_language = "python";
            editor.setOption("readOnly", true);
            editor.setOption("theme", "reeborg-readonly");
            show_console();
            break;
        default:
            RUR.state.programming_language = "python";
            RUR.state.input_method = "python";
            $("#editor-tab").html(RUR.translate("Python Code"));
            show_editor("python");
            editor.setOption("readOnly", false);
            editor.setOption("theme", "reeborg-dark");
            console.warn(" Default value used in programming-mode select.");
    }
    RUR.kbd.set_programming_language(RUR.state.programming_language);
    RUR.permalink.update_URI();
    RUR.update_marks_in_world_selector();
};


record_id("editor-visible-input");
RUR.listeners['editor-visible-input'] = function () {
    if ($('#editor-visible-input')[0].checked) {
        show_editor(RUR.state.programming_language);
        $("#special-keyboard-button").hide();
    } else {
        hide_editors();
    }
};


function hide_everything () {
    /* By default, we start with a situation where everything is hidden
       and only show later the relevant choices for a given option */
    hide_blockly();
    hide_editors();
    hide_console();
    $("#frame-selector").hide();
    $("#frame-id").hide();
    $("#editor-visible-label").hide();
    $("#editor-visible-input").hide();
    if ($("#special-keyboard-button").hasClass("active-element")) {
        $("#special-keyboard-button").click();
    }
    $("#special-keyboard-button").hide();
    $("#python-additional-menu p button").attr("disabled", "true");
    $("#library-tab").parent().hide();
    $("#extra-tab").parent().hide();
    $("#highlight").hide();
    $("#watch-variables-btn").hide();
    $("#Reeborg-watches").dialog("close");
    try{
        $("#kbd-undo").hide();
        $("#kbd-redo").hide();
    } catch(e) {}

}

function show_blockly () {
    var style_enable = {"pointer-events": "auto", "opacity": 1};
    $("#save-blockly-btn").removeAttr("disabled");
    $(".blocklyToolboxDiv").css(style_enable);
    $("#blockly-wrapper").css(style_enable);
    // $("#blockly-wrapper").show();
    $("#editor-visible-label").show();
    $("#editor-visible-input").show();
    if ($('#editor-visible-input')[0].checked) {
        show_editor(RUR.state.programming_language);
        $("#special-keyboard-button").hide();
    }
    window.dispatchEvent(new Event('resize')); // important to ensure that blockly is visible
}

function hide_blockly () {
    var style_disable = {"pointer-events": "none", "opacity": 0.01};
    $("#save-blockly-btn").attr("disabled", "true");
    $(".blocklyToolboxDiv").css(style_disable);
    $("#blockly-wrapper").css(style_disable);
    // $("#blockly-wrapper").hide();
    window.dispatchEvent(new Event('resize'));
    $("#special-keyboard-button").show();
}

function show_editor(lang) {
    if (lang == "python") {
        show_python_editor();
    } else {
        show_javascript_editor();
    }
    $("#save-editor-btn").removeAttr("disabled");
    $("#editor-panel").addClass("active");
    $("#editor-tab").click();
    $("#special-keyboard-button").show();
    RUR.reload();
    editor.refresh();
    if (RUR.state.editing_world) {
        $("#pre-code-tab").parent().show();
        $("#post-code-tab").parent().show();
        $("#description-tab").parent().show();
        $("#onload-editor-tab").parent().show();
        $("#extra-tab").parent().hide();
    }
}

function show_javascript_editor () {
    editor.setOption("mode", "javascript");
    onload_editor.setOption("mode", "javascript"); // could be changed in import_world
    pre_code_editor.setOption("mode", "javascript");
    post_code_editor.setOption("mode", "javascript");
}

function show_python_editor () {
    editor.setOption("mode", {name: "python", version: 3});
    onload_editor.setOption("mode", {name: "python", version: 3}); // could be changed in import_world
    pre_code_editor.setOption("mode", {name: "python", version: 3});
    post_code_editor.setOption("mode", {name: "python", version: 3});

    RUR.state.highlight = RUR.state.highlight || RUR.state._saved_highlight_value;
    $("#library-tab").parent().show();
    if (RUR.state.extra_code_visible) {
        $("#extra-tab").parent().show();
    }
    $("#highlight").show();
    $("#watch-variables-btn").show();
    $("#python-additional-menu p button").removeAttr("disabled");
}


function hide_editors() {
    $("#save-editor-btn").attr("disabled", "true");
    $("#save-library-btn").attr("disabled", "true");
    if (RUR.state.programming_language == "python") {
        RUR.state._saved_highlight_value = RUR.state.highlight;
        RUR.state.highlight = false;
    }
    $("#editor-panel").removeClass("active");
    // extra editors
    $("#pre-code-tab").parent().hide();
    $("#post-code-tab").parent().hide();
    $("#description-tab").parent().hide();
    $("#onload-editor-tab").parent().hide();
}

function show_console() {
    $("#editor-visible-label").show();
    $("#editor-visible-input").show();
    $("#special-keyboard-button").show();
    $("#py-console").show();
    $("#stop").hide();
    $("#pause").hide();
    $("#run").hide();
    $("#step").hide();
    $("#reverse-step").hide();
    $("#reload").hide();
    $("#reload2").show();
    $("#reload2").removeAttr("disabled");
    $("#open-solution-btn").hide();
    $("#save-solution-btn").hide();
    _start_repl();
}

function _start_repl() {
    try {
        restart_repl();
    } catch (e) {
        console.log("_start_repl: failure; Will try again in 200ms.");
        window.setTimeout(_start_repl, 200);
    }
}

function hide_console() {
    $("#py-console").hide();
    $("#open-solution-btn").show();
    $("#save-solution-btn").show();
    $("#stop").show();
    $("#pause").show();
    $("#run").show();
    $("#step").show();
    $("#reverse-step").show();
    $("#reload").show();
    $("#reload2").hide();
}

},{"./../../lang/msg.js":95,"./../editors/create.js":11,"./../gui_tools/special_keyboard.js":14,"./../permalink/permalink.js":21,"./../rur.js":44,"./reload.js":56}],56:[function(require,module,exports){
require("./../rur.js");
require("./../recorder/reset.js");
var record_id = require("./../../lang/msg.js").record_id;

record_id("reload");
record_id("reload2");


function set_ui_ready_to_run () {
    RUR.state.prevent_playback = false;
    $("#stop").attr("disabled", "true");
    $("#pause").attr("disabled", "true");
    $("#run").removeAttr("disabled");
    $("#step").removeAttr("disabled");
    $("#reverse-step").attr("disabled", "true");
    $("#reload").attr("disabled", "true");

    $("#highlight").removeAttr("disabled");
    $("#watch-variables-btn").removeAttr("disabled");

    $("#open-solution-btn").removeAttr("disabled");
    $("#save-solution-btn").removeAttr("disabled");

    $("#frame-selector").hide();
    $("#frame-id").hide();
}


$(document).ready(function () {
    set_ui_ready_to_run();
});


RUR.reload = function() {
    set_ui_ready_to_run();
    RUR.reload2();
    $("#highlight-impossible").hide();
};

RUR.reload2 = function() {
    $("#stdout").html("");
    $(".view_source").remove();
    $("#print-html").html("");
    $("#turtle-canvas").remove();
    RUR.hide_end_dialogs();
    $("#watch-variables").html("");
    RUR.reset_world();
    if (RUR.state.input_method == "py-repl") {
        try {
            restart_repl();
        } catch (e) {
            console.log("RUR.reload2: can not re/start repl", e);
        }
    }
};

},{"./../../lang/msg.js":95,"./../recorder/reset.js":40,"./../rur.js":44}],57:[function(require,module,exports){

require("./../rur.js");
require("./reload.js");
require("./../runner/runner.js");
require("./../playback/play.js");
var record_id = require("./../../lang/msg.js").record_id;

record_id("run");

RUR.listeners.run = function () {
    if (RUR.state.code_evaluated) {
        run();
    } else {
        $("#thought").show();
        setTimeout(run, 15); //  enough time for thought bubble to appear
    }
};

function run() {
    $("#stop").removeAttr("disabled");
    $("#pause").removeAttr("disabled");
    $("#run").attr("disabled", "true");
    $("#step").attr("disabled", "true");
    $("#reverse-step").attr("disabled", "true");
    $("#reload").attr("disabled", "true");
    
    $("#frame-selector").attr("disabled", "true").addClass("disabled").removeClass("enabled");
    $("#frame-selector").show();
    $("#frame-id").show();

    $("#highlight").attr("disabled", "true");
    $("#watch-variables-btn").attr("disabled", "true");

    $("#open-solution-btn").attr("disabled", "true");
    $("#save-solution-btn").attr("disabled", "true");

    clearTimeout(RUR._TIMER);
    RUR.runner.run(RUR.play);
    $("#thought").hide();
}

},{"./../../lang/msg.js":95,"./../playback/play.js":22,"./../runner/runner.js":42,"./../rur.js":44,"./reload.js":56}],58:[function(require,module,exports){

require("./../rur.js");
require("./../runner/runner.js");
require("./../recorder/recorder.js");
var record_id = require("./../../lang/msg.js").record_id;

record_id("step");
record_id("reverse-step");


RUR.listeners.step = function () {
    if (RUR.state.code_evaluated) {
        step();
    } else {
        $("#thought").show();
        setTimeout(step, 15); //  enough time for thought bubble to appear
    }
};

function step() {
    RUR.runner.run(RUR.rec.display_frame);
    $("#thought").hide();

    $("#stop").removeAttr("disabled");
    $("#reverse-step").removeAttr("disabled");
    $("#frame-selector").removeAttr("disabled").addClass("enabled").removeClass("disabled");
    $("#frame-selector").show();
    $("#frame-id").show();
    clearTimeout(RUR._TIMER);

    $("#highlight").attr("disabled", "true");
    $("#watch-variables-btn").attr("disabled", "true");

    $("#open-solution-btn").attr("disabled", "true");
    $("#save-solution-btn").attr("disabled", "true");
}

RUR.listeners.reverse_step = function () {
    RUR.current_frame_no -= 2;  // see below call to RUR.rec.display_frame
    if (RUR.current_frame_no < 0){
        $("#reverse-step").attr("disabled", "true");
    }
    $("#frame-selector").removeAttr("disabled").addClass("enabled").removeClass("disabled");
    RUR.rec.display_frame(); // increments the current_frame_no by 1
    $("#stop").removeAttr("disabled");
    clearTimeout(RUR._TIMER);
};


},{"./../../lang/msg.js":95,"./../recorder/recorder.js":39,"./../runner/runner.js":42,"./../rur.js":44}],59:[function(require,module,exports){

require("./../rur.js");
var record_id = require("./../../lang/msg.js").record_id;

record_id("stop");

RUR.stop = function () {
    clearTimeout(RUR._TIMER);
    $("#stop").attr("disabled", "true");
    $("#pause").attr("disabled", "true");
    $("#run").attr("disabled", "true");
    $("#step").attr("disabled", "true");
    $("#reverse-step").attr("disabled", "true");
    $("#reload").removeAttr("disabled");
};

},{"./../../lang/msg.js":95,"./../rur.js":44}],60:[function(require,module,exports){
require("./../rur.js");
var record_id = require("./../../lang/msg.js").record_id;

record_id("highlight");

RUR.toggle_highlight = function () {  // keep part of RUR for Python
    if (RUR.state.highlight) {
        RUR.state.highlight = false;
        $("#highlight").addClass("blue-gradient");
        $("#highlight").removeClass("active-element");
    } else {
        RUR.state.highlight = true;
        $("#highlight").addClass("active-element");
        $("#highlight").removeClass("blue-gradient");
    }
};

},{"./../../lang/msg.js":95,"./../rur.js":44}],61:[function(require,module,exports){

require("./../rur.js");
var record_id = require("./../../lang/msg.js").record_id;

record_id("watch-variables-btn");

toggle_watch_variables = function () {
    if (RUR.state.watch_vars) {
        RUR.state.watch_vars = false;
        $("#watch-variables-btn").addClass("blue-gradient");
        $("#watch-variables-btn").removeClass("active-element");
        $("#watch-variables").html("");
        $("#Reeborg-watches").dialog("close");
    } else {
        RUR.state.watch_vars = true;
        $("#watch-variables-btn").addClass("active-element");
        $("#watch-variables-btn").removeClass("blue-gradient");
        $("#watch-variables").html("");
        $("#Reeborg-watches").dialog("open");
    }
};

},{"./../../lang/msg.js":95,"./../rur.js":44}],62:[function(require,module,exports){
/* Attempt at creating a way for users to follow their progress */

require("../rur.js");
require("../utils/key_exist.js");
require("./../translator.js");
var record_id = require("./../../lang/msg.js").record_id;
var remove_fileInput_listener = require("../listeners/onclick.js").remove_fileInput_listener;


/* This function updates a single name in the world selector,
   to either add or remove a checkmark */
function update_name_in_world_selector (name, remove) {
    var options = $("#select-world")[0].options;
    for (var i=0; i<options.length; i++) {
        if (remove) {
            if (RUR.strip_checkmark(options[i].innerHTML) == name) {
                options[i].innerHTML = name;
                break;
            }
        } else if (options[i].innerHTML == name) {
            options[i].innerHTML = name + RUR.CHECKMARK;
            break;
        }
    }
}

/* This function is intended to be called when a programming language is
   changed, so as to update the "checkmarks" in the world selector.
 */

RUR.update_marks_in_world_selector = function() {
    var prog_method, menu, options, name;

    options = $("#select-world")[0].options;
    for (var i=0; i<options.length; i++) {
        options[i].innerHTML = RUR.strip_checkmark(options[i].innerHTML);
    }

    prog_method = _get_programming_method();
    if (RUR.state.user_progress[prog_method] == undefined) {
        return;
    }
    menu = RUR.state.user_progress[prog_method][RUR.state.current_menu];
    if (menu == undefined) {
        return;
    }

    for (var i=0; i<options.length; i++) {
        name = options[i].innerHTML;
        if (menu.includes(name)) {
            options[i].innerHTML = name + RUR.CHECKMARK;
        }
    }
};


RUR.strip_checkmark = function (name) {
    return name.replace(RUR.CHECKMARK, '');
};

/* Add a checkmark only if the world has been solved.
*/
RUR.add_checkmark = function (name) {
    var prog_method, menu;

    if (name.substring(0,11) === "user_world:"){
        return name;
    }

    prog_method = _get_programming_method();
    if (RUR.state.user_progress[prog_method] === undefined) {
        return name;
    }

    menu = RUR.state.user_progress[prog_method][RUR.state.current_menu];
    if (menu !== undefined && menu.includes(name)) {
        return name += RUR.CHECKMARK;
    }
    return name;
};

RUR.update_progress = function(){
    var world_name, prog_method, world = RUR.get_current_world();
    if (!RUR.state.current_menu) {
        return;
    }
    if (RUR.state.input_method == "py-repl") {
        return;
    }
    if (world.goal === undefined && world.post === undefined) {
        return;   // this world does not have anything that needs to be solved.
    }
    world_name = RUR.state.world_name;
    if (!world_name) {
        return;
    }
    if (world_name.substring(0,11) === "user_world:"){
        return;
    }
    prog_method = _get_programming_method();
    if (prog_method == "invalid") {
        return;
    }
    RUR.utils.ensure_key_for_obj_exists(RUR.state.user_progress, prog_method);
    RUR.utils.ensure_key_for_array_exists(RUR.state.user_progress[prog_method], RUR.state.current_menu);
    if (!RUR.state.user_progress[prog_method][RUR.state.current_menu].includes(world_name)) {
        RUR.state.user_progress[prog_method][RUR.state.current_menu].push(world_name);
    }
    update_name_in_world_selector(world_name);
    localStorage.setItem("user-progress", JSON.stringify(RUR.state.user_progress));
    save_user_solution();
};

function _get_programming_method() {
    var programming_method, input_method;
    input_method = localStorage.getItem("input_method");
    if (input_method == "blockly-py" || input_method == "blockly-js") {
        programming_method = "blockly";
    } else if (input_method == "javascript") {
        programming_method = "javascript";
    } else if (input_method == "python") {
        programming_method = "python";
    } else {
        programming_method = "invalid"; // value not used for saving progress
    }
    return programming_method;
}

/* The first implementation of user progress kept track of world collections (menu)
   and world names, regardless of the programming method used 
   (blockly, Python code, Javascript code).
   The new version, which is introduced just a few months after the intial
   implementation, allows users to try to solve a given world using different
   methods, and keep track of progress using each. 
   When we retrieve the progress status from local storage, we might need
   to convert from the old implementation to the new one.
   We guess the conversion based on the current input method which should be
   the last one used.

 */
function _retrieve_progress () {
    var prog_method, progress, user_progress, valid_methods, i;
    valid_methods = ["python", "javascript", "blockly"];
    progress = localStorage.getItem("user-progress");
    prog_method = _get_programming_method();

    user_progress = {}
    if (progress) {
        try {
            user_progress = JSON.parse(progress);
            if (user_progress == null || typeof user_progress == "string") {
                user_progress = {};
            }
        } catch (e) {}
    }

    for(i=0; i<valid_methods.length; i++){
        if (user_progress[valid_methods[i]] !== undefined){
            RUR.state.user_progress = user_progress;  // no conversion needed            
            return;
        }
    }
    RUR.state.user_progress[prog_method] = user_progress;
    localStorage.setItem("user-progress", JSON.stringify(RUR.state.user_progress));    
}
_retrieve_progress();


function _retrieve_user_solutions () {
    solutions = localStorage.getItem("user-solutions");
    if (solutions) {
        try {
            solutions = JSON.parse(solutions);
        } catch (e) {
            solutions = {};
        }
        
    } else {
        solutions = {};
    }
    RUR.state.user_solutions = solutions;
}
_retrieve_user_solutions();


function save_progress() {
    var blob, combined;

    combined = JSON.stringify({'progress': RUR.state.user_progress,
                'solutions': RUR.state.user_solutions});

    blob = new Blob([combined], {type: "text/javascript;charset=utf-8"});
    saveAs(blob, "progress.json", true);
}

// From https://stackoverflow.com/a/8764974/558799
function mergeRecursive(obj1, obj2) {
  if (Array.isArray(obj2)) { return obj1.concat(obj2); }
  for (var p in obj2) {
    try {
      // Property in destination object set; update its value.
      if ( obj2[p].constructor==Object ) {
        obj1[p] = mergeRecursive(obj1[p], obj2[p]);
      } else if (Array.isArray(obj2[p])) {
        obj1[p] = obj1[p].concat(obj2[p]);
      } else {
        obj1[p] = obj2[p];
      }
    } catch(e) {
      // Property in destination object not set; create it and set its value.
      obj1[p] = obj2[p];
    }
  }
  return obj1;
}


function import_progress () {
    var fileInput;
    remove_fileInput_listener();
    $("#fileInput").click();
    fileInput = document.getElementById('fileInput');

    fileInput.addEventListener('change', function(e) {
        var file, reader;
        reader = new FileReader();
        reader.onload = function(e) {
            var content = reader.result, progress, combined, solutions;
            try {
                combined = JSON.parse(content);
                progress = combined['progress'];
                solutions = combined['solutions'];
            } catch (e2) {
                alert(RUR.translate("Cannot parse progress file."));
                return;
            }
            try {
                RUR.state.user_progress = mergeRecursive(RUR.state.user_progress, progress);
                localStorage.setItem("user-progress", JSON.stringify(RUR.state.user_progress));
                RUR.state.user_solutions = mergeRecursive(RUR.state.user_solutions, solutions);
                localStorage.setItem("user-solutions", JSON.stringify(RUR.state.user_solutions));
                refresh_world_selector();
            } catch (e) {
                alert(RUR.translate("Cannot merge progress."));
            }
            fileInput.value = '';
        };

        file = fileInput.files[0];
        reader.readAsText(file);
    });
}

function refresh_world_selector() {
    "use strict";
    var badges, menu, prog_method, world_name, options = $("#select-world")[0].options;
    prog_method = _get_programming_method();
    if (RUR.state.user_progress[prog_method] === undefined) {
        return;
    }
    menu = RUR.state.current_menu;
    badges = RUR.state.user_progress[prog_method][menu];
    if (badges === undefined) {
        return;
    }

    for (var i=0; i<options.length; i++) {
        world_name = RUR.strip_checkmark(options[i].innerHTML);
        if (badges.includes(world_name)) {
            options[i].innerHTML = world_name + RUR.CHECKMARK;
        }
    }
}

/** @function unmark_task
 * @memberof RUR
 * @instance
 * @summary Removes the tasks from the list of completed tasks. If the task
 * cannot be found, the function will fail silently.
 * Useful for testing interactively.
 *
 * @param {string} name The name of task as it appears in the world selector, 
 * like `Home 1`.
 *
 */

RUR.unmark_task = function (name) {
    var tasks, remove=true;
    if (RUR.state.user_progress[prog_method] === undefined) {
        return;
    }
    tasks = RUR.state.user_progress[prog_method][RUR.state.current_menu];
    if (tasks === undefined) {
        return;
    }
    if (!tasks.includes(name)) {
        return;
    } 
    tasks.splice(tasks.indexOf(name), 1);
    RUR.state.user_progress[prog_method][RUR.state.current_menu] = tasks;
    update_name_in_world_selector(name, remove);
    localStorage.setItem("user-progress", JSON.stringify(RUR.state.user_progress));
};


record_id('save-progress-btn', "SAVE PROGRESS");
record_id('import-progress-btn', "IMPORT PROGRESS");
record_id('retrieve-solution-btn', "RETRIEVE SOLUTION")
$(document).ready(function() {
    $("#save-progress-btn").on("click", function (evt) {
        save_progress();
    });
    $("#import-progress-btn").on("click", function (evt) {
        import_progress();
        try {
            $("#more-menus").dialog("close");
        } catch (e) {}
    });

    $("#retrieve-solution-btn").on("click", function (evt) {
        retrieve_user_solution();
    });

});


// Do not change the value of library_separator()as it could break
// some programs saved previously. Note that it will be different for each
// human language - provided that a translation exists.

RUR.library_separator = function () {  // also used in keyboard_shortcuts.js
    return "\n" +
    "################################################################\n# " +
    RUR.translate("WARNING: Do not change this comment.") +    
    "\n# " + RUR.translate("Library Code is below.") +  
    "\n################################################################\n";
}

// save solution for a given world
function save_user_solution () {
    var prog_method;
    prog_method = _get_programming_method();
    switch(prog_method) {
        case "python":
            content = editor.getValue() + RUR.library_separator()+ library.getValue();
            break;
        case "blockly":
            content = RUR.blockly.getValue();
            break;                 
        case "javascript":
            content = editor.getValue();
            break;      
        default:
            return;  
    }
    RUR.utils.ensure_key_for_obj_exists(RUR.state.user_solutions, prog_method);
    RUR.utils.ensure_key_for_obj_exists(RUR.state.user_solutions[prog_method], RUR.state.current_menu);
    try {
        RUR.utils.ensure_key_for_obj_exists(
            RUR.state.user_solutions[prog_method][RUR.state.current_menu], 
            RUR.state.world_name);
        RUR.state.user_solutions[prog_method][RUR.state.current_menu][RUR.state.world_name] = content;
        localStorage.setItem("user-solutions", JSON.stringify(RUR.state.user_solutions));
    } catch (e) {
        console.log("problem in save_user_solution", e);
        console.log("   world_name = ", RUR.state.world_name);
        console.log("   current_menu = ", RUR.state.current_menu);
    }

}

// retrieves user solution if it is found
retrieve_user_solution = function () {
    "use strict";
    var prog_method, parts, solution=undefined;
    prog_method = _get_programming_method();

    if (RUR.state.user_solutions[prog_method] &&
        RUR.state.user_solutions[prog_method][RUR.state.current_menu]
        ) {
        solution = RUR.state.user_solutions[prog_method][RUR.state.current_menu][RUR.state.world_name];
    }

    if (!solution) {
        alert(RUR.translate("No solution found for this world."));
        return;
    }

    switch(prog_method) {
        case "python":
            parts = solution.split(RUR.library_separator());
            if (parts.length == 2) {
                library.setValue(parts[1]);
            }
            editor.setValue(parts[0]);
            break;
        case "blockly":
            RUR.blockly.setValue(solution);
            break;                 
        case "javascript":
            editor.setValue(solution);
            break;      
        default:
            console.log("default should never be called in RUR.retrieve_user_solution");
            return;  
    }
}

},{"../listeners/onclick.js":20,"../rur.js":44,"../utils/key_exist.js":66,"./../../lang/msg.js":95,"./../translator.js":46}],63:[function(require,module,exports){
/*  Purpose of this file: abstract handling of menus so that all jQuery
    dependencies (and possibly obscure syntax in some cases) can be pulled
    away from other files.
*/
require("../rur.js");
require("./user_progress.js");
require("../permalink/permalink.js");

var record_id = require("./../../lang/msg.js").record_id;
record_id("select-world");


RUR.listeners['select-world.change'] = function() {
    var url, name;
    if (RUR.state.creating_menu){
        return;
    }

    url = $("#select-world").val();
    name = $("#select-world").find(':selected').text();
    name = RUR.strip_checkmark(name);

    RUR.load_world_file(url, name);

    localStorage.setItem("world_name", name);
    localStorage.setItem("world_url", url);
    RUR.state.world_url = url;
    RUR.state.world_name = name;
    RUR.permalink.update_URI();
};


RUR.world_selector = {};
RUR.world_selector.update = function () {
    $("#select-world").change();
};

RUR.world_selector.empty_menu = function () {
    $("#select-world").html('');
};

RUR.world_selector.set_default = function () {
    document.getElementById("select-world").selectedIndex = 0;
    $("#select-world").change();
};

RUR.world_selector.set_url = function (url) {
    $('#select-world').val(url);
    $("#select-world").change();
};

RUR.world_selector.get_selected = function () {
    "use strict";
    var select, index, url, shortname;
    select = document.getElementById("select-world");
    index = select.selectedIndex;
    try {
        url = select.options[index].value;
        shortname = select.options[index].text;
    } catch (e) {
        url = select.options[0].value;
        shortname = select.options[0].text;
    }
    return {url:url, shortname:shortname};
};

RUR.world_selector.url_from_shortname = function (shortname) {
    // if exists, returns the corresponding url
    "use strict";
    var i, select, name;
    if (!shortname){  // shortname could be null
        return undefined;
    }
    select = document.getElementById("select-world");
    shortname = RUR.strip_checkmark(shortname.toLowerCase());

    for (i=0; i < select.options.length; i++){
        name = select.options[i].text.toLowerCase();
        name = RUR.strip_checkmark(name);
        if (name === shortname) {
            return select.options[i].value;
        }
    }
    return undefined;
};

RUR.world_selector.replace_shortname = function (url, shortname) {
    "use strict";
    var i, select;
    select = document.getElementById("select-world");
    url = url.toLowerCase();

    for (i=0; i < select.options.length; i++){
        if (select.options[i].value.toLowerCase() === url) {
            select.options[i].text = shortname;
            return true;
        }
    }
    return false;
};

RUR.world_selector.append_world = function (arg) {
    "use strict";
    var option_elt, url, shortname;
    url = arg.url;

    if (arg.shortname !== undefined) {
        shortname = RUR.add_checkmark(arg.shortname);
    } else {
        shortname = url;
    }

    if (!url) {
        console.trace();
        console.log("cannot append; url = ", url);
        return;
    }

    // allow for special styling of any url containing the string "menu".
    if (url.toLowerCase().indexOf('menu') != -1) {
        option_elt = '<option class="select-menu"></option>';
    } else if (arg.local_storage !== undefined){
        option_elt = '<option class="select-local-storage"></option>';
    } else {
        option_elt = '<option></option>';
    }
    // Append only if new world.
    if (!RUR.world_selector.replace_shortname(url, shortname)) {
        $('#select-world').append( $(option_elt).val(url).html(shortname));
    }
};

},{"../permalink/permalink.js":21,"../rur.js":44,"./../../lang/msg.js":95,"./user_progress.js":62}],64:[function(require,module,exports){
;
// from http://stackoverflow.com/questions/15005500/loading-cross-domain-html-page-with-jquery-ajax

// will modify a global object - no need to export anything.
$.ajaxPrefilter( function (options) {
  if (options.crossDomain && jQuery.support.cors) {
    var http = (window.location.protocol === 'http:' ? 'http:' : 'https:');
    options.url = http + '//cors-anywhere.herokuapp.com/' + options.url;
  }
});

},{}],65:[function(require,module,exports){
/*
    Original script title: "Object.identical.js"; version 1.12
    Copyright (c) 2011, Chris O'Brien, prettycode.org
    http://github.com/prettycode/Object.identical.js

    Modified to assume that order of arrays is irrelevant
    (which it should be since this is meant to be used to
    compare worlds.)  Also adapted to ignore empty objects
    when doing comparison; for worlds, only non-empty objects
    are meaningful and can be compared.
*/

exports.identical = identical = function (a, b) {
    if (a===b) {
        return true;
    }
    // make copies to avoid chaning the original
    if (a !== undefined) {
        a = JSON.parse(JSON.stringify(a));
    }
    if (b !== undefined) {
        b = JSON.parse(JSON.stringify(b));
    }


    function sort(object) {
        if (object === undefined) {
            return undefined;
        }
        if (Array.isArray(object)) {
            return object.sort();
        }
        else if (typeof object !== "object" || object === null) {
            return object;
        } else if (Object.keys(object).length === 0){
            return undefined;
        }

        return Object.keys(object).sort().map(function(key) {
            return {
                key: key,
                value: sort(object[key])
            };
        });
    }

    return JSON.stringify(sort(a)) === JSON.stringify(sort(b));
};


},{}],66:[function(require,module,exports){
require("./../rur.js");
/* short functions to make the rest of the code easier
   to read */

RUR.utils.ensure_key_for_obj_exists = function(obj, key){
    "use strict";
    if (obj[key] === undefined){
        obj[key] = {};
    // } else if ((Object.prototype.toString.call(obj[key]) != "[object Object]") && (Object.prototype.toString.call(obj[key]) != "[object String]")) {
    } else if (Object.prototype.toString.call(obj[key]) !== "[object Object]") {
        throw Error("Expected an object in RUR.utils.ensure_key_for_obj_exists.");
    }
};

RUR.utils.ensure_key_for_array_exists = function(obj, key){
    "use strict";
    if (obj[key] === undefined){
        obj[key] = [];
    } else if (Object.prototype.toString.call(obj[key]) !== "[object Array]") {
        throw Error("Expected an array in RUR.utils.ensure_key_for_array_exists.");
    }
};

},{"./../rur.js":44}],67:[function(require,module,exports){
require("./../rur.js");
var random = require("./../utils/random.js");
var shuffle = random.shuffle;
var randint = random.randint;

var default_palette;

default_palette = {
    'start': 'rgb(0, 190, 0)',
    'two way': 'rgba(255, 255, 0, 0.2)',
    'end': 'rgba(255, 0, 0, 0.7)',
    'three way': 'rgba(0, 0, 255, 0.1)',
    'four way': 'rgb(160, 0, 160)',
    'in room': 'gravel'
};


function set_custom_palette(user_palette, maze){
    "use strict";
    var i, key, keys;
    keys = Object.keys(user_palette);
    for(i=0; i < keys.length; i++) {
        key = keys[i];
        maze.palette[key] = user_palette[key];
    }
}

function color_tile(color, x, y) {
    // accept either background tile or color for flexibility
    var maze = RUR.get_current_world().maze;
    if (maze.use_colors === undefined) {
        return;
    }
    if(RUR.KNOWN_THINGS.indexOf(RUR.translate_to_english(color)) != -1){
        RUR.add_background_tile(color, x, y);
    } else {
        RUR.add_colored_tile(color, x, y);
    }
}

function update_color(x, y) {
    "use strict";
    // update color at location based on characteristics:
    // inside a room
    // starting point (fixed color)
    // number of walls surrounding the tile
    var color, walls, maze;
    maze = RUR.get_current_world().maze;
    if (maze.use_colors === undefined) {
        return;
    }
    if (RUR.in_room(x, y, maze.rooms)) {
        color = maze.palette["in room"];
    } else if(x == maze.start.x && y == maze.start.y) {
        color = maze.palette["start"];
    } else {
        walls = 0;
        if (RUR._is_wall("north", x, y)) {
            walls++;
        }
        if (RUR._is_wall("east", x, y)) {
            walls++;
        }
        if (RUR._is_wall("south", x, y)) {
            walls++;
        }
        if (RUR._is_wall("west", x, y)) {
            walls++;
        }
        switch (walls){
            case 1:
                color = maze.palette['three way'];
                break;
            case 2:
                color = maze.palette['two way'];
                break;
            case 3:
                color = maze.palette['end'];
                break;
            case 0:
                color = maze.palette['four way'];
                break;
            default:
                color = "black";
        }
    }
    color_tile(color, x, y);
}

/** @function in_room
 * @memberof RUR
 * @instance
 *
 * @desc This is meant to be used with mazes.  Given an array of rooms,
 * which for a maze is `maze.rooms`, this function returns `true` if the
 * point `(x, y)` is within one of the rooms, and false otherwise.
 */

RUR.in_room = function (x, y, rooms) {
    "use strict";
    // returns true if the point is within an existing room
    var r, room;
    for (r=0; r < rooms.length; r++) {
        room = rooms[r];
        if (x >= room.x_min && x < room.x_max && y >= room.y_min && y < room.y_max) {
            return true;
        }
    }
    return false;
};


/** @function delete_maze_info
 * @memberof RUR
 * @instance
 *
 * @desc Selectively delete maze info. If not argument is included,
 * the entire maze information is deleted from the world definition.
 */

RUR.delete_maze_info = function() {
    var i, world = RUR.get_current_world();
    if (arguments.length === 0) {
        delete world.maze;
        return;
    }
    for (i = 0; i < arguments.length; i++) {
        delete world.maze[arguments[i]];
    }
};


function open_single_door(x, y, room, direction) {
    "use strict";
    if (direction == "west") {
        x = room.x_min;
    } else if (direction == "east") {
        x = room.x_max - 1;
    } else if (direction == "north") {
        y = room.y_max - 1;
    } else if (direction == "south") {
        y = room.y_min;
    }
    try {
        RUR.remove_wall(direction, x, y);
        return {direction: direction, x:x, y:y};
    } catch(e) { // world boundary walls cannot be removed
        return false;
    }

}


function open_doors(room, nb_doors_goal) {
    "use strict";
    var directions, i, x, y, open = 0, door;
    x = room.x_min + randint(room.x_max-room.x_min);
    y = room.y_min + randint(room.y_max-room.y_min);
    directions = ["east", "west", "north", "south"];
    shuffle(directions);
    for (i=0; i < directions.length; i++) {
        door = open_single_door(x, y, room, directions[i]);
        if (door) {
            room.doors.push(door);
            open++;
            if (open==nb_doors_goal) {
                return;
            }
        }
    }
}

function fit_non_overlapping_rooms(world_width, world_height) {
    /* Given a goal of N rooms, makes 5*N^2 attempt to randomly find spaces
       for putting rooms that are entirely contained with the world and
        do not overlap with each other */
    "use strict";
    var i, nb_attempts, nb_rooms, nb_rooms_goal, overlap, x, y, xx, yy, width, height,
        maze;

    maze = RUR.get_current_world().maze;

    i = 0;
    nb_rooms = 0;
    nb_rooms_goal = maze.nb_rooms_goal;
    nb_attempts = 5 * nb_rooms_goal * nb_rooms_goal;

    while (i < nb_attempts) {
        i++;
        if (maze.room_max_width) {
            width = maze.room_width + randint(maze.room_max_width - maze.room_width);
        } else {
            width = maze.room_width;
        }
        if (maze.room_max_height) {
            height = maze.room_height + randint(maze.room_max_height - maze.room_height);
        } else {
            height = maze.room_height;
        }

        x = randint(world_width - width + 1) + 1;
        y = randint(world_height - height + 1) + 1;
        overlap = false;
        overlap_loop:
        for (xx=x-1; xx <= x+width; xx++){
            for (yy=y-1; yy <= y+height; yy++) {
                if (RUR.in_room(xx, yy, maze.rooms)) {
                    overlap = true;
                    break overlap_loop;
                }
            }
        }
        if (!overlap) {
            maze.rooms.push({x_min:x, y_min:y, x_max:x+width, y_max:y+height,
            doors: []});
            nb_rooms++;
            if (nb_rooms == nb_rooms_goal) {
                return;
            }
        }
    }
}

function init_maze(world) {
    world.maze = {};
    world.maze.rooms = [];
    world.maze.start = {};
    world.maze.palette = {};
}

/** @function create_maze
 * @memberof RUR
 * @instance
 *
 * @desc Creates a maze of a specified size. This is done with a
 * depth-search wall removal algorithm.<br><br>
 *
 * **Note**: When `options.recording` is set to `true`, the number of
 * steps required to build and show the maze is `max_x * max_y + 3`;
 * if required, use `set_max_nb_steps()` to increase the default limit
 * of 1000.<br><br>
 *
 * **For the palette**: any color value recognized by html/javascript
 * (i.e. `red`, `rgb(126, 230, 0)`, `#ffc356`, etc., can be used).
 *
 * @param {integer} max_x The width of the world.
 * @param {integer} max_y The height of the world.
 * @param {object} [options]
 * @param {bool} [options.small_tiles] Indicates if small tiles must be used.
 * This is useful for larger mazes
 * @param {bool} [options.recording] If `true`, the walls being removed
 * will be shown as they are removed one by one, in a series of frames.
 * This is only useful for demonstration, and will only visible if the
 * maze is created as part of the Pre code or the main code - but not in
 * the Onload phase.
 * @param {bool} [options.use_colors] If `true`, the path construction will be
 * shown using a pre-defined color scheme, indicating the starting point,
 * and the branching points.
 * @param {bool} [options.visible_grid] If `true`, the grid will be (possibly more) visible.
 * This is equivalent to writing `RUR.state.visible_grid = true` in your program.
 * This might be useful if you have `options.use_colors == true` and choose a
 * custom palette with opaque colors.
 * @param {obj} [options.palette] An optional color palette. You can replace
 * any or all of the default colors.
 * @param {string} [options.palette['start']] Color to use as starting point.
 * @param {string} [options.palette['end']] Color used to indicate that we have
 * reached a dead end.
 * @param {string} [options.palette['two way']] Color to use in "corridors".
 * @param {string} [options.palette['three way']] Color to use in simple junctions.
 * @param {string} [options.palette['four way']] This happens relatively rarely:
 * it correspond to a grid square not in a room but open on all sides.
 *
 */
RUR.create_maze = function (max_x, max_y, options) {
    "use strict";
    var world, available_area, max_area, room_max_width, room_max_height;
    world = RUR.create_empty_world();
    if (options && options.small_tiles) {
        world.small_tiles = true;
    }
    RUR.set_current_world(world);
    init_maze(world);
    RUR.set_world_size(max_x, max_y);
    RUR._recording_(false);
    fill_walls(max_x, max_y);
    if (options) {
        if (options.use_colors) {
            world.maze.use_colors = true;
            set_custom_palette(default_palette, world.maze);
            if (options.palette) { // selectively replace default colors
                set_custom_palette(options.palette, world.maze);
            }
        }
        if (options.recording) {
            RUR._recording_(true);
            RUR.record_frame("create_maze", "wall filled");
        }
        if (options.visible_grid) {
            RUR.state.visible_grid = true;
        }
        if (options.nb_rooms_goal) {
            world.maze.nb_rooms_goal = options.nb_rooms_goal;
            room_max_width = 1;
            room_max_height = 1;
            if (options.room_width) {
                world.maze.room_width = options.room_width;
                room_max_width = options.room_width;
                if (options.room_max_width && options.room_max_width > options.room_width) {
                    world.maze.room_max_width = options.room_max_width;
                    room_max_width = options.room_max_width;
                }
            } else {
                world.maze.room_width = 1;
            }
            if (options.room_height) {
                world.maze.room_height = options.room_height;
                room_max_height = options.room_height;
                if (options.room_max_height && options.room_max_height > options.room_height) {
                    world.maze.room_max_height = options.room_max_height;
                    room_max_height = options.room_max_height;
                }
            } else {
                world.maze.room_height = 1;
            }

            available_area = max_x * max_y;
            max_area = options.nb_rooms_goal * room_max_width * room_max_height;
            if (max_area >= available_area) {
                throw new RUR.ReeborgError("Invalid maze: too much space potentially occupied by rooms.");
            }

            if (options.nb_doors_goal) {
                world.maze.nb_doors_goal = options.nb_doors_goal;
            } else {
                world.maze.nb_doors_goal = 0;
            }
        }
    }
    remove_walls_dfs(max_x, max_y, world.maze);
    RUR._recording_(true);
    RUR.record_frame("create_maze", "completed");
};

function fill_walls(max_x, max_y) {
    "use strict";
    var x, y;
    for(x=1; x < max_x; x++){
        for(y=1; y < max_y; y++){
            RUR.add_wall("east", x, y);
            RUR.add_wall("north", x, y);
        }
        RUR.add_wall("east", x, max_y);
    }
    for(y=1; y < max_y; y++){
        RUR.add_wall("north", max_x, y);
    }
}

/**@function fill_walls
 * @memberof RUR
 * @instance
 * @desc Fills the entire world with walls.
 */
RUR.fill_walls = function() {
    "use strict";
    var world, max_x, max_y, recording_state;
    world = RUR.get_current_world();
    max_x = world.cols;
    max_y = world.rows;
    recording_state = RUR._recording_(false);
    fill_walls(max_x, max_y);
    RUR._recording_(recording_state);
    RUR.record_frame("fill_walls");
};

function make_room(room, vis) {
    "use strict";
    var i, j, in_room_color, recording_state, x, y, x_max, y_max, world;
    world = RUR.get_current_world();
    in_room_color = world.maze.palette["in room"];
    x = room.x_min;
    x_max = room.x_max;
    y = room.y_min;
    y_max = room.y_max;
    recording_state = RUR._recording_(false);
    for(i=x; i < x_max-1; i++){
        for(j=y; j < y_max-1; j++) {
            try {  // could be boundary wall
                RUR.remove_wall("east", i, j);
            } catch (e) {}
            try {
                RUR.remove_wall("north", i, j);
            } catch (e) {}
            color_tile(in_room_color, i, j);
            vis[i-1][j-1] = true;
        }
        try {
            RUR.remove_wall("east", i, y_max-1);
        } catch (e) {}
        color_tile(in_room_color, i, y_max-1);
        vis[i-1][j-1] = true;
    }
    for(j=y; j < y_max-1; j++) {
        try {
            RUR.remove_wall("north", x_max-1, j);
        } catch (e) {}
        color_tile(in_room_color, x_max-1, j);
        vis[i-1][j-1] = true;
    }
    color_tile(in_room_color, x_max-1, y_max-1);
    vis[x_max-2][y_max-2] = true;
    RUR._recording_(recording_state);
}


/* Depth-first search wall removal

    See https://en.wikipedia.org/wiki/Maze_generation_algorithm
    Adapted from the Python version found at http://rosettacode.org/wiki/Maze_generation

    1. We pick a random cell
    2. We select a random neighbouring cell ...
    3. ... that has not been visited
    4. We remove the wall between the two cells and add the neighbouring cell
    to the list of cells having been visited.
    5. If there are no unvisited neighbouring cell, we backtrack to one that
    has at least one unvisited neighbour;
    this is done until we backtract to the original cell.
*/

function remove_walls_dfs(w, h, maze){
    var i, j, vis, temp, x_init, y_init;
    vis = [];
    for(i = 0; i<w; i++){
        temp = [];
        for(j=0; j<h; j++){
            temp.push(false);
        }
        vis.push(temp);
    }

    fit_non_overlapping_rooms(w, h);
    for(i=0; i < maze.rooms.length; i++){
        var room = maze.rooms[i];
        make_room(room, vis);
        if (maze.nb_doors_goal) {
            open_doors(room, maze.nb_doors_goal);
        }

    }

    while (true) {
        x_init = randint(w); // 1. pick a random cell, not in a room
        y_init = randint(h);
        if (!vis[x_init][y_init]) {
            break;
        }
    }
    color_tile(maze.palette['start'], x_init+1, y_init+1);
    maze.start.x = x_init+1;
    maze.start.y = y_init+1;
    walk(x_init, y_init, vis);
}


function walk(x, y, vis){
    var i, d, dd, xx, yy, recording_state;
    vis[x][y] = true; // 4. add start cell to visited
    d = [[x - 1, y], [x, y + 1], [x + 1, y], [x, y - 1]];
    shuffle(d);  // 2. randomize neighbours
    for(i=0; i<=3; i++){
        dd = d[i];  // 2. pick neighbours in random order
        xx = dd[0];
        yy = dd[1];
        if(vis[xx] && vis[xx][yy]){ // 3. ignore visited
            continue;
        }
        if (vis[xx] === undefined || vis[xx][yy] === undefined){
            continue; // not in the world
        }

        recording_state = RUR._recording_(false);
        if (xx === x) {  // 4. remove wall ...
            // add 1 to x & y compared with vis which is zero-based
            RUR.remove_wall("north", x+1, Math.min(y, yy)+1);
            update_color(x+1, y+1);
            update_color(x+1, yy+1);
        } else {
            RUR.remove_wall("east", Math.min(x, xx)+1, y+1);
            update_color(x+1, y+1);
            update_color(xx+1, y+1);
        }
        RUR._recording_(recording_state);
        RUR.record_frame("from maze, updating colors");
        walk(xx, yy, vis); // recursive call; push ahead
    }
} // end recursive call, effectively backtrack

},{"./../rur.js":44,"./../utils/random.js":69}],68:[function(require,module,exports){
/* Path utilities useful for world creators */

require("./../rur.js");
require("./../drawing/visible_world.js");
require("./../ui/user_progress.js");

/** @function print_path
 * @memberof RUR
 * @instance
 * @summary This function prints the path followed by the default robot, where
 * the values ['x', 'y'] are used to draw the trace on the screen. Values are
 * only appended to the path when they change; thus, turns and other actions
 * performed at a given location are ignored.  The initial position is 
 * considered to be part of the path.
 *
 */

RUR.print_path = function () {
    "use strict";
    var history, path, world, x_init, y_init, robot;

    world = RUR.get_current_world();
    if (world.robots === undefined || world.robots.length === 0) {
        throw new RUR.ReeborgError("Missing robot; cannot print path.");
    }
    robot = world.robots[0];
    history = robot._trace_history;

    if (robot.initial_position !== undefined) {
        x_init = robot.initial_position[0];
        y_init = robot.initial_position[1];        
    } else {
        console.warn("Initial_position not defined for robot in print_path; robot =", robot);
        x_init = robot.x;
        y_init = robot.y;
    }

    path = compute_path(x_init, y_init, history);
    RUR._write_ln(path);
};

function compute_path(x_init, y_init, history) {
    var i, x, y, prev_x, prev_y, path;

    prev_x = x_init;
    prev_y = y_init;
    path = [[prev_x, prev_y]];

    for (i=0; i < history.length; i++) {
        x = history[i]['grid_x'];
        y = history[i]['grid_y'];
        if (x != prev_x || y != prev_y) {
            path.push([x, y]);
            prev_x = x;
            prev_y = y;
        }
    }
    return path;
}

/** @function check_path
 * @memberof RUR
 * @instance
 * @summary This function compares the path followed by the default robot
 * with that which was desired.
 *
 * @param {list} desired_path A desired path, as printed by `RUR.print_path`.
 * 
 * @param {Object} [options] A Javascript object (similar to a Python dict).
 * 
 * @param {string} [options.failure] If the followed path was **not** the specified
 * one and `options.failure` is specified, an exception will be raised and
 * `options.failure` will be shown.
 *
 * @param {string} [options.success] If the followed path **was** the specified
 * one and `options.success` is specified, an exception will be raised and
 * `options.success` will be shown.
 *
 * @param {string} [options.show_path] If the followed path was not the specified
 * one and `options.show_path` is set to `true`, the `desired_path`
 * will be shown. If this is desired, we suggest to use the string `"true"` which
 * will be valid in both Python and Javascript.
 * If the correct path is followed, and you wish to show the `desired_path`, 
 * simply call `RUR.show_path()` explicitly with the relevant arguments
 * prior to calling `RUR.check_path()`.
 *
 * @param {string} [options.color] If the desired path is shown and `options.color`
 * is specified, it will be the color used to show the path.
 *
 * @returns {bool} True if the correct path was followed, false otherwise **and**
 * if the relevant option `options.success` or `options.failure`
 * is not specified.
 *
 */

RUR.check_path = function (desired_path, options) {
    "use strict";
    var history, i, world, desired_x, desired_y, path_taken, x, y, robot;
    var success = true;

    world = RUR.get_current_world();
    if (world.robots === undefined || world.robots.length === 0) {
        throw new RUR.ReeborgError("Missing robot; cannot check path.");
    }
    robot = world.robots[0];
    history = robot._trace_history;

    if (robot.initial_position !== undefined) {
        x = robot.initial_position[0];
        y = robot.initial_position[1];        
    } else {
        console.warn("Initial_position not defined for robot in check_path; robot =", robot);
        x = robot.x;
        y = robot.y;
    }

    path_taken = compute_path(x, y, history);

    if (desired_path.length > path_taken.length){
        console.log("desired longer than taken");
        success = false;
    } else if (desired_path.length < path_taken.length){
        console.log("desired shorter than taken");
        success = false;
    } else {
        for (i=0; i < path_taken.length; i++) {
            x = path_taken[i][0];
            y = path_taken[i][1];
            desired_x = desired_path[i][0];
            desired_y = desired_path[i][1];
            if (x != desired_x || y != desired_y) {
                console.log("difference at", x, y);
                success = false;
                break;
            }
        }
    }

    if (success) {
        if (options) {
            if (options.success) {
                RUR.success_custom_message = options.success;
                RUR.update_progress();
                throw new RUR.ReeborgOK(options.success);
            }
        }
        return true;
    }

    if (options) {
        if (options.show_path) {
            if (options.color) {
                RUR.show_path(desired_path, options.color);
            } else {
                RUR.show_path(desired_path);
            }
        }
        if (options.failure) {
            RUR.failure_custom_message = options.failure;
            throw new RUR.ReeborgError(options.failure);
        }
    }
    return false;
};


/** @function show_path
 * @memberof RUR
 * @instance
 * @summary This function draws a path which Reeborg should follow.
 * To stop drawing the path, call the function with no arguments.
 *
 * @param {list} path A path, as printed by RUR.print_path.
 * @param {string} [color] The color to be used to draw the path;
 * the default is `"lightsteelblue"`.
 *
 */
RUR.show_path = function (path, color) {
    var world = RUR.get_current_world();
    
    if (path === undefined) {
        world._CORRECT_PATH = [];
    } else {
        world._CORRECT_PATH = path;
    }

    if (color === undefined) {
        world._CORRECT_PATH_COLOR = "lightsteelblue";
    } else {
        world._CORRECT_PATH_COLOR = color;
    }
    RUR.record_frame("show_path");
};

},{"./../drawing/visible_world.js":10,"./../rur.js":44,"./../ui/user_progress.js":62}],69:[function(require,module,exports){
function randint(max) {
    // returns integer between 0 and max-1
    return Math.max(0, Math.floor(Math.random() * max));
}
exports.randint = randint;

// Fisher–Yates in-place shuffle as modified by Durstenfeld
// https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
exports.shuffle = function (arr) {
    var i, j, temp, n=arr.length;
    for (i=n-1; i >= 1; i--) {
        j = randint(i+1);
        temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
}
},{}],70:[function(require,module,exports){
require("./../rur.js");
require("./../world_api/is_fatal.js");
require("./../world_api/walls.js");
require("./../programming_api/commands.js");
var random = require("./../utils/random.js");
var shuffle = random.shuffle;
var randint = random.randint;

 // The ideas used here are inspired from
 // http://www.redblobgames.com/pathfinding/a-star/introduction.html

default_palette = {
    'current': 'rgba(0, 255, 127, 0.5)',
    'on_frontier': 'rgba(135, 206, 235, 0.5)',
    'done': 'rgba(211, 211, 211, 0.5)'
};

function set_custom_palette(user_palette, container){
    "use strict";
    var i, key, keys;
    keys = Object.keys(user_palette);
    for(i=0; i < keys.length; i++) {
        key = keys[i];
        container.palette[key] = user_palette[key];
    }
}

/** @constructor Deque
 * @memberof RUR
 *
 * @desc Description to be added
 */

RUR.Deque = function (no_colors) {
    if (!no_colors) {
        this.use_colors = true;
        this.palette = {};
        set_custom_palette(default_palette, this);
    } else {
        this.use_colors = false;
    }
    this.array = [];
    this.previous_item = undefined;

    this.append = function(item) {
        this.array.push(item);
        if (this.use_colors) {
            this.set_color(this.palette["on_frontier"], item);
        }
    };

    this.set_palette = function (palette) {
        set_custom_palette(palette, this);
    };

    this.get_last = function() {
        var item = this.array.pop();
        if (this.use_colors) {
            this.set_color(this.palette["current"], item);
        }
        this.previous_item = item;
        return item;
    };

    this.get_first = function() {
        var item = this.array.shift();
        if (this.use_colors) {
            this.set_color(this.palette["current"], item);
        }
        this.previous_item = item;
        return item;
    };

    this.is_empty = function () {
        return this.array.length === 0;
    };

    this.mark_done = function (item) {
        if (this.use_colors) {
            this.set_color(this.palette["done"], item);
        }
    };

    this.set_color = function(color, item) {
        var x=item[0], y=item[1], recording_state;
        recording_state = RUR._recording_(false);
        if (RUR.is_decorative_object(this.palette["current"], x, y)) {
            RUR.remove_decorative_object(this.palette["current"], x, y);
        }
        if (RUR.is_decorative_object(this.palette["on_frontier"], x, y)) {
            RUR.remove_decorative_object(this.palette["on_frontier"], x, y);
        }
        if (RUR.is_decorative_object(this.palette["done"], x, y)) {
            RUR.remove_decorative_object(this.palette["done"], x, y);
        }
        RUR.add_decorative_object(color, x, y);
        RUR._recording_(recording_state);
        RUR.record_frame();
    };
};

// To be called from Python
RUR.create_deque = function(no_colors) {
    return new RUR.Deque(no_colors);
};


/**---------------------------- */

/** @constructor PriorityQueue
 * @memberof RUR
 *
 * @desc Description to be added
 */

RUR.PriorityQueue = function (no_colors) {
    if (!no_colors) {
        this.use_colors = true;
        this.palette = {};
        set_custom_palette(default_palette, this);
    } else {
        this.use_colors = false;
    }
    this.array = [];

    this.add = function(node, cost) {
        var i, idx = 0, n = this.array.length;
        if (n===0) {
            this.array[0] = [node, cost];
        } else {
            for (i=n-1; i >= 0; i--){
                if (cost < this.array[i][1]) {
                    idx = i + 1;
                    break;
                } else {
                    this.array[i+1] = this.array[i];
                }
            }
            this.array[idx] = [node, cost];
        }
        if (this.use_colors) {
            this.set_color(this.palette["on_frontier"], node);
        }
    };

    this.set_palette = function (palette) {
        set_custom_palette(palette, this);
    };

    this.get_best = function() {
        var item = this.array.pop();
        if (this.use_colors) {
            this.set_color(this.palette["current"], item[0]);
        }
        return item[0];
    };

    this.is_empty = function () {
        return this.array.length === 0;
    };

    this.mark_done = function (node) {
        if (this.use_colors) {
            this.set_color(this.palette["done"], node);
        }
    };

    this.set_color = function(color, node) {
        var x=node[0], y=node[1], recording_state;
        recording_state = RUR._recording_(false);
        if (RUR.is_decorative_object(this.palette["current"], x, y)) {
            RUR.remove_decorative_object(this.palette["current"], x, y);
        }
        if (RUR.is_decorative_object(this.palette["on_frontier"], x, y)) {
            RUR.remove_decorative_object(this.palette["on_frontier"], x, y);
        }
        if (RUR.is_decorative_object(this.palette["done"], x, y)) {
            RUR.remove_decorative_object(this.palette["done"], x, y);
        }
        RUR.add_decorative_object(color, x, y);
        RUR._recording_(recording_state);
        RUR.record_frame();
    };
};

// To be called from Python
RUR.create_priority_queue = function(no_colors) {
    return new RUR.PriorityQueue(no_colors);
};


// get neighbours when direction is unimportant

function get_neighbours_around (current, ignore_walls, ordered, robot_body) {
    "use strict";
    var x, y, neighbours, world, max_x, max_y;

    world = RUR.get_current_world();
    neighbours = [];
    x = current[0];
    y = current[1];
    max_x = world.cols;
    max_y = world.rows;
    if (x < max_x && !RUR.is_fatal_position(x+1, y, robot_body)) {
            if (ignore_walls || !RUR._is_wall("east", x, y)) {
                neighbours.push([x+1, y]);
        }
    }
    if (y < max_y && !RUR.is_fatal_position(x, y+1, robot_body)) {
            if (ignore_walls || !RUR._is_wall("north", x, y)) {
                neighbours.push([x, y+1]);
        }
    }
    if (x > 1 && !RUR.is_fatal_position(x-1, y, robot_body)) {
            if (ignore_walls || !RUR._is_wall("west", x, y)) {
                neighbours.push([x-1, y]);
        }
    }
    if (y > 1 && !RUR.is_fatal_position(x, y-1, robot_body)) {
            if (ignore_walls || !RUR._is_wall("south", x, y)) {
                neighbours.push([x, y-1]);
        }
    }
    if (!ordered) {
        shuffle(neighbours);
    }
    return neighbours;
}

/* for get_neighbours_turn_left, we define a neighbour as either the node
   immediately in front **or** the same node but turning left.
*/

function get_neighbours_turn_left (current, ignore_walls, ordered, robot_body) {
    "use strict";
    var direction, x, y, neighbours, world, max_x, max_y;

    world = RUR.get_current_world();

    neighbours = [];
    x = current[0];
    y = current[1];
    direction = current[2];

    max_x = world.cols;
    max_y = world.rows;

    switch (direction) {
        case "east":
            neighbours.push([x, y, "north"]);
            if (x < max_x && !RUR.is_fatal_position(x+1, y, robot_body)) {
                if (ignore_walls || !RUR._is_wall("east", x, y)) {
                    neighbours.push([x+1, y, "east"]);
                }
            }
            break;
        case "north":
            neighbours.push([x, y, "west"]);
            if (y < max_y && !RUR.is_fatal_position(x, y+1, robot_body)) {
                if (ignore_walls || !RUR._is_wall("north", x, y)) {
                    neighbours.push([x, y+1, "north"]);
                }
            }
            break;
        case "west":
            neighbours.push([x, y, "south"]);
            if (x > 1 && !RUR.is_fatal_position(x-1, y, robot_body)) {
                if (ignore_walls || !RUR._is_wall("west", x, y)) {
                    neighbours.push([x-1, y, "west"]);
                }
            }
            break;
        case "south":
            neighbours.push([x, y, "east"]);
            if (y > 1 && !RUR.is_fatal_position(x, y-1, robot_body)) {
                if (ignore_walls || !RUR._is_wall("south", x, y)) {
                    neighbours.push([x, y-1, "south"]);
                }
            }
            break;
    }

    if (!ordered) {
        shuffle(neighbours);
    }

    return neighbours;
}


/** @constructor Graph
 * @memberof RUR
 *
 * @desc Description to be added
 */

RUR.Graph = function (options) {
    "use strict";
    this.robot_body = RUR._default_robot_body_();
    this.ordered = false;
    this.ignore_walls = false;
    this.turn_left = false;
    this.cost_info = {};

    if (options) {
        if (options.robot_body) {
            this.robot_body = options.robot_body;
        }
        if (options.ignore_walls){
            this.ignore_walls = options.ignore_walls;
        }
        if (options.ordered) {
            this.ordered = options.ordered;
        }
        if (options.turn_left) {
            this.turn_left = options.turn_left;
        }
    }


    this.neighbours = function(current) {

        if (this.turn_left) {
            return get_neighbours_turn_left(current, this.ignore_walls, this.ordered, this.robot_body);
        } else {
            return get_neighbours_around(current, this.ignore_walls, this.ordered, this.robot_body);
        }
    };

    this.cost = function(current, neighbour) {
        var action, x, y, to_x, to_y;
        x = current[0];
        y = current[1];
        to_x = neighbour[0];
        to_y = neighbour[1];
        if (x != to_x || y != to_y) {
            action = "move";
        } else {
            action = get_turn(current, neighbour);
        }

        if (action=="move") {
            return 1;
        } else if (action == "turn_left") {
            return 1;
        } else if (action == "turn_around") {
            return 2;
        } else if (action == "turn_right") {
            return 3;
        } else {
            throw new RUR.ReeborgError("Unknown action in RUR.Graph.cost");
        }
    };

};

function get_turn (current, neighbour) {
    "use strict";
    var direction, to_direction;
    direction = current[2];
    to_direction = neighbour[2];
    switch (direction) {
        case "east":
            if (to_direction == "north"){
                return "turn_left";
            } else if (to_direction == "west"){
                return "turn_around";
            } else if(to_direction == "south") {
                return "turn_right";
            }
            break;
        case "north":
            if (to_direction == "west"){
                return "turn_left";
            } else if (to_direction == "south"){
                return "turn_around";
            } else if(to_direction == "east") {
                return "turn_right";
            }
            break;
        case "west":
            if (to_direction == "south"){
                return "turn_left";
            } else if (to_direction == "east"){
                return "turn_around";
            } else if(to_direction == "north") {
                return "turn_right";
            }
            break;
        case "south":
            if (to_direction == "east"){
                return "turn_left";
            } else if (to_direction == "north"){
                return "turn_around";
            } else if(to_direction == "west") {
                return "turn_right";
            }
            break;
        default: 
            throw new RUR.ReeborgError("Unknown direction in get_turn() [search.js]");
    }
}


// To be called from Python
RUR.create_graph = function(options) {
    return new RUR.Graph(options);
};

},{"./../programming_api/commands.js":26,"./../rur.js":44,"./../utils/random.js":69,"./../world_api/is_fatal.js":79,"./../world_api/walls.js":85}],71:[function(require,module,exports){
// adapted from http://javascript.crockford.com/remedial.html

// will modify a global object - no need to export anything.

String.prototype.supplant = function (o) {
    return this.replace(
        /\{([^{}]*)\}/g,
        function (a, b) {
            var r = o[b];
            return typeof r === 'string' || typeof r === 'number' ? r : a;
        }
    );
};

},{}],72:[function(require,module,exports){

require("./../rur.js");

_is_integer = function(n) {
    return typeof n==='number' && (n%1)===0;
};

_is_non_negative_integer = function (n) {
    return typeof n==='number' && (n%1)===0 && n>=0;
};

_is_positive_integer = function (n) {
    return typeof n==='number' && (n%1)===0 && n>=1;
};

RUR.is_integer = _is_integer;
RUR.is_non_negative_integer = _is_non_negative_integer;
RUR.is_positive_integer = _is_positive_integer;


/** @function is_valid_position
 * @memberof RUR
 * @instance
 * @summary This function indicates if the position is within the world's boundaries.
 *
 * @param {integer} x  Position
 * @param {integer} y  Position
 *
 * @returns {bool} `true/True` if the position is within the world's boundaries,
 * `false/False` otherwise.
 *
 **/

RUR.is_valid_position = function(x, y) {
    var world = RUR.get_current_world();
    return (_is_positive_integer(x) && _is_positive_integer(y) &&
           x <= world.cols && y <= world.rows);
};


/* filterInt taken from
https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/parseInt

It is a stricter way than parseInt to extract integer values, and supports
the string "infinite" as a valid integer. We do not use the Javascript
object Infinity as it cannot be serialized using JSON.

See tests/unit_tests/utils/filterint.tests.js for tests illustrating sample
uses.
*/
RUR.utils.filterInt = function (value) {
  if (value == "infinite") {
    return value;
  }
  if(/^(\-|\+)?([0-9]+)$/.test(value)){
    return Number(value);
  }
  return undefined;
};

},{"./../rur.js":44}],73:[function(require,module,exports){
/* This file contains methods used to create animated images by creating
   the appropriate selection sequence from a list of images.
 */

require("./../rur.js");

RUR.animate_images = function (obj) {
    var i;
    for (i=0; i < obj.images.length; i++){
        obj["image"+i] = new Image();
        obj["image"+i].src = obj.images[i];
        obj["image"+i].onload = RUR.onload_new_image;
    }
    if (obj.selection_method === "sync") {
        obj.choose_image = function (id) {
            return _sync(obj, obj.images.length, id);
        };
    } else if (obj.selection_method === "ordered") {
        obj.choose_image = function (id) {
            return _ordered(obj, obj.images.length, id);
        };
    } else if (obj.selection_method === "cycle stay") {
        obj.choose_image = function (id) {
            return _cycle_stay(obj, obj.images.length, id);
        };
    } else if (obj.selection_method === "cycle remove") {
        obj.choose_image = function (id) {
            return _cycle_remove(obj, obj.images.length, id);
        };
    } else {
        obj.choose_image = function (id) {
            return _random(obj, obj.images.length);
        };
    }
};


function _random (obj, nb) {
    // each animated image is given a random value at all iteration
    var choice = Math.floor(Math.random() * nb);
    return obj["image" + choice];
}

function _ordered (obj, nb, id) {
    // each animated image is given a random initial value but then goes in order
    if (RUR._ORDERED[obj.name] === undefined) {
        RUR._ORDERED[obj.name] = {};
        RUR._ORDERED[obj.name][id] = Math.floor(Math.random() * nb);
    } else if (Object.keys(RUR._ORDERED[obj.name]).indexOf(id) === -1) {
        RUR._ORDERED[obj.name][id] = Math.floor(Math.random() * nb);
    } else {
        RUR._ORDERED[obj.name][id] += 1;
        RUR._ORDERED[obj.name][id] %= nb;
    }
    return obj["image" + RUR._ORDERED[obj.name][id]];
}

function _cycle_stay (obj, nb, id) {
    // each animated image starts with its first image,
    // cycles through all the values once, displaying the last
    // image as a permanent one.
    if (RUR._CYCLE_STAY[obj.name] === undefined) {
        RUR._CYCLE_STAY[obj.name] = {};
        RUR._CYCLE_STAY[obj.name][id] = 0;
    } else if (Object.keys(RUR._CYCLE_STAY[obj.name]).indexOf(id) === -1) {
        RUR._CYCLE_STAY[obj.name][id] = 0;
    } else {
        RUR._CYCLE_STAY[obj.name][id] += 1;
        RUR._CYCLE_STAY[obj.name][id] = Math.min(nb-1, RUR._CYCLE_STAY[obj.name][id]);
    }
    return obj["image" + RUR._CYCLE_STAY[obj.name][id]];
}

function _cycle_remove (obj, nb, id) {
    // each animated image starts with its first image,
    // cycles through all the values once, and, after displaying the last
    // image, returns a "flag" instructing the calling function
    // to remove the object
    if (RUR._CYCLE_REMOVE[obj.name] === undefined) {
        RUR._CYCLE_REMOVE[obj.name] = {};
        RUR._CYCLE_REMOVE[obj.name][id] = 0;
    } else if (Object.keys(RUR._CYCLE_REMOVE[obj.name]).indexOf(id) === -1) {
        RUR._CYCLE_REMOVE[obj.name][id] = 0;
    } else {
        RUR._CYCLE_REMOVE[obj.name][id] += 1;
    }
    if (RUR._CYCLE_REMOVE[obj.name][id] >= nb) {
        return RUR.END_CYCLE;
    }
    return obj["image" + RUR._CYCLE_REMOVE[obj.name][id]];
}

function _sync (obj, nb, id) {
    // every animated image of this type is kept in sync
    if (RUR._SYNC[obj.name] === undefined) {
        RUR._SYNC[obj.name] = [];
        RUR._SYNC_VALUE[obj.name] = 1;
    } else if (RUR._SYNC[obj.name].indexOf(id) !== -1) {
        // see an same animated image present: we are starting a new sequence
        RUR._SYNC[obj.name] = [];
        RUR._SYNC_VALUE[obj.name] += 1;
        RUR._SYNC_VALUE[obj.name] %= nb;
    }
    RUR._SYNC[obj.name].push(id);
    return obj["image" + RUR._SYNC_VALUE[obj.name]];
}

},{"./../rur.js":44}],74:[function(require,module,exports){
/*  This file contains generic methods called by more specialized methods
    used to create worlds.

IMPORTANT: the comments begin by "/*" instead of "/**" so as not to be
processed by jsdoc and be included in the public documentation.

*/


require("./../rur.js");
require("./../translator.js");
require("./../programming_api/exceptions.js");
require("./../utils/key_exist.js");
require("./../utils/validator.js");
require("./../utils/supplant.js");

// private helper function that
// ensures that the position is within the world boundaries
function ensure_valid_position(args) {
    "use strict";
    var position;
    if (args.x === undefined) args.x = "?";
    if (args.y === undefined) args.y = "?";
    if (!RUR.is_valid_position(args.x, args.y)) {
        position = "(" + args.x + ", " + args.y + ")";
        throw new RUR.ReeborgError(
            RUR.translate("Invalid position.").supplant({pos:position}));
    }
}

function ensure_common_required_args_present(args) {
    "use strict";
    ensure_valid_position(args);
    if (args.type === undefined) {
        throw new RUR.ReeborgError("Object type must be specified.");
    }
    if (args.name === undefined) {
        throw new RUR.ReeborgError("Object name must be specified.");
    }
    if (args.valid_names !== undefined) {
        if (args.valid_names.indexOf(args.name) === -1) {
            throw new RUR.ReeborgError("Invalid name: " + args.name);
        }
     }
}

RUR.UnitTest.ensure_common_required_args_present = ensure_common_required_args_present;


/* @function _add_artefact
 * @memberof RUR
 * @instance
 * @summary **This function is intended for private use by developers.**
 *
 *    This function adds a specified (named) artefact of a
 *    specified type (e.g. object, background tile, wall, etc.) at
 *    a given location, potentially subject to some limitations.
 *
 *
 * @param {Object} args A Javascript object (similar to a Python dict) that
 *                      holds the relevant attribute.
 *
 * @param {string} args.name  The name of the object to be found; an error
 *    will be thrown if it is missing.
 *
 * @param {integer} [options.number] The number of objects to add at that
 * location; it is 1 by default.
 *
 * @param {string} args.type  The type of the object to be found; an error
 *    will be thrown if it is missing.
 *
 * @param {integer} args.x The `x` coordinate where the object should be found.
 * If it is missing, or not within the world boundaries,
 * or is not an integer, an error will be thrown.
 *
 * @param {integer} args.y The `y` coordinate where the object should be found.
 * If it is missing, or not within the world boundaries,
 * or is not an integer, an error will be thrown.
 *
 * @param {boolean} [args.single] Specifies if only one of a given kind of
 * artefact is permitted at a given location. When set to True, adding a
 * new artefact result in replacing the old one.
 *
 * @returns {integer} The number of object found at that location (could be 0).
 * @throws Will throw an error if `name` attribute is not specified.
 * @throws Will throw an error if `type` attribute is not specified.
 * @throws Will throw an error if a valid position is not specified.
 * @throws Will throw an error if `single` is "true" but more than one kind
 * of artefact is found at that location.
 * @throws Will throw an error if called after a range of values has already
 * been specified for that object at that location.
 *
 *
 */
RUR._add_artefact = function (args) {
    "use strict";
    var base, coords, world = RUR.get_current_world();

    ensure_common_required_args_present(args);
    base = world;
    if (args.goal) {
        RUR.utils.ensure_key_for_obj_exists(world, "goal");
        base = world.goal;
    }
    coords = args.x + "," + args.y;

    // This should never happen if functions upstream always
    // use args.single consistently
    if (args.single && base[args.type] !== undefined &&
               base[args.type][coords] !== undefined &&
               base[args.type][coords].length > 1) {
        throw new RUR.ReeborgError(
            "Inconsistent state: single type with more than one artefact present.");
    }

    RUR.utils.ensure_key_for_obj_exists(base, args.type);
    if (args.range) {
        RUR.utils.ensure_key_for_obj_exists(base[args.type], coords);
        base[args.type][coords][args.name] = args.range;
    } else if (args.number) {
        RUR.utils.ensure_key_for_obj_exists(base[args.type], coords);
        if (base[args.type][coords][args.name] === undefined) {
            base[args.type][coords][args.name] = args.number;
        } else if (typeof RUR._get_nb_artefact(args) === "string") {
            // string values are used to represent range, as in "3-7".
            // These values should have been set in
            throw new RUR.ReeborgError("Cannot add number (integer) to range (string)");
        } else {
            base[args.type][coords][args.name] += args.number;
        }
    }
    else {
        RUR.utils.ensure_key_for_array_exists(base[args.type], coords);
        if (args.single) {
            base[args.type][coords] = [args.name];
        } else {
            base[args.type][coords].push(args.name);
        }
    }
};


/* @function _get_artefacts
 * @memberof RUR
 * @instance
 * @summary **This function is intended for private use by developers.**
 *
 *    **Important:** This is the only function named with artefacts in plural
 *    form as other deal with a single artefact at a time, whereas this one
 *    returns a container that can contain many artefacts.
 *
 *    This function returns a container (Javascript Object or Array) with the
 *    artefacts found at a location.
 *
 * @param {Object} args A Javascript object (similar to a Python dict) that
 *                      holds the relevant attribute.
 *
 *
 * @param {string} args.type  The type of the object to be found; an error
 *    will be thrown if it is missing.
 *
 * @param {integer} args.x The `x` coordinate where the object should be found.
 *                        If it is missing, or not within the world boundaries,
 *                        or is not an integer, an error will be thrown.
 *
 * @param {integer} args.y The `y` coordinate where the object should be found.
 *                        If it is missing, or not within the world boundaries,
 *                        or is not an integer, an error will be thrown.
 *
 * @param {boolean} [args.goal] If specified, indicates that it is a goal-type
 *                        kind that we are interested about.
 *
 *
 * @returns      A container (Array or Object) with the artefacts found at that
 *              location, or `null` if no container is found at that location.
 * @throws Will throw an error if `type` attribute is not specified.
 * @throws Will throw an error if a valid position is not specified.
 *
 *
 */
RUR._get_artefacts = function(args) {
    "use strict";
    var coords, container, world = RUR.get_current_world();

    ensure_valid_position(args);
    if (args.type === undefined) {
        throw new RUR.ReeborgError("Object type must be specified.");
    }

    coords = args.x + "," + args.y;
    if (args.goal) {
        if (world.goal === undefined ||
            world.goal[args.type] === undefined ||
            world.goal[args.type][coords] === undefined) {
            return null;
        } else {
            container = world.goal[args.type][coords];
        }
    } else if (world[args.type] === undefined ||
               world[args.type][coords] === undefined) {
        return null;
    } else {
        container = world[args.type][coords];
    }
    // return a copy so that we cannot accidently modify the original object.
    return JSON.parse(JSON.stringify(container));
};


/* @function _get_nb_artefact
 * @memberof RUR
 * @instance
 * @summary **This function is intended for private use by developers.**
 *
 *    This function returns the number of a specified (named) artefact of a
 *    specified type (e.g. object, background tile, wall, etc.) at
 *    a given location.
 *
 * @param {Object} args A Javascript object (similar to a Python dict) that
 *                      holds the relevant attribute.
 *
 * @param {string} args.name  The name of the object to be found; an error
 *    will be thrown if it is missing.
 *
 * @param {string} args.type  The type of the object to be found; an error
 *    will be thrown if it is missing.
 *
 * @param {integer} args.x The `x` coordinate where the object should be found.
 *                        If it is missing, or not within the world boundaries,
 *                        or is not an integer, an error will be thrown.
 *
 * @param {integer} args.y The `y` coordinate where the object should be found.
 *                        If it is missing, or not within the world boundaries,
 *                        or is not an integer, an error will be thrown.
 *
 * @param {boolean} [args.goal] If specified, indicates that it is a goal-type
 *                        object that must be found.
 *
 *
 * @returns The number (integer) or range (string) of object found at that location (could be 0).
 * @throws Will throw an error if `name` attribute is not specified.
 * @throws Will throw an error if `type` attribute is not specified.
 * @throws Will throw an error if a valid position is not specified.
 *
 */
RUR._get_nb_artefact = function(args) {
    "use strict";
    var coords, container, world = RUR.get_current_world();

    ensure_common_required_args_present(args);

    coords = args.x + "," + args.y;
    if (args.goal) {
        if (world.goal === undefined ||
            world.goal[args.type] === undefined ||
            world.goal[args.type][coords] === undefined) {
            return 0;
        } else {
            container = world.goal[args.type][coords];
        }
    } else if (world[args.type] === undefined ||
               world[args.type][coords] === undefined) {
        return 0;
    } else {
        container = world[args.type][coords];
    }

    if (Object.prototype.toString.call(container) == "[object Object]") {
        if (Object.keys(container).indexOf(args.name) == -1) {
            return 0;
        } else {
            return container[args.name];
        }
    } else if (Object.prototype.toString.call(container) == "[object Array]"){
        if (container.indexOf(args.name) == -1) {
            return 0;
        } else {
            return 1;
        }
    } else { // should never happen
        throw new RUR.ReeborgError("Unknown container type; need Object or Array");
    }
};

/* @function _remove_artefact
 * @memberof RUR
 * @instance
 * @summary **This function is intended for private use by developers.**
 *
 *    This function removes a specified (named) artefact of a
 *    specified type (e.g. object, background tile, wall, etc.) at
 *    a given location. For artefacts that can have more than 1 instance
 *    at a given location, it can either remove a single instance or all
 *    of them.
 *
 *    If no artefact of that kind is left at that location, that location is
 *    pruned (removed). If nothing is left for that kind, it is removed.
 *    If nothing is left but an empty goal, the goal object is removed
 *    as well.
 *
 * @param {Object} args A Javascript object (similar to a Python dict) that
 *                      holds the relevant attribute.
 *
 * @param {string} args.name  The name of the object to be found; an error
 *    will be thrown if it is missing.
 *
 * @param {string} args.type  The type of the object to be found; an error
 *    will be thrown if it is missing.
 *
 * @param {integer} args.x The `x` coordinate where the object should be found.
 *                        If it is missing, or not within the world boundaries,
 *                        or is not an integer, an error will be thrown.
 *
 * @param {integer} args.y The `y` coordinate where the object should be found.
 *                        If it is missing, or not within the world boundaries,
 *                        or is not an integer, an error will be thrown.
 *
 * @param {boolean} [args.goal] If specified, indicates that it is a goal-type
 *                        object that must be found.
 *
 * @param {string} [args.number] Used for objects that can be manipulated by
 * Reeborg (so that more than one can be found at a given location),
 * this will result in `number` named
 * artefact removed from that location; the default value of 1 does not
 * need to be specified.  If a larger number of artefact are requested to
 * be removed than are present, an error will be raised.
 *
 * @param {string} [args.all] If `true/True`, and `args.number` is not specified,
 * all instances of the named artefact
 * will be removed; otherwise, their number will simply be reduced by 1..
 *
 * @throws Will throw an error if `name` attribute is not specified.
 * @throws Will throw an error if `type` attribute is not specified.
 * @throws Will throw an error if a valid position is not specified.
 * @throws Will throw an error if no such artefact is found at that location.
 * @throws Will throw an error if there are not enough artefact to remove.
 *
 */
RUR._remove_artefact = function (args) {
    "use strict";
    var base, container, coords, index, number, world = RUR.get_current_world();

    // Calling _get_nb_artefact will do all the required validation of basic arguments
    if (RUR._get_nb_artefact(args) === 0) {
        throw new RUR.ReeborgError("No artefact to remove");
    }

    if (args.number != undefined && args.number > RUR._get_nb_artefact(args)) {
        throw new RUR.ReeborgError("Not enough artefacts here to remove.")
    }

    base = world;
    if (args.goal) {
        base = world.goal;
    }
    coords = args.x + "," + args.y;
    container = base[args.type][coords];
    if (args.number) {
        number = args.number;
    } else if (args.all) {
        number = container[args.name];
    } else {
        number = 1;
    }

    if (Object.prototype.toString.call(container) == "[object Object]") {
        container[args.name] -= number;
        if (container[args.name] === 0) {
            delete container[args.name];
        }
        if (Object.keys(container).length === 0) { // nothing left at that location
            delete base[args.type][coords];
        } else {
            return;
        }
    } else if (Object.prototype.toString.call(container) == "[object Array]"){
        index = container.indexOf(args.name);
        container.splice(index, 1);
        if (container.length === 0){ // nothing left at that location
            delete base[args.type][coords];
        } else {
            return;
        }
    } else { // should never happen
        throw new RUR.ReeborgError("Unknown container type; need Object or Array");
    }

    // remove any empty remaining JS object, up to world.
    if (Object.keys(base[args.type]).length === 0) {
        delete base[args.type];
        if (args.goal) {
            if (Object.keys(world.goal).length === 0){
                delete world.goal;
            }
        }
    }
};

/* @function _set_nb_artefact
 * @memberof RUR
 * @instance
 * @summary **This function is intended for private use by developers.**
 *
 *    This function sets a specified number of a named artefact of a
 *    specified type (e.g. object, goal object) at a given location.
 *
 *
 * @param {Object} args A Javascript object (similar to a Python dict) that
 *                      holds the relevant attribute.
 *
 * @param {string} args.name  The name of the object to be added; an error
 *    will be thrown if it is missing.
 *
 * @param {integer|string} args.number  The number of artefacts to be set; an error
 * will be thrown if it is missing. If it is zero, any artefact already present
 * will be removed. String arguments are accepted so that `"all"` for
 * "objects as goals" and `"min-max"` for range of objects can be set.
 *
 * @param {string} args.type  The type of the object to be added; an error
 *    will be thrown if it is missing.
 *
 * @param {integer} args.x The `x` coordinate where the object should be found.
 *                        If it is missing, or not within the world boundaries,
 *                        or is not an integer, an error will be thrown.
 *
 * @param {integer} args.y The `y` coordinate where the object should be found.
 *                        If it is missing, or not within the world boundaries,
 *                        or is not an integer, an error will be thrown.
 *
 * @param {boolean} [args.goal] If specified, indicates that it is a goal that
 *                        must be set.
 *
 * @throws Will throw an error if `name` attribute is not specified.
 * @throws Will throw an error if `type` attribute is not specified.
 * @throws Will throw an error if `number` attribute is not specified.
 * @throws Will throw an error if a valid position is not specified.
 *
 */
RUR._set_nb_artefact = function (args) {
    "use strict";
    var base, coords, world = RUR.get_current_world();

    ensure_common_required_args_present(args);
    if (args.number === undefined) {
        throw new RUR.ReeborgError("Number of objects must be specified.");
    }

    coords = args.x + "," + args.y;
    base = world;
    if (args.goal) {
        RUR.utils.ensure_key_for_obj_exists(world, "goal");
        base = world.goal;
    }

    // While it may not be as efficient, the logic
    // is easier if we proceed as though we need to add
    // artefact, and then remove and cleanup if the number
    // of artefact is zero
    RUR.utils.ensure_key_for_obj_exists(base, args.type);
    RUR.utils.ensure_key_for_obj_exists(base[args.type], coords);
    base[args.type][coords][args.name] = args.number;
    if (args.number === 0) {
        delete base[args.type][coords][args.name];
        // remove any empty remaining JS object, up to world.
        if (Object.keys(base[args.type]).length === 0) {
            delete base[args.type];
            if (args.goal) {
                if (Object.keys(world.goal).length === 0){
                    delete world.goal;
                }
            }
        }
    }
};

},{"./../programming_api/exceptions.js":28,"./../rur.js":44,"./../translator.js":46,"./../utils/key_exist.js":66,"./../utils/supplant.js":71,"./../utils/validator.js":72}],75:[function(require,module,exports){
require("./../rur.js");
require("./../translator.js");
require("./../utils/key_exist.js");
require("./../utils/validator.js");
require("./../recorder/record_frame.js");
require("./artefact.js");

/** @function set_background
 * @memberof RUR
 * @instance
 *
 * @desc Uses a single image to fill the background. If the image is smaller
 * than the world, it is stretched to fill the entire world.
 * If it is larger than the world, it is cropped, with its bottom left corner
 * coinciding with the bottom left corner of the world.
 *
 * @param {string} url The url where the image is located.
 *
 */
RUR.set_background = function (url) {
    RUR.get_current_world().background_image = url;
    RUR.BACKGROUND_IMAGE.src = url;
    RUR.record_frame("RUR.set_background", url);

};

/** @function clear_background
 * @memberof RUR
 * @instance
 * @summary This function removes all existing background tiles
 *
 */

RUR.clear_background = function() {
    var world = RUR.get_current_world();
    world.tiles = {};
    RUR.record_frame("RUR.clear_background");
};


/** @function fill_background
 * @memberof RUR
 * @instance
 * @summary This function sets a named tile as background for the entire world
 *
 * @param {string} name The name of a tile **or** a colour recognized by JS/HTML.
 *    No check is performed to ensure that the value given is valid; it the
 *    tile name is not recognized, it is assumed to be a colour. If a new tile
 *    is set at that location, it replaces the pre-existing one.
 *
 */

RUR.fill_background = function(name) {
    var x, y, add, recording_state = RUR._recording_(false);
    if(RUR.KNOWN_THINGS.indexOf(RUR.translate_to_english(name)) === -1){
        add = RUR.add_colored_tile;
    } else {
        add = RUR.add_background_tile;
    }
    for (x = 1; x <= RUR.MAX_X; x++) {
        for (y = 1; y <= RUR.MAX_Y; y++) {
            add(name, x, y);
        }
    }
    RUR._recording_(recording_state);
    RUR.record_frame("RUR.fill_background", name);
};


/** @function add_background_tile
 * @memberof RUR
 * @instance
 * @summary This function sets a named tile as background at a location.
 *
 * @param {string} name The name of a tile.
 * Any pre-existing tile or color at that location will be replaced by the new value.
 *
 * @param {integer} x  Position: `1 <= x <= max_x`
 * @param {integer} y  Position: `1 <= y <= max_y`
 *
 * @throws Will throw an error if `(x, y)` is not a valid location.
 * @throws Will throw an error if `name` is not a known thing.
 *
 */
RUR.add_background_tile = function (name, x, y) {
    "use strict";
    var args;
    name = RUR.translate_to_english(name);
    args = {name: name, x:x, y:y, type:"tiles", single:true, valid_names: RUR.KNOWN_THINGS};
    RUR._add_artefact(args);
    RUR.record_frame("RUR.add_background_tile", args);
};

/** @function add_colored_tile
 * @memberof RUR
 * @instance
 * @summary This function sets a uniform color as background at a location.
 * Any pre-existing tile or color at that location will be replaced by the new value.
 *
 * @param {string} color A colour recognized by JS/HTML.
 * No check is performed to ensure that the value given is a valid color
 * recognized by JS/HTML (see example below), 
 *
 * @param {integer} x  Position: `1 <= x <= max_x`
 * @param {integer} y  Position: `1 <= y <= max_y`
 *
 * @throws Will throw an error if `(x, y)` is not a valid location.
 *
 * @example
 *
 * // Show how to set a color
 * World("Alone")
 * RUR.add_colored_tile("blue", 1, 8)
 * RUR.add_colored_tile("#00ff00", 3, 8)
 * RUR.add_colored_tile("rgb(255, 0, 0)", 5, 8)
 * RUR.add_colored_tile("rgba(255, 0, 0, 0.1)", 7, 8)
 * RUR.add_colored_tile("hsl(24, 71%, 77%)", 9, 8)
 *
 */
RUR.add_colored_tile = function (color, x, y) {
    "use strict";
    var args;
    args = {name: color, x:x, y:y, type:"tiles", single:true};
    RUR._add_artefact(args);
    RUR.record_frame("RUR.add_colored_tile", args);
};


/** @function add_background_path
 * @memberof RUR
 * @instance
 * @summary This function sets a named tile as background for a path
 *
 * @param {string} name The name of a tile **or** a colour recognized by JS/HTML.
 *    No check is performed to ensure that the value given is valid; it the
 *    tile name is not recognized, it is assumed to be a colour. If a new tile
 *    is set at that location, it replaces the pre-existing one.
 *
 * @param {array} path A Javascript Array (or Python list) whose items are
 * arrays of the form [x, y].
 *
 */

RUR.add_background_path = function(name, path) {
    var i, x, y, add, recording_state = RUR._recording_(false);
    if(RUR.KNOWN_THINGS.indexOf(RUR.translate_to_english(name)) === -1){
        add = RUR.add_colored_tile;
    } else {
        add = RUR.add_background_tile;
    }
    for (i=0; i<path.length; i++){
        x = path[i][0];
        y = path[i][1];
        add(name, x, y);
    }
    RUR._recording_(recording_state);
    RUR.record_frame("RUR.add_background_path", {name:name, path: path});
};


/** @function remove_background_tile
 * @memberof RUR
 * @instance
 * @summary This function removes a background tile (or a colored tile) at a location.
 *
 * @param {string} name Name of the tile or colored tile
 * @param {integer} x  Position: `1 <= x <= max_x`
 * @param {integer} y  Position: `1 <= y <= max_y`
 *
 * @throws Will throw an error if `(x, y)` is not a valid location.
 * @throws Will throw an error if there is no background tile to remove
 *        at that location
 */
RUR.remove_background_tile = function (name, x, y) {
    "use strict";
    var args;
    name = RUR.translate_to_english(name);
    args= {x:x, y:y, type:"tiles", name:name};
    try {
        RUR._remove_artefact(args);
    } catch (e) {
        if (e.message == "No artefact to remove") {
            throw new RUR.ReeborgError("No tile to remove here.");
        } else {
            throw e;
        }
    }
    RUR.record_frame("RUR.remove_background_tile", args);
};


/** @function get_background_tile
 * @memberof RUR
 * @instance
 * @summary This function gets the tile name found at given location. Note that
 *    this could be an HTML colour.  If nothing is found at that location,
 *    `null` is returned (which is converted to `None` in Python programs.)
 *  **Important** `RUR.get_background_tile` uses the singular form, instead
 * of the plural (i.e. `tile` instead of `tiles`) since there only one tile
 * can be found at a given location.
 *
 * @param {integer} x  Position: `1 <= x <= max_x`
 * @param {integer} y  Position: `1 <= y <= max_y`
 * @returns {string} The name of the tile found at that location or `null/None`.
 *
 * @throws Will throw an error if `(x, y)` is not a valid location.
 *
 */

RUR.get_background_tile = function (x, y) {
    "use strict";
    var tiles, args = {x:x, y:y, type:"tiles"};
    tiles = RUR._get_artefacts(args);
    if (tiles === null) {
        return null;
    } else {
        return RUR.translate(tiles[0]);
    }
};


/** @function is_background_tile
 * @memberof RUR
 * @instance
 *
 * @summary Use to find out if there is a tile (including color) with that
 * name at a given location.
 *
 * @param {string} name The name of the tile; it could be a color.
 * @param {integer} x  Position: `1 <= x <= max_x`
 * @param {integer} y  Position: `1 <= y <= max_y`
 * @returns `true/True` if there is such a named tile at that location,
 * `false/False` otherwise.
 *
 *
 * @example {@lang python}
 * # A very different solution ...
 * World("worlds/examples/simple_path.json", "simple_path")
 * while not at_goal():
 *     x, y = position_in_front()
 *     if RUR.is_background_tile("gravel", x, y):
 *         move()
 *     else:
 *         turn_left()
 */


RUR.is_background_tile = function (name, x, y) {
    "use strict";
    var tile;
    tile = RUR.get_background_tile(x, y); // returns translated name
    if (tile === null) {
        return false;
    } else if (tile == name){
        return true;
    } else {
        return false;
    }
};



},{"./../recorder/record_frame.js":38,"./../rur.js":44,"./../translator.js":46,"./../utils/key_exist.js":66,"./../utils/validator.js":72,"./artefact.js":74}],76:[function(require,module,exports){
require("./../rur.js");
require("./../translator.js");
require("./../utils/key_exist.js");
require("./../utils/validator.js");
require("./../recorder/record_frame.js");
require("./artefact.js");

/** @function add_bridge
 * @memberof RUR
 * @instance
 * @summary This function sets a named "thing" as a bridge at that location.
 * There can be only one bridge at a given location.
 *
 * @param {string} name The name of a bridge.
 * @param {integer} x  Position: `1 <= x <= max_x`
 * @param {integer} y  Position: `1 <= y <= max_y`
 *
 * @throws Will throw an error if `(x, y)` is not a valid location.
 * @throws Will throw an error if `name` is not a known thing.
 * @throws Will throw an error if there is already a bridge at that location,
 * unless this is done from code in the Onload editor in which case the
 * new bridge replaces the old one and a message is written to the browser's
 * console.
 *
 */
RUR.add_bridge = function (name, x, y) {
    "use strict";
    var args;
    name = RUR.translate_to_english(name);
    args = {name: name, x:x, y:y, type:"bridge", single:true, valid_names: RUR.KNOWN_THINGS};
    if (RUR.get_bridge(x, y)) {
        if (RUR.state.evaluating_onload) {
            console.log(name + " is replacing " + RUR.translate(RUR.get_bridge(x, y)) + " as a bridge.");
        } else {
            throw new RUR.ReeborgError(RUR.translate("There is already a bridge here."));
        }
    }
    RUR._add_artefact(args);
    RUR.record_frame("RUR.set_bridge", args);
};

/** @function remove_bridge
 * @memberof RUR
 * @instance
 * @summary This function removes a bridge at a location.
 *
 * @param {string} name The name of a the "thing" used as a bridge.
 * @param {integer} x  Position: `1 <= x <= max_x`
 * @param {integer} y  Position: `1 <= y <= max_y`
 *
 * @throws Will throw an error if `(x, y)` is not a valid location.
 * @throws Will throw an error if there is no such named bridge to remove
 *        at that location
 */
RUR.remove_bridge = function (name, x, y) {
    "use strict";
    var args, english_name;
    english_name = RUR.translate_to_english(name);
    args= {x:x, y:y, type:"bridge", name:english_name, valid_names: RUR.KNOWN_THINGS};
    if (RUR.get_bridge(x, y) == name) {
        RUR._remove_artefact(args);
    } else {
        throw new RUR.ReeborgError("No bridge named <code>" + name + "</code> to remove here.");
    }
    RUR.record_frame("RUR.remove_bridge", args);
};


/** @function get_bridge
 * @memberof RUR
 * @instance
 * @summary This function gets the name of the bridge name found at given location.
 *    If nothing is found at that location,
 *    `null` is returned (which is converted to `None` in Python programs.)
 *
 * @param {integer} x  Position: `1 <= x <= max_x`
 * @param {integer} y  Position: `1 <= y <= max_y`
 *
 * @throws Will throw an error if `(x, y)` is not a valid location.
 *
 */

RUR.get_bridge = function (x, y) {
    "use strict";
    var tile, args = {x:x, y:y, type:"bridge"};
    tile = RUR._get_artefacts(args);
    if (tile === null) {
        return null;
    } else {
        return RUR.translate(tile[0]);
    }
};

/** @function is_bridge
 * @memberof RUR
 * @instance
 * @summary This function returns `true/True` if a named bridge is present
 * at a given location, `false/False` otherwise
 *
 * @param {string} name The name of the bridge
 * @param {integer} x  Position: `1 <= x <= max_x`
 * @param {integer} y  Position: `1 <= y <= max_y`
 *
 * @throws Will throw an error if `(x, y)` is not a valid location.
 *
 */

RUR.is_bridge = function (name, x, y) {
    return RUR.get_bridge(x, y) == name;
};


/** @function get_bridge_protections
 * @memberof RUR
 * @instance
 * @summary This function returns an array of "protections" given by a bridge at
 * that location. If no bridge is found, or if a bridge is found but offer no
 * protection, an empty array is returned.
 *
 * @param {integer} x  Position: `1 <= x <= max_x`
 * @param {integer} y  Position: `1 <= y <= max_y`
 *
 * @throws Will throw an error if `(x, y)` is not a valid location.
 * @returns {Array} An array of strings, each string being a protection
 * against a specific type of fatality; this could be an empty array.
 *
 */

RUR.get_bridge_protections = function (x, y) {
    "use strict";
    var tile;
    tile = RUR.get_bridge(x, y);
    if (tile === null) {
        return [];
    } else {
        tile = RUR.translate_to_english(tile);
    }
    if (RUR.THINGS[tile].protections !== undefined) {
        return RUR.THINGS[tile].protections;
    } else {
        return [];
    }
};

},{"./../recorder/record_frame.js":38,"./../rur.js":44,"./../translator.js":46,"./../utils/key_exist.js":66,"./../utils/validator.js":72,"./artefact.js":74}],77:[function(require,module,exports){
require("./../rur.js");
require("./../utils/key_exist.js");
require("./../utils/validator.js");
require("./../recorder/record_frame.js");
require("./artefact.js");
require("./obstacles.js");
require("./background_tile.js");


RUR.transform_tile = function (name, x, y) {
    "use strict";
    var t, transf, transformations, recording_state;
    if (RUR.THINGS[name].transform === undefined) {
        return false;
    }
    transformations = RUR.THINGS[name].transform;
    for (t=0; t < transformations.length; t++) {
        transf = transformations[t];
        if (conditions_satisfied(transf.conditions, x, y)) {

            recording_state = RUR.state.do_not_record;
            RUR.state.do_not_record = true;

            do_transformations(transf.actions, x, y);

            RUR.state.do_not_record = recording_state;
            return;
        }
    }
};

function conditions_satisfied (conditions, x, y) {
    "use strict";
    var c, cond, fn, name;
    if (Object.prototype.toString.call(conditions) != "[object Array]" ||
        conditions.length === 0) {
        console.log("conditions = ", conditions);
        throw new RUR.ReeborgError("Invalid conditions when attempting an automatic object transformation.");
    }
    try {
        for (c=0; c < conditions.length; c++) {
            cond = conditions[c];
            fn = cond[0];
            name = cond[1];
            if (cond[2] == "not") {
                if (fn(name, x, y)) {
                    return false;
                }
            } else if (!fn(name, x, y)) {
                return false;
            }
        }
    return true;
} catch (e) {
    console.log("conditions = ", conditions);
    console.log(e);
    throw new RUR.ReeborgError("Invalid conditions when attempting an automatic object transformation.");
    }
}

function do_transformations (actions, x, y) {
    "use strict";
    var a, act, fn, name;
    if (Object.prototype.toString.call(actions) != "[object Array]" ||
        actions.length === 0) {
        console.log("actions = ", actions);
        throw new RUR.ReeborgError("Invalid actions when attempting an automatic object transformation.");
    }
    try {
        for (a=0; a < actions.length; a++) {
            act = actions[a];
            fn = act[0];
            name = act[1];
            fn(name, x, y);
        }
    } catch (e) {
        console.log("actions = ", actions);
        console.log(e);
        throw new RUR.ReeborgError("Invalid actions when attempting an automatic object transformation.");
    }
}

},{"./../recorder/record_frame.js":38,"./../rur.js":44,"./../utils/key_exist.js":66,"./../utils/validator.js":72,"./artefact.js":74,"./background_tile.js":75,"./obstacles.js":81}],78:[function(require,module,exports){
require("./../rur.js");
require("./../translator.js");
require("./../utils/key_exist.js");
require("./../utils/validator.js");
require("./../recorder/record_frame.js");
require("./artefact.js");

/** @function add_decorative_object
 * @memberof RUR
 * @instance
 * @summary This function adds a decorative object at a specified location.
 *
 * @param {string} name The name of an object **or** a colour recognized by JS/HTML.
 * No check is performed to ensure that the value given is valid; it the
 * name is not recognized, it is assumed to be a colour.  There can be more
 * than one type of decorative object at a given location.  If a decorative
 * object with name "A" is already at a given location and this function is called
 * to add another, a message is logged to the console and nothing further is
 * done.
 *
 * @param {integer} x  Position: `1 <= x <= max_x`
 * @param {integer} y  Position: `1 <= y <= max_y`
 *
 * @throws Will throw an error if `(x, y)` is not a valid location.
 *
 */
RUR.add_decorative_object = function (name, x, y) {
    "use strict";
    var args;
    if (RUR.is_decorative_object(name, x, y)) {
        console.log(name + " is already there as a decorative object.");
        return;
    }
    name = RUR.translate_to_english(name);
    args = {name: name, x:x, y:y, type:"decorative_objects"};
    RUR._add_artefact(args);
    RUR.record_frame("RUR.add_decorative_object", args);
};


/** @function remove_decorative_object
 * @memberof RUR
 * @instance
 * @summary This function removes a decorative object at a location.
 *
 * @param {string} name Name of the object
 * @param {integer} x  Position: `1 <= x <= max_x`
 * @param {integer} y  Position: `1 <= y <= max_y`
 *
 * @throws Will throw an error if `(x, y)` is not a valid location.
 * @throws Will throw an error if there is no such decorative object to remove
 *        at that location
 */
RUR.remove_decorative_object = function (name, x, y) {
    "use strict";
    var args;
    name = RUR.translate_to_english(name);
    args= {x:x, y:y, type:"decorative_objects", name:name};
    try {
        RUR._remove_artefact(args);
    } catch (e) {
        if (e.message == "No artefact to remove") {
            throw new RUR.ReeborgError("No decorative object to remove here.");
        } else {
            throw e;
        }
    }
    RUR.record_frame("RUR.remove_decorative_object", args);
};


/** @function get_decorative_objects
 * @memberof RUR
 * @instance
 * @summary This function returns a list/array of the decorative objects found
 * at a given position. If nothing is found at that location,
 *  an empty array is returned.
 *
 * @param {integer} x  Position: `1 <= x <= max_x`
 * @param {integer} y  Position: `1 <= y <= max_y`
 *
 * @throws Will throw an error if `(x, y)` is not a valid location.
 * @returns An array containing the name of the decorative objects found at that location
 *
 */

RUR.get_decorative_objects = function (x, y) {
    "use strict";
    var i, result, objects, args = {x:x, y:y, type:"decorative_objects"};
    objects = RUR._get_artefacts(args);
    if (objects == null) {
        return [];
    }
    result = [];
    for (i=0; i < objects.length; i++){
        result.push(RUR.translate(objects[i]));
    }
    return result;
};

/** @function is_decorative_object
 * @memberof RUR
 * @instance
 * @summary This function returns `true/True` if a named decorative object
 * is found at that location, `false/False` otherwise.
 *
 * @param {string} name Name of the object
 * @param {integer} x  Position: `1 <= x <= max_x`
 * @param {integer} y  Position: `1 <= y <= max_y`
 *
 * @throws Will throw an error if `(x, y)` is not a valid location.
 *
 */

RUR.is_decorative_object = function (name, x, y) {
    "use strict";
    var args;
    name = RUR.translate_to_english(name);
    args = {name: name, x:x, y:y, type:"decorative_objects"};
    return RUR._get_nb_artefact(args) == 1;
};


},{"./../recorder/record_frame.js":38,"./../rur.js":44,"./../translator.js":46,"./../utils/key_exist.js":66,"./../utils/validator.js":72,"./artefact.js":74}],79:[function(require,module,exports){
require("./../rur.js");
require("./../translator.js");
require("./background_tile.js");
require("./bridges.js");
require("./obstacles.js");

/** @function get_protections
 * @memberof RUR
 * @instance
 *
 * @desc This return a list of protections carried by the robot
 * against named fatalities.
 *
 * @param {object} robot_body  robot body object
 *
 * @returns an array of protections;
 *
 */
RUR.get_protections = function (robot) {
    "use strict";
    var objects_carried, obj_type, protections;

    objects_carried = RUR.control.carries_object(robot);
    if (objects_carried == 0) {
        return [];
    }

    protections = [];
    for(obj_type of Object.keys(objects_carried)){
        if (RUR.THINGS[obj_type] !== undefined && RUR.THINGS[obj_type].protections !== undefined) {
            protections = protections.concat(RUR.THINGS[obj_type].protections);
        }
    }

    return protections;
};

/** @function is_fatal_position
 * @memberof RUR
 * @instance
 * @desc Indicates if the position would be fatal for the robot. A robot can
 * carry protections against fatalities
 *
 * @param {integer} x  Position: `1 <= x <= max_x`
 * @param {integer} y  Position: `1 <= y <= max_y`
 * @param {object} robot_body  robot body object
 *
 * @returns The message of the first `fatal` thing found
 * [for which the robot has no protection]; if no such thing is found,
 * `false/False` is returned.
 */
RUR.is_fatal_position = function (x, y, robot){
    "use strict";
    var protections, obs, obstacles, tile;
    // Objects carried can offer protection
    // against some types of otherwise fatal obstacles
    protections = RUR.get_protections(robot);
    obstacles = RUR.get_obstacles(x, y);
    if (obstacles) {
        for (obs of obstacles) {
            if (RUR.get_property(obs, "fatal")) {
                if (protections.indexOf(RUR.get_property(obs, "fatal")) === -1) {
                    if (RUR.THINGS[RUR.translate_to_english(obs)].message) {
                        return RUR.THINGS[RUR.translate_to_english(obs)].message;
                    } else {
                        return "Fatal obstacle needs message defined";
                    }
                }
            }
        }
    }
    // Both bridges and objects carried can offer protection
    // against some types of otherwise fatal background tiles; so let's
    // add any bridge protection
    protections = protections.concat(RUR.get_bridge_protections(x, y));
    tile = RUR.get_background_tile(x, y);
    // tile is a name; it could be a colour, which is never fatal.
    if (tile && RUR.THINGS[RUR.translate_to_english(tile)] !== undefined) {
        if (RUR.get_property(tile, "fatal")) {
            if (protections.indexOf(RUR.get_property(tile, "fatal")) === -1) {
                if (RUR.THINGS[RUR.translate_to_english(tile)].message) {
                    return RUR.THINGS[RUR.translate_to_english(tile)].message;
                } else {
                    return "Fatal tile needs message defined";
                }
            }
        }
    }
    // nothing fatal was found
    return false;
};


/** @function is_detectable_position
 * @memberof RUR
 * @instance
 * @desc For Reeborg to determine if a fatal "thing" is present (e.g., for
 * `front_is_clear()  to return `false/False`), the "thing" must have a
 * `detectable` attribute which evaluates to `true/True`.  This function returns
 * `true/True` if there is as least such a detectable "thing" at that position.
 *
 * @param {integer} x  Position: `1 <= x <= max_x`
 * @param {integer} y  Position: `1 <= y <= max_y`
 *
 * @returns `true` if this position is detectable by the robot, `false` otherwise
 */
RUR.is_detectable_position = function (x, y){
    "use strict";
    var tile, tiles;

    /* Both obstacles and background tiles can be detectable;
       we combine both in a single array here */

    tiles = RUR.get_obstacles(x, y);
    if (!tiles) {
        tiles = [];
    }
    tile = RUR.get_background_tile(x, y);
    // all tiles obtained so far are translated arguments
    if (tile && RUR.THINGS[RUR.translate_to_english(tile)] !== undefined) {
        tiles.push(tile);
    }
    for (tile of tiles) {
        // get_property, without a leading underscore, works for original language
        if (RUR.get_property(tile, "detectable")) {
            return true;
        }
    }
    return false;
};

},{"./../rur.js":44,"./../translator.js":46,"./background_tile.js":75,"./bridges.js":76,"./obstacles.js":81}],80:[function(require,module,exports){
require("./../rur.js");
require("./../utils/key_exist.js");
require("./../utils/validator.js");
require("./../recorder/record_frame.js");
require("./artefact.js");

/** @function add_object
 * @memberof RUR
 * @instance
 * @summary This function adds one or more of a given object at a location.
 *
 * @param {string} name Name of the object
 * @param {integer} x  Position: `1 <= x <= max_x`
 * @param {integer} y  Position: `1 <= y <= max_y`
 * @param {object} [options] A Javascript object (or Python dict) containing
 * additional arguments
 * @param {boolean} [options.goal] If `true`, this will represent a goal
 * i.e. the number of object that must be put at that location.
 * @param {integer} [options.number] The number of objects to **add** at that
 * location; it is 1 by default.
 * @param {boolean} [options.replace] If `true`, the specified number
 * (default=1) will **replace** the existing number of objects at that location.
 * During the Onload phase, this is automatically set to `true`.
 * @param {integer} [options.min] Specifies the minimum of objects to be
 * put at that location; together with `options.max`, it is used to choose
 * a random number of objects to be found at that location.
 * @param {integer} [options.max] Specifies the maximum number of objects to be
 * put at that location; together with `options.min`, it is used to choose
 * a random number of objects to be found at that location.
 *
 * @throws Will throw an error if `(x, y)` is not a valid location.
 * @throws Will throw an error if `name` is not a known thing.
 *
 */
RUR.add_object = function (name, x, y, options) {
    "use strict";
    var k, keys, args;

    args = {name: RUR.translate_to_english(name), x:x, y:y,
            type:"objects", valid_names: RUR.KNOWN_THINGS};
    if (options === undefined) {
        args.number = 1;
    } else {
        if (options.goal && options.goal == "all") {
            options.number = "all";
        } else if (options.min !== undefined) {
            if (options.max !== undefined && options.max > options.min) {
                options.number = options.min + "-" + options.max;
                args.replace = true;
            } else {
                options.number = options.min;
            }
        } else if (options.number === undefined) {
            options.number = 1;
        }
        keys = Object.keys(options);
        for (k of keys) {
            args[k] = options[k];
        }
    }

    if (RUR.state.evaluating_onload) {
        args.replace = true;
    }
    if (args.replace) {
        RUR._set_nb_artefact(args);
    } else {
        RUR._add_artefact(args);
    }
    RUR.record_frame("RUR.add_object", args);
};


/** @function remove_object
 * @memberof RUR
 * @instance
 * @summary This function removes an object at a location.
 *
 * @param {string} name Name of the object
 * @param {integer} x  Position: `1 <= x <= max_x`
 * @param {integer} y  Position: `1 <= y <= max_y`
 * @param {object} [options] A Javascript object (or Python dict) containing
 * additional arguments
 *
 * @param {boolean} [options.goal] If `true`, this will represent a goal
 * i.e. the number of object that must be put at that location.
 * @param {integer} [options.number] The number of objects to **add** at that
 * location; it is 1 by default.
 * @param {boolean} [options.all] If `true`, all such objects will be removed.
 *
 * @throws Will throw an error if `(x, y)` is not a valid location.
 * @throws Will throw an error if `name` is not a known thing.
 * @throws Will throw an error if there is no object to remove
 *        at that location
 */
RUR.remove_object = function (name, x, y, options) {
    "use strict";
    var args, k, keys, world = RUR.get_current_world();

    args= {x:x, y:y, type:"objects", name:RUR.translate_to_english(name),
           valid_names: RUR.KNOWN_THINGS};
    if (options !== undefined) {
        keys = Object.keys(options);
        for (k of keys) {
            args[k] = options[k];
        }
    }
    try {
        RUR._remove_artefact(args);
    } catch (e) {
        if (e.message == "No artefact to remove") {
            throw new RUR.ReeborgError("No object to remove here.");
        } else {
            throw e;
        }
    }
    // For historical reason, worlds are always created with an "objects" attribute
    RUR.utils.ensure_key_for_obj_exists(world, "objects");
    RUR.record_frame("RUR.remove_object", args);
};


/** @function get_objects
 * @memberof RUR
 * @instance
 * @summary This function returns a Javascript Object containing
 * the names of the objects found at that location.
 * When using from Python, it should be explictly converted into a `dict`
 * using `dict(RUR.get_objects(x, y))`.
 *
 * If nothing is found at that location,
 * `null` is returned (which is converted to `None` in Python programs.)
 *
 * @param {integer} x  Position: `1 <= x <= max_x`
 * @param {integer} y  Position: `1 <= y <= max_y`
 *
 * @param {object} [options] A Javascript object (or Python dict) containing
 * additional arguments
 *
 * @param {boolean} [options.goal] If `true`, this will represent a goal
 * i.e. the number of object that must be put at that location.
 *
 * @throws Will throw an error if `(x, y)` is not a valid location.
 *
 */

RUR.get_objects = function (x, y, options) {
    "use strict";
    var args, obj, obj_en, k, keys;
    args = {x:x, y:y, type:"objects"};
    if (options !== undefined && options.goal !== undefined) {
        args.goal = options.goal;
    }
    obj_en = RUR._get_artefacts(args);


    if (!obj_en) {
        return null;
    }

    obj = {};
    keys = Object.keys(obj_en);
    for (k of keys) {
        obj[RUR.translate(k)] = obj_en[k];
    }
    return obj;
};


/** @function is_object
 * @memberof RUR
 * @instance
 * @summary This function returns `true/True` if a named obstacle is present
 * at a given location, `false/False` otherwise
 *
 * @param {string} name The name of the obstacle
 * @param {integer} x  Position: `1 <= x <= max_x`
 * @param {integer} y  Position: `1 <= y <= max_y`
 *
 * @param {object} [options] A Javascript object (or Python dict) containing
 * additional arguments
 *
 * @param {boolean} [options.goal] If `true`, this will represent a goal
 * [i.e., the number of object that must be put at that location.]
 *
 * @throws Will throw an error if `(x, y)` is not a valid location.
 *
 */

RUR.is_object = function (name, x, y, options) {
    "use strict";
    var nb, args = {x:x, y:y, name:RUR.translate_to_english(name),
                    type:"objects", valid_names: RUR.KNOWN_THINGS};
    if (options !== undefined && options.goal !== undefined) {
        args.goal = options.goal;
    }
    nb = RUR._get_nb_artefact(args);
    if (nb === 0) {
        return false;
    } else {
        return true;
    }
};


/* The following is deprecated. Some worlds may have been created
  using it (e.g. in Vincent Maille's book) */
RUR.add_object_at_position = function(name, x, y, number) { // Vincent Maille's book
    RUR.add_object(name, x, y, {number:number});
};

},{"./../recorder/record_frame.js":38,"./../rur.js":44,"./../utils/key_exist.js":66,"./../utils/validator.js":72,"./artefact.js":74}],81:[function(require,module,exports){
require("./../rur.js");
require("./../translator.js");
require("./../utils/key_exist.js");
require("./../utils/validator.js");
require("./../recorder/record_frame.js");
require("./artefact.js");

/** @function add_obstacle
 * @memberof RUR
 * @instance
 * @summary This function sets a named "thing" as an obstacle at that location
 *
 * @param {string} name The name of a the "thing" representing the obstacle.
 *
 * @param {integer} x  Position: `1 <= x <= max_x`
 * @param {integer} y  Position: `1 <= y <= max_y`
 *
 * @throws Will throw an error if `(x, y)` is not a valid location.
 * @throws Will throw an error if `name` is not a known thing.
 * @throws Will throw an error if there is already such a named obstacle at that location,
 * unless this is done from code in the Onload editor in which case the
 * a message is written to the browser's console and the request is ignored.
 *
 */
RUR.add_obstacle = function (name, x, y) {
    "use strict";
    var args;
    if (RUR.is_obstacle(name, x, y)) {
        if (RUR.state.evaluating_onload) {
            console.log("Ignoring request to add obstacle " + name);
            return;
        } else {
            throw new RUR.ReeborgError(RUR.translate("There is already such an obstacle here: ") + name);
        }
    }
    args = {name: RUR.translate_to_english(name), x:x, y:y, type:"obstacles",
            valid_names: RUR.KNOWN_THINGS};
    RUR._add_artefact(args);
    RUR.record_frame("RUR.add_obstacle", args);
};


/** @function remove_obstacle
 * @memberof RUR
 * @instance
 * @summary This function removes an obstacle at a location.
 *
 *
 * @param {integer} x  Position: `1 <= x <= max_x`
 * @param {integer} y  Position: `1 <= y <= max_y`
 *
 * @throws Will throw an error if `(x, y)` is not a valid location.
 * @throws Will throw an error if `name` is not a known thing.
 * @throws Will throw an error if there is no obstacle to remove
 *        at that location
 *
 */
RUR.remove_obstacle = function (name, x, y) {
    "use strict";
    var args;
    if (!RUR.is_obstacle(name, x, y)) {
        if (RUR.state.evaluating_onload) {
            throw new RUR.ReeborgError(RUR.translate("There is no such an obstacle here: ") + name);
        }
    }
    args= {x:x, y:y, type:"obstacles", name:RUR.translate_to_english(name), valid_names: RUR.KNOWN_THINGS};
    RUR._remove_artefact(args);
    RUR.record_frame("RUR.remove_obstacle", args);
};


/** @function is_obstacle
 * @memberof RUR
 * @instance
 * @summary This function returns `true/True` if a named obstacle is present
 * at a given location, `false/False` otherwise
 *
 * @param {string} name The name of the obstacle
 * @param {integer} x  Position: `1 <= x <= max_x`
 * @param {integer} y  Position: `1 <= y <= max_y`
 *
 * @throws Will throw an error if `(x, y)` is not a valid location.
 *
 */

RUR.is_obstacle = function (name, x, y) {
    "use strict";
    var args={name:RUR.translate_to_english(name), x:x, y:y, type:"obstacles"};
    if (RUR._get_nb_artefact(args) > 0) {
        return true;
    } else {
        return false;
    }
};


/** @function get_obstacles
 * @memberof RUR
 * @instance
 * @summary This function gets the obstacles at given location and return
 * their names in an array/list.
 *
 * @param {integer} x  Position: `1 <= x <= max_x`
 * @param {integer} y  Position: `1 <= y <= max_y`
 *
 * @return {list} A list of strings representing the name of the obstacles.
 *
 * @throws Will throw an error if `(x, y)` is not a valid location.
 *
 */

RUR.get_obstacles = function (x, y) {
    "use strict";
    var i, obstacles, result = [], args = {x:x, y:y, type:"obstacles"};
    obstacles = RUR._get_artefacts(args);
    if (obstacles === null) {
        return [];
    }
    for(i=0; i < obstacles.length; i++) {
        result.push(RUR.translate(obstacles[i]))
    }
    return result;
};

/** @function is_solid_obstacle
 * @memberof RUR
 * @instance
 * @summary This function returns `true/True` if a solid obstacle is present
 * at a given location, `false/False` otherwise
 *
 * @param {integer} x  Position: `1 <= x <= max_x`
 * @param {integer} y  Position: `1 <= y <= max_y`
 *
 * @throws Will throw an error if `(x, y)` is not a valid location.
 *
 */

RUR.is_solid_obstacle = function (x, y) {
    "use strict";
    var obs, obstacles = RUR.get_obstacles(x, y);
    if (obstacles === null) {
        return false;
    }
    for (obs of obstacles) {
        if (RUR.THINGS[RUR.translate_to_english(obs)].solid) {
            return true;
        }
    }
    return false;
};

},{"./../recorder/record_frame.js":38,"./../rur.js":44,"./../translator.js":46,"./../utils/key_exist.js":66,"./../utils/validator.js":72,"./artefact.js":74}],82:[function(require,module,exports){
require("./../rur.js");
require("./../utils/key_exist.js");
require("./../utils/validator.js");
require("./../recorder/record_frame.js");
require("./artefact.js");
require("./../utils/supplant.js");


/** @function add_pushable
 * @memberof RUR
 * @instance
 * @summary This function adds a named pushable at a location; there can only
 * be one pushable object at a given location.
 *
 * @param {string} name The name of a the "thing" representing the pushable.
 * @param {integer} x  Position: `1 <= x <= max_x`
 * @param {integer} y  Position: `1 <= y <= max_y
 * @param {boolean} [options.goal] Indicate if this is to be set as a goal
 *
 * @throws Will throw an error if `(x, y)` is not a valid location.
 * @throws Will throw an error if `name` is not a known thing.
 * @throws Will throw an error if there is already a pushable object at that location,
 * unless this is done from code in the Onload editor in which case the
 * new pushable object replaces the old one and a message is written to the browser's
 * console.
 */
RUR.add_pushable = function (name, x, y, options) {
    "use strict";
    var args;
    name = RUR.translate_to_english(name);
    args = {name: name, x:x, y:y, type:"pushables", single:true, valid_names: RUR.KNOWN_THINGS};
    if (RUR.get_pushable(x, y)) {
        if (RUR.state.evaluating_onload) {
            console.log(name + " is replacing " + RUR.translate(RUR.get_pushable(x, y)) + " as a bridge.");
        } else {
            throw new RUR.ReeborgError(RUR.translate("There can be at most one pushable object at a given location."));
        }
    }
    if (options && options.goal) {
        args.goal = options.goal;
    }
    RUR._add_artefact(args);
    RUR.record_frame("RUR.add_pushable", args);
};


/** @function remove_pushable
 * @memberof RUR
 * @instance
 * @summary This function removes a pushable at a location.
 *
 * @param {string} name The name of a the "thing" used as a pushable.
 * @param {integer} x  Position: `1 <= x <= max_x`
 * @param {integer} y  Position: `1 <= y <= max_y`
 * @param {boolean} [options.goal] Indicate if this is to be set as a goal
 *
 * @throws Will throw an error if `(x, y)` is not a valid location.
 * @throws Will throw an error if there is no such named pushable at that location.
 * @throws Will throw an error if `name` is not a known thing.
 *
 */
RUR.remove_pushable = function (name, x, y, options) {
    "use strict";
    var args, english_name;
    english_name = RUR.translate_to_english(name);
    args= {x:x, y:y, type:"pushables", name:english_name, valid_names: RUR.KNOWN_THINGS};
    if (options && options.goal) {
        args.goal = options.goal;
    }
    if (RUR.get_pushable(x, y, options) == name) {
        RUR._remove_artefact(args);
    } else {
        throw new RUR.ReeborgError("No pushable named <code>" + name + "</code> to remove here.");
    }
    RUR.record_frame("RUR.remove_pushable", args);
};


/** @function get_pushable
 * @memberof RUR
 * @instance
 * @summary This function returns the name of a pushable found at that location;
 *          If nothing is found at that location,`null` is returned
 *          (which is converted to `None` in Python programs.)
 *
 * @returns {string} The name of the pushable at that location, or `null`.
 * @param {integer} x  Position: `1 <= x <= max_x`
 * @param {integer} y  Position: `1 <= y <= max_y`
 * @param {boolean} [options.goal] Indicate if this was set as a goal
 *
 * @throws Will throw an error if `(x, y)` is not a valid location.
 *
 */
RUR.get_pushable = function (x, y, options) {
    "use strict";
    var tiles, args = {x:x, y:y, type:"pushables"};
    if (options && options.goal) {
        args.goal = options.goal;
    }
    tiles = RUR._get_artefacts(args);
    if (tiles === null) {
        return null;
    } else {
        return RUR.translate(tiles[0]);
    }
};


/** @function is_pushable
 * @memberof RUR
 * @instance
 * @summary This function returns `true/True` if such a named pushable
 * (possibly a goal) is at that location, `false/False` otherwise.
 *
 * @param {integer} x  Position: `1 <= x <= max_x`
 * @param {integer} y  Position: `1 <= y <= max_y`
 * @returns {string} The name of the pushable at that location, or `null`.
 * @param {boolean} [options.goal] Indicate if we want a pushable goal
 *
 * @throws Will throw an error if `(x, y)` is not a valid location.
 * @throws Will throw an error if `name` is not a known thing.
 *
 */

RUR.is_pushable = function (name, x, y, options) {
    "use strict";
    if (RUR.KNOWN_THINGS.indexOf(RUR.translate_to_english(name)) == -1) {
        throw new RUR.ReeborgError(RUR.translate("Unknown object").supplant({obj: name}))
    }
    return name == RUR.get_pushable(x, y, options);
};


// This function is kept private as it should not need to be used when
// creating worlds.
RUR._push_pushable = function (name, from_x, from_y, to_x, to_y) {
    recording_state = RUR.state.do_not_record;
    RUR.state.do_not_record = true;
    RUR.remove_pushable(name, from_x, from_y);
    RUR.add_pushable(name, to_x, to_y);
    RUR.state.do_not_record = recording_state;
};
},{"./../recorder/record_frame.js":38,"./../rur.js":44,"./../utils/key_exist.js":66,"./../utils/supplant.js":71,"./../utils/validator.js":72,"./artefact.js":74}],83:[function(require,module,exports){
require("./../rur.js");
require("./../recorder/record_frame.js");


RUR.add_robot = function (robot) {
    var world = RUR.get_current_world();
    if (world.robots === undefined){
        world.robots = [];
    }
    if (robot === undefined) {
        robot = RUR.robot.create_robot();
    }
    world.robots.push(robot);
    RUR.record_frame("RUR.add_robot", robot.__id);
};


/** @function is_robot
 * @memberof RUR
 * @instance
 * @summary This function indicates if at least one robot is found at
 *   the specified location, false otherwise. No error checking
 *   is performed on the arguments.  If some exception is raised,
 *   it is simply logged in the browser's console.
 *
 * @param {integer} x  Position
 * @param {integer} y  Position
 *
 * @returns {bool} True if a robot is found at that position, false otherwise.
 *
 **/

 RUR.is_robot = function (x, y) {
    "use strict";
    var r, robot, world=RUR.get_current_world();

    if (world.robots === undefined || world.robots.length === 0) {
        return false;
    }

    try {
        for (r=0; r<world.robots.length; r++) {
            robot = world.robots[r];
            if (robot.x == x && robot.y == y){
                return true;
            }
        }
    } catch(e) {
        console.warn("error in RUR.is_robot ", e);
    }
    return false;
 };

 /** @function get_robot_body_by_id
 *
 * @memberof RUR
 * @instance
 * @summary **IMPORTANT** This function should only be used for the advanced
 * frame insertion technique.
 *
 * This function indicates returns a robot "body" specified by
 * its id, if a robot with such an id exists.  (The `id` is
 * like a serial number: it is a number unique for each robot created).
 * No error checking is performed on the argument.  If some exception is raised,
 * it is simply logged in the browser's console.
 *
 * **Important:** This function cannot be used directly in a Python program
 * to yield something sensible. (If you want, you can convert the result
 * to a Python dict() -- provided it is not None, of course.)
 * From Python, use instead `get_robot_by_id()` (without the RUR prefix),
 * or `robot_spécifique` in French,
 * which returns a true Python UsedRobot instance.
 *
 * @param {integer} id
 *
 * @returns {object} the body of the robot as a Javascript object, `null` if
 *         a robot with this id cannot be found.
 *
 **/

RUR.get_robot_body_by_id = function (id) {
    "use strict";
    var r, robot_body, world=RUR.get_current_world();

    if (world.robots === undefined || world.robots.length === 0) {
        return null;
    }

    try {
        for (r=0; r<world.robots.length; r++) {
            robot_body = world.robots[r];
            if (robot_body.__id == id){
                return robot_body;
            }
        }
    } catch(e) {
        console.warn("error in RUR.get_robot_body_by_id ", e);
    }
    return null;
 };

 /** @function get_robot_by_id
 *
 * @memberof RUR
 * @instance
 * @summary **IMPORTANT** This function should only be used for the advanced
 * frame insertion technique.
 * This function indicates returns a Javascript UsedRobot instance
 * specified by its id, if a robot with such an id exists.  (The `id` is
 * like a serial number: it is a number unique for each robot created).
 * No error checking is performed on the argument.
 * If some exception is raised, it is simply logged in the browser's console.
 *
 * **Important:** This function cannot be used directly in a Python program
 * to yield something sensible.
 * From Python, use instead `get_robot_by_id()` (without the RUR prefix),
 * or `robot_spécifique` in French,
 * which returns a true Python UsedRobot instance.
 *
 * @param {integer} id
 *
 * @returns {object} A Javascript UsedRobot instance corresponding to the
 * robot with the specified id, or `null` if a robot with this id cannot be found.
 *
 **/

RUR.get_robot_by_id = function (id) {
    "use strict";
    var body, robot;
    body = RUR.get_robot_body_by_id(id);
    if (body === null) {
        return null;
    } else {
        robot = Object.create(RUR.UsedRobot.prototype);
        robot.body = body;
        return robot;
    }
 };

 /** @function get_robot_location
 *
 * @memberof RUR
 * @instance
 * @desc **IMPORTANT** This function should only be used for the advanced
 * frame insertion technique; in normal programs, used `position_here()`.
 * Use `import reeborg_en` followed by `help(reeborg_en.position_here())`
 * for details about the return values which are different from those of
 * `RUR.get_robot_location()`.
 *
 * This function returns the location of a robot (position **and** orientation).
 *
 * @param {object} robot_body A robot body object, having the proper attribute
 *    for position (x, y coordinates) and orientation.  Note that you should
 *    pass in a robot body object obtained from some other function,
 *    such as `RUR.get_robot_body_by_id()`, since
 *    the internal names for the various attributes are subject to change.
 *
 * @returns {object} An object of the form
 *      `{x:x_value, y:y_value, orientation:orientation_value} where
 *      `x_value` and `y_value` are integers and
 *      `orientation_value` is one of `"east"`, `"west"`, `"north"`, `"south"`.
 *
 **/

RUR.get_robot_location = function (robot_body) {
    "use strict";
    var orientation;
    if (!robot_body || robot_body.x === undefined || robot_body.y === undefined ||
        robot_body._orientation === undefined) {
        throw new Error("robot body needed as argument for RUR.get_location().");
    }

    switch (robot_body._orientation){
    case RUR.EAST:
        orientation = "east";
        break;
    case RUR.NORTH:
        orientation = "north";
        break;
    case RUR.WEST:
        orientation = "west";
        break;
    case RUR.SOUTH:
        orientation = "south";
        break;
    case RUR.RANDOM_ORIENTATION:
        throw new RUR.ReeborgError(RUR.translate("I am too dizzy!"));
    default:
        throw new Error("Should not happen: unhandled case in RUR.get_location().");
    }
    return {x:robot_body.x, y:robot_body.y, orientation:orientation};
};


 /** @function get_position_in_front
 *
 * @memberof RUR
 * @instance
 * @desc **IMPORTANT** This function should only be used for the advanced
 * frame insertion technique; in normal programs, used `position_in_front()`.
 * Use `import reeborg_en` followed by `help(reeborg_en.position_in_front())`
 * for details about the return values which are different from those of
 * `RUR.get_position_in_front()`.
 *
 * @param {object} robot_body A robot body object, having the proper attribute
 *    for position (x, y coordinates) and orientation.  Note that you should
 *    pass in a robot body object obtained from some other function
 *    such as `RUR.get_robot_body_by_id()`, since
 *    the internal names for the various attributes are subject to change.
 *
 * @returns {object} An object of the form
 *      `{x:x_value, y:y_value} where `x_value` and `y_value` are integers and
 * represent the position in front of the robot. If the position is not
 * within the world boundaries, the object `{x:0, y:0}` is returned.
 *
 **/

RUR.get_position_in_front = function (robot_body) {
    "use strict";
    var x, y;
    if (!robot_body || robot_body.x === undefined || robot_body.y === undefined) {
        throw new Error("robot body needed as argument for RUR.get_position_in_front().");
    }
    switch (robot_body._orientation){
    case RUR.EAST:
        x = robot_body.x + 1;
        y = robot_body.y;
        break;
    case RUR.NORTH:
        y = robot_body.y + 1;
        x = robot_body.x;
        break;
    case RUR.WEST:
        x = robot_body.x - 1;
        y = robot_body.y;
        break;
    case RUR.SOUTH:
        y = robot_body.y - 1;
        x = robot_body.x;
        break;
    case RUR.RANDOM_ORIENTATION:
        throw new RUR.ReeborgError(RUR.translate("I am too dizzy!"));
    default:
        throw new Error("Missing _orientation attribute for robot_body in RUR.get_position_in_front().");
    }
    if (RUR.is_valid_position(x, y)) {
        return {x:x, y:y};
    } else {
        return {x:0, y:0};
    }

};

 /** @function add_final_position
 *
 * @memberof RUR
 * @instance
 * @summary This function adds a final position as a goal for the default robot.
 * It is possible to call this function multiple times, with different
 * `x, y` positions; doing so will result in a final position chosen
 * randomly (among the choices recorded) each time a program is run.
 *
 * If `x, y` had previously been set as a goal final position
 * no change is being made and a message is logged in the browser's console.
 *
 * @param {string} name The name of the object/image we wish to use to
 *  represent the final position of the robot. Only one
 *  image can be used for a given world, even if many possible
 *  choices exist for the final position: each time this
 *  function is called, the `name` argument replaces any
 *  such argument that was previously recorded.
 *
 * @param {integer} x  The position on the grid
 * @param {integer} y  The position on the grid
 *
 * @todo: put in argument verification code and note which error can be thrown
 * @throws Will throw an error if the final position is not valid [not implemented yet]
 * @throws will throw an error if the name is not recognized [not implemented yet]
 **/


RUR.add_final_position = function (name, x, y) {
    "use strict";
    var goal, pos, world=RUR.get_current_world();

    RUR.utils.ensure_key_for_obj_exists(world, "goal");
    goal = world.goal;
    RUR.utils.ensure_key_for_obj_exists(goal, "position");
    RUR.utils.ensure_key_for_array_exists(goal, "possible_final_positions");

    for(var i=0; i<goal.possible_final_positions.length; i++) {
        pos = goal.possible_final_positions[i];
        if(pos[0]==x && pos[1]==y){
            console.log(x, y, ": this final position is already included!");
            return;
        }
    }

    goal.position.x = x;
    goal.position.y = y;
    goal.position.image = name;
    goal.possible_final_positions.push([x, y]);
    RUR.record_frame("add_final_position", {name:name, x:x, y:y});
};

 /** @function add_initial_position
 *
 * @memberof RUR
 * @instance
 * @summary This function adds an initial (starting) position as a possibility
 * for the default robot. It is possible to call this function multiple times,
 * with different `x, y` positions; doing so will result in a initial position
 * chosen randomly (among the choices recorded) each time a program is run.
 *
 * If `x, y` had previously been set as an initial position
 * no change is being made and a message is logged in the browser's console.
 *
 * @param {integer} x  The position on the grid
 * @param {integer} y  The position on the grid
 *
 * @todo: put in argument verification code and note which error can be thrown
 * @throws Will throw an error if the the world does not contain a robot
 * @throws Will throw an error if the initial position is not valid [not implemented yet]
 **/

RUR.add_initial_position = function (x, y) {
    "use strict";
    var robot, pos, world=RUR.get_current_world();
    if (world.robots === undefined || world.robots.length === 0) {
        throw new RUR.ReeborgError("This world has no robot; cannot set initial position.");
    }

    robot = world.robots[0];
    if (!robot.possible_initial_positions){
        robot.possible_initial_positions = [[robot.x, robot.y]];
    }

    for(var i=0; i<robot.possible_initial_positions.length; i++) {
        pos = robot.possible_initial_positions[i];
        if(pos[0]==x && pos[1]==y){
            console.log(x, y, ": this initial position is already included!");
            return;
        }
    }
    // in case we want to replace an existing initial position by adding
    // a new one, and then calling RUR.remove_initial_position,
    // we set the current initial position to the new one we just added.
    // This has no visible effect if more than one initial position is possible.
    robot._prev_x = robot.x = x;
    robot._prev_y = robot.y = y;

    robot.possible_initial_positions.push([x, y]);
    RUR.record_frame("add_initial_position", {x:x, y:y});
};


 /** @function remove_initial_position
 *
 * @memberof RUR
 * @instance
 * @summary This function removes an initial (starting) position as a possibility
 * for the default robot. It is possible to call this function multiple times,
 * with different `x, y` positions. However, if there is only one remaining
 * initial position, such calls will be ignored to ensure that there is
 * always a robot present.
 *
 * If `x, y` is not an initial position
 * no change is being made and a message is logged in the browser's console.
 *
 * @param {integer} x  The position on the grid
 * @param {integer} y  The position on the grid
 *
 * @todo: put in argument verification code and note which error can be thrown
 * @throws Will throw an error if the the world does not contain a robot
 * @throws Will throw an error if the initial position is not valid [not implemented yet]
 **/

RUR.remove_initial_position = function (x, y) {
    "use strict";
    var robot, pos, new_positions, world=RUR.get_current_world();
    if (world.robots === undefined || world.robots.length === 0) {
        throw new RUR.ReeborgError("This world has no robot; cannot remove initial position.");
    }  

    robot = world.robots[0];
    if (!robot.possible_initial_positions){
        robot.possible_initial_positions = [[robot.x, robot.y]];
        return;
    }

    if (robot.possible_initial_positions.length == 1) {
        return;
    }

    new_positions = [];
    for(var i=0; i<robot.possible_initial_positions.length; i++) {
        pos = robot.possible_initial_positions[i];
        if(pos[0]==x && pos[1]==y){
            continue;
        } else {
            new_positions.push(pos);
        }
    }

    robot.possible_initial_positions = new_positions;
    RUR.record_frame("remove_initial_position", {x:x, y:y});
};



// TODO: try to set it in the middle of a program to have Reeborg being "dizzy".
 /** @function set_random_orientation
 *
 * @memberof RUR
 * @instance
 * @summary This function sets the initial (starting) orientation so that it
 * will be chosen randomly.
 *
 * @param {object} [robot_body]  Optional robot body object
 *
 * @throws Will throw an error if it is called without an argument and
 * the world does not contain a robot.
 **/

RUR.set_random_orientation = function (robot_body) {
    "use strict";
    var world=RUR.get_current_world();
    if (robot_body === undefined) {
        if (world.robots === undefined || world.robots.length < 1) {
            throw new RUR.ReeborgError("This world has no robot; cannot set random orientation.");
        }
        robot_body = world.robots[0];
    } else if (robot_body.__id === undefined) {
        throw new RUR.ReeborgError("Invalid robot_body argument in RUR.set_random_orientation.");
    }

    robot_body._orientation = RUR.RANDOM_ORIENTATION;
    robot_body._prev_orientation = RUR.RANDOM_ORIENTATION;

    RUR.record_frame("set_random_orientation", robot_body.__id);
};
},{"./../recorder/record_frame.js":38,"./../rur.js":44}],84:[function(require,module,exports){
require("./../rur.js");
require("./../translator.js");
require("./animated_images.js");
require("./../programming_api/exceptions.js");
require("./../utils/supplant.js");

/** @function add_new_thing
 * @memberof RUR
 * @instance
 * @summary This method makes it possible to add new "things", represented
 * by an image.
 *
 * If the name of an existing thing is specified with different properties,
 * it is replaced by the new one.
 *
 * **Important** Other than for testing purposes, This method should
 * only be called from the "Onload" editor so that it can start fetching
 * the required images as soon as possible, and try to ensure that the
 * images will be ready to be shown when a program is executed.
 *
 * @param {Object} thing A Javascript object (similar to a Python dict) that
 * describes the properties of the "thing".
 *
 * @param {string} thing.name  The name to be given to the "thing"; an exception
 * will be raisd if it is missing.
 *
 * @param {string} [thing.info] Some information to be displayed about this "thing"
 * when a user clicks on "World Info" and then on this thing on the world canvas.
 * It is highly recommended to include this.
 *
 * @param {string} [thing.color] A string representing a valid html color
 * (named, rgb, rgba, hsl or #-notation).
 * **Either `thing.color`, thing.url` or `thing.images` must be specified.**
 *
 * @param {string} [thing.url] If a single image is used, this indicated the source.
 *  **Either `thing.color`, `thing.url` or `thing.images` must be specified.**
 *
 * @param {strings[]} [thing.images] If multiple images are used
 * (for animated "things"), this array (list) contains the various URLs.
 *  **Either `thing.color`, `thing.url` or `thing.images` must be specified.**
 *
 * @param {string} [thing.selection_method]  For animated "things"; choose one of
 *
 *  * `"sync"`,
 *  * `"ordered"`,
 *  * `"random"`,
 *  * `"cycle stay"` or
 *  * `"cycle remove"`.
 *
 *  If the selection method is not recognized, `"random"` will
 *  be used, and no error will be thrown.
 *
 * @param {object} [thing.goal]  If the "things" can be used for an object that can be
 * picked up or put down by Reeborg, includes `thing.goal` to describe the image(s),
 * following the same pattern as above (`thing.goal.url`, `thing.goal.images`,
 * `thing.goal.selection_method`), except that `goal` is ignored if `color` is true.
 *
 * @param {string} [thing.fatal] Program ends if Reeborg steps on such a "thing" with
 * a value that is equivalent to "true" when used as background things or obstacles,
 * unless a bridge offering the adequate protection is present or an object
 * carried by Reeborg has the right protection defined.
 * This value is usually set to the name of the "things" so as to facilitate
 * defining objects or bridges which offer the right protection.
 * For `fatal` things, `message` should be defined as well.
 *
 * @param {string} [thing.message] The message shown when Reeborg steps on
 * a `fatal` tile.
 *
 * @param {string} [thing.detectable] If `thing.fatal` and  `thing.detectable` are
 * both equivalent to "true", Reeborg can detect this "thing" with
 * `front_is_clear()` and `right_is_clear()` if it is set as an obstacle
 * or a background thing.
 *
 * @param {strings[]} [thing.protections] Indicates against which `fatal` thing this
 * offer protection.  Protection is given when things are used as a bridge or
 * when they are carried.
 *
 * @param {boolean} [thing.solid] If sets to `True`, prevents a pushable object
 * from sliding onto this "things" when used as a background thing or as an
 * obstacle.
 *
 * @param {integer} [thing.x_offset] By default, "things" are drawn on a set grid.
 * Specifying a value for `x_offset` result in the "things" drawn off grid, by a
 * number of pixel equal to `x_offset`. This is only valid for images - not for
 * colors.
 *
 * @param {integer} [thing.y_offset] By default, "things" are drawn on a set grid.
 * Specifying a value for `y_offset` result in the "thing" drawn off grid, by a
 * number of pixel equal to `y_offset`. This is only valid for images - not for
 * colors.
 *
 * @param {object} [thing.transform] See the book
 * **Reeborg's World: a Teacher's guide** for an explanation.
 *
 * @throws Will throw an error if `name` attribute is not specified.
 * @throws Will throw an error if no image is supplied (either via the `url`
 *         or the `images` attribute) and `color` does not evaluate to true.
 */

RUR.add_new_thing = function (thing) {
    "use strict";
    var name;
    name = thing.name;

    if (name === undefined){
        throw new RUR.ReeborgError("RUR.add_new_thing(thing): thing.name attribute missing.");
    }

    RUR.KNOWN_THINGS.push(name);
    RUR.THINGS[name] = thing;
    if (thing.color) {
        return;
    }
    create_images(thing);
    // Object goal (not required for decorative objects): either
    // a single url or a list for animated images.
    if (thing.goal) {
        create_images(thing.goal);
    }
};

function create_images(obj) {
    if (obj.url) {
        obj.image = new Image();
        obj.image.src = obj.url;
        obj.image.onload = RUR.onload_new_image;
    } else if (obj.images) {
        RUR.animate_images(obj);
    } else {
        throw new RUR.ReeborgError("Fatal error: need either thing.url or a list [thing.images]");
    }
}

/** @function show_all_things
 * @memberof RUR
 * @instance
 *
 * @summary This method shows all known "things" in a table, with the exception
 * of those defined with the `color` attribute. If a language
 * other than English is selected, the translated name appears as well; this
 * can be helpful to identify missing translations.
 * If multiple images are shown, it means that the "thing" is shown as an
 * animation in a world.
 * Missing images in the **goal** column indicate that this "thing" cannot
 * be used as an object to be picked up by Reeborg.
 *
 * @param {string} [property] If this argument is provided, only "things" for
 * which this property/attribute is defined will be shown,
 * and the value of the attribute will be shown as well.
 *
 * @example
 * RUR.show_all_things()
 * RUR.show_all_things("fatal")
 */
RUR.show_all_things = function (property) {
    var i, j, info, images, name, url, begin, end, prop_str;
    if (property !== undefined) {
        info = "<h3>Things with property <code>" + property + "</code></h3>";
        prop_str = "<th>" + property + "</th>";
    } else {
        info = '';
        prop_str = '';
    }
    begin = "<table border='1'><tr><th>name</th>";
    end = "<th>image(s)</th><th>goal?</th></tr>";
    if (RUR.state.human_language != 'en') {
            info += begin + "<th>translation</th>" + prop_str + end;
        } else {
            info += begin + prop_str + end;
        }
    for (i=0; i< RUR.KNOWN_THINGS.length; i++) {
        name = RUR.KNOWN_THINGS[i];
        if (property !== undefined) {
            if (RUR.THINGS[name][property] === undefined) {
                continue;
            }
        }
        if (RUR.THINGS[name].color) {
            continue;
        }
        url = RUR.THINGS[name].url;
        images = RUR.THINGS[name].images;
        info += "<tr><td>" +  name + "</td><td>";
        if (RUR.state.human_language != 'en') {
            info += RUR.translate(name) + "</td><td>";
        }
        if (property !== undefined) {
            info +=  RUR.THINGS[name][property] + "</td><td>";
        }
        if (url !== undefined) {
            info += "<img src = '" + RUR.THINGS[name].url + "'><br>" +
                   RUR.THINGS[name].url + "</td><td>";
        } else if (images !== undefined) {
            for(j=0; j<images.length; j++) {
                info += "<img src = '" + images[j] + "'> &nbsp; ";
            }
            for(j=0; j<images.length; j++) {
                info += "<br>" + images[j];
            }
            info += "</td><td>";
        } else {
            info += "Missing image</td><td>";
        }
        if (RUR.THINGS[name].goal !== undefined) {
            info += "<img src = '" + RUR.THINGS[name].goal.url + "'><br>" +
                    RUR.THINGS[name].goal.url;
        }
        info += "</td></tr>";
    }
    info += "</table>";
    RUR._print_html_(info, true); // true will replace existing content
    return null; // for the python repl
};

/** @function has_property
 * @memberof RUR
 * @instance
 *
 * @summary This method returns "true" if a "thing" has the stated property,
 * and "false" otherwise
 *
 * @param {string} name The name of the "thing".
 *
 * @param {string} property
 *
 * @example {@lang python}
 * # Python example
 * print(RUR.has_property("water", "fatal"))
 *
 * @example
 * // Javascript example
 * write(RUR.has_property("water", "fatal"))
 */
RUR.has_property = function (name, property) {
    name = RUR.translate_to_english(name);
    if (RUR.THINGS[name] === undefined) {
        throw new RUR.ReeborgError(RUR.translate("Unknown object").supplant({obj:name}));
    }
    if (RUR.THINGS[name][property] === undefined) {
        return false;
    } else {
        return true;
    }
};

/** @function get_property
 * @memberof RUR
 * @instance
 *
 * @summary This method returns the value of a given property for a "thing".
 * **Important:** the returned value will be the English default even if a
 * translation exists and might appear in other contexts, like the
 * "World Info".
 *
 * If the property is undefined, `null` will be returned (which will be
 * converted to `None` if Python is used).
 *
 * @param {string} name The name of the "thing".
 *
 * @param {string} property See the examples
 *
 *
 * @example {@lang python}
 * print(RUR.get_property("water", "info"))  # Python
 *
 * @example {@lang javascript}
 * write(RUR.get_property("water", "fatal"))  // Javascript
 */
RUR.get_property = function (name, property) {

    name = RUR.translate_to_english(name);

    if (RUR.THINGS[name] === undefined) {
        throw new RUR.ReeborgError(RUR.translate("Unknown object").supplant({obj:name}));
    }

    property = RUR.THINGS[name][property];
    if (property === undefined) {
        return null;
    } else {
        return property;
    }
};

// Internal function used with name already translated into English;
// we undo the translation to avoid having a warning for a missing
// translation logged in the browser console.
RUR._get_property = function (name, property) {
    return RUR.get_property(RUR.translate(name), property);
};


/*=============================
/
/   Deprecated methods below; likely used in Vincent Maille's book
/
/===========================*/

RUR.add_new_object_type = function (name, url, url_goal) {
    RUR.add_new_thing({"name": name, "url": url, "goal": {"url": url_goal}});
};
RUR.add_object_image = RUR.add_new_object_type;

},{"./../programming_api/exceptions.js":28,"./../rur.js":44,"./../translator.js":46,"./../utils/supplant.js":71,"./animated_images.js":73}],85:[function(require,module,exports){
require("./../rur.js");
require("./../translator.js");
require("./../programming_api/exceptions.js");
require("./../utils/key_exist.js");
require("./../utils/validator.js");
require("./../utils/supplant.js");
require("./../recorder/record_frame.js");
require("./artefact.js");

/*=========================================
Walls data structure

Worlds are defined such that walls are listed only to the East or to the
North of a given position. However, this is an implementation detail
which could be changed without affecting what information is
given to the user.

Also, worlds are defined so that they are rectangular with walls on
all sides. However, these walls are not included in the data structure
that lists the walls, and must be handled separately.
*/


/** @function add_wall
 * @memberof RUR
 * @instance
 * @summary This function adds a wall at the stated
 * stated position and orientation if there is none already located there;
 * otherwise, it raises an exception, except if this is done in the
 * Onload phase in which case it simply logs in an exception.
 *
 * @param {string} orientation  One of `"east", "west", "north", "south"`.
 * @param {integer} x  Position: `1 <= x <= max_x`
 * @param {integer} y  Position: `1 <= y <= max_y`
 * @param {bool} [options.goal] If `true`, get information about goal walls.
 *
 * @throws Will throw an error if `x` or `y` is outside the world boundary.
 * @throws Will throw an error if `orientation` is not a valid choice.
 * @throws Will throw an error if there is already a wall there,
 * except if this is done in the
 * Onload phase in which case it simply logs in an exception.
 *
 */
RUR.add_wall = function(orientation, x, y, options) {
    "use strict";
    var args;

    if (RUR.is_wall(orientation, x, y, options)){
        if (RUR.state.evaluating_onload) {
            console.log("Ignoring call to add a wall: ", orientation);
        } else {
            throw new RUR.ReeborgError(RUR.translate("There is already a wall here!"));
        }
    }
    args = convert_position(RUR.translate_to_english(orientation), x, y);
    if (options && options.goal) {
        args.goal = options.goal;
    }
    args.type = "walls";
    RUR._add_artefact(args);
    RUR.record_frame("add_wall", args);
};


/** @function get_walls
 * @memberof RUR
 * @instance
 * @summary This function returns a list of walls at a location from within
 * the boundaries of a normal (rectangular) world. The order in which they are
 * listed, if present, is `"east"`, `"north"`, `"west"`, `"south"`.
 *
 * @param {integer} x  Position: `1 <= x <= max_x`
 * @param {integer} y  Position: `1 <= y <= max_y`
 * @param {bool} [options.goal] If `true`, list the goal walls found at that
 * position instead of regular walls.
 *
 * @throws Will throw an error if `x` or `y` is outside the world boundary.
 *
 */
RUR.get_walls = function(x, y, options) {
    var walls = [];
    if (RUR._is_wall("east", x, y, options)) {
        walls.push(RUR.translate("east"));
    }
    if (RUR._is_wall("north", x, y, options)) {
        walls.push(RUR.translate("north"));
    }
    if (RUR._is_wall("west", x, y, options)) {
        walls.push(RUR.translate("west"));
    }
    if (RUR._is_wall("south", x, y, options)) {
        walls.push(RUR.translate("south"));
    }
    return walls;
};


/** @function is_wall
 * @memberof RUR
 * @instance
 * @summary This function returns `true/True` if a wall is found at the
 * stated position and orientation, and `false/False` otherwise.
 *
 * @param {string} orientation  One of `"east", "west", "north", "south"`.
 * @param {integer} x  Position: `1 <= x <= max_x`
 * @param {integer} y  Position: `1 <= y <= max_y`
 * @param {bool} [options.goal] If `true/True`, get information about goal walls
 *                      instead of regular walls.
 *
 *
 * @throws Will throw an error if `x` or `y` is outside the world boundary.
 * @throws Will throw an error if `orientation` is not a valid choice.
 *
 */
RUR.is_wall = function(orientation, x, y, options) {
    if (["east", "north", "west", "south"].indexOf(RUR.translate_to_english(orientation)) === -1) {
        throw new RUR.ReeborgError(
            RUR.translate("Invalid orientation.").supplant({orient:orientation}));
    }
    return RUR._is_wall(RUR.translate_to_english(orientation), x, y, options);
};

/* private version; works with English arguments */
RUR._is_wall = function(orientation, x, y, options) {
    var args;
    if (["east", "north", "west", "south"].indexOf(orientation) === -1) {
        throw new RUR.ReeborgError(
            RUR.translate("Invalid orientation.").supplant({orient:orientation}));
    }
    if (is_boundary_wall(orientation, x, y)) {
        return true;
    }
    args = convert_position(orientation, x, y);
    if (options && options.goal) {
        args.goal = options.goal;
    }
    args.type = "walls";
    if (RUR._get_nb_artefact(args) === 0) {
        return false;
    } else {
        return true;
    }
};



// private helper function
// perform argument checks and returns
// true if a wall of a specified orientation is found at a given
// location and false otherwise
function is_boundary_wall(orientation, x, y) {
    if ( (orientation == "east"  && x === RUR.MAX_X) ||
         (orientation == "north" && y === RUR.MAX_Y) ||
         (orientation == "west"  && x === 1) ||
         (orientation == "south" && y === 1) ) {
        return true;
    }
    return false;
}


/** @function remove_wall
 * @memberof RUR
 * @instance
 * @summary This function removes a wall at the stated
 * stated position and orientation if there there is one already located there;
 * otherwise, it raises an exception.
 *
 * @param {string} orientation  One of `"east", "west", "north", "south"`.
 * @param {integer} x  Position: `1 <= x <= max_x`
 * @param {integer} y  Position: `1 <= y <= max_y`
 * @param {bool} [goal] If `true`, get information about goal walls.
 *
 * @throws Will throw an error if `x` or `y` is outside the world boundary.
 * @throws Will throw an error if `orientation` is not a valid choice.
 * @throws Will throw an error if there is no wall to remove.
 *
 */
RUR.remove_wall = function(orientation, x, y, options) {
    var args, world=RUR.get_current_world();
    // the following function call will raise an exception if
    // the orientation or the position is not valid
    wall_here = RUR.is_wall(orientation, x, y, options);
    if (!wall_here){
        throw new RUR.ReeborgError(RUR.translate("There is no wall to remove!"));
    }

    args = convert_position(RUR.translate_to_english(orientation), x, y);
    if (options && options.goal) {
        args.goal = options.goal;
    }
    args.type = "walls";
    RUR._remove_artefact(args);
    // _remove_artefact can remove a container of a type of artefact if it
    // is empty; however, for historical reason, worlds are always created
    // with a "walls" attribute
    RUR.utils.ensure_key_for_obj_exists(world, "walls");
    RUR.record_frame("remove_wall", args);
};

function convert_position (orientation, x, y) {
    var _x, _y, _orientation;
    switch (orientation){
    case "east":
        _orientation = "east";
        _x = x;
        _y = y;
        break;
    case "north":
        _orientation = "north";
        _x = x;
        _y = y;
        break;
    case "west":
        _orientation = "east";
        _x = x-1;
        _y = y;
        break;
    case "south":
        _orientation = "north";
        _x = x;
        _y = y-1;
        break;
    default:
        throw new RUR.ReeborgError("Should not happen: unhandled case in add_wall().");
    }
    return {name:_orientation, x:_x, y:_y};
}

},{"./../programming_api/exceptions.js":28,"./../recorder/record_frame.js":38,"./../rur.js":44,"./../translator.js":46,"./../utils/key_exist.js":66,"./../utils/supplant.js":71,"./../utils/validator.js":72,"./artefact.js":74}],86:[function(require,module,exports){
/* Obtain specific information about the world, either at a given
   position, or for the world in general.
*/

require("./../rur.js");
require("./../translator.js");
require("./../programming_api/exceptions.js");
require("./../default_tiles/tiles.js");
require("./../dialogs/create.js");
require("./../listeners/canvas.js");
require("./../utils/supplant.js");
require("./../world_api/things.js");
require("./../world_api/background_tile.js");

RUR.world_get = {};

RUR.world_get.object_at_robot_position = function (robot, obj) { // TODO: still needed or move elsewhere?
    return object_of_type_here(robot, obj, RUR.get_current_world().objects);
};


function goal_to_achieve() {
    return "<h3>" + RUR.translate("Goal to achieve:") + "</h3>";
}


function difficulty(level) {
    var image_src, begin, i, robots;
    image_src = '<img src = "' + RUR.BASE_URL + '/src/images/transparent_robot.png"';
    begin = '<h3>' + RUR.translate("Difficulty level") + '</h3><div class="difficulty">';

    level = level[level.length-1];  // extract last character.
    level = parseInt(level, 10);
    if (level === 0) {
        level = 10;
    }
    robots = '';
    for (i=1; i <= level; i++) {
        robots += image_src + 'class = "difficulty' + i +'">';
    }
    for (i=level+1; i <= 10; i++) {
        robots += image_src + '>';
    }

    return begin + robots + '</div>';
}


function object_of_type_here (robot, obj, object_type) {
    // object_type == RUR.get_current_world().objects or RUR.get_current_world().decorative_objects
    var obj_here, obj_type, all_objects;
    var coords = robot.x + "," + robot.y;

    if (object_type === undefined ||
        object_type[coords] === undefined) {
        return [];
    }

    obj_here =  object_type[coords];
    all_objects = [];

    for (obj_type in obj_here) {
        if (obj_here.hasOwnProperty(obj_type)) {
            if (obj !== undefined && obj_type == RUR.translate_to_english(obj)) {
                return [RUR.translate(obj_type)];
            }
            all_objects.push(RUR.translate(obj_type));
        }
    }

    if (obj !== undefined) {
        return [];
    } else if (all_objects.length === 0){
        return [];
    } else {
        return all_objects;
    }
}

/** @function show_editors_content
 * @memberof RUR
 * @instance
 *
 * @desc Used to show (or not) the content of the various world
 * editors in the world's description (**World Info** button for English UI).
 *
 * @param {bool} show
 *
 */

RUR.show_editors_content = function (show) {
    RUR.SHOW_EDITORS_CONTENTS = show;
    RUR.world_get.world_info();
};


RUR.world_get.world_info = function (show_info_at_location) {
    "use strict";
    // Shows the world information, as included in the description editor.
    // In addition shows the information about a given grid position
    // when the user clicks on the canvas at that grid position.
    // If a global flag is set, it also show the various editors content.
    var content, description, goals, information, insertion, to_replace;
    var no_object, obj, r, robot, robots, x, y;

    // Default value if not description is provided:
    information = "<div class='automatic-description'><h2>" + RUR.translate("Description") + "</h2>";

    description = RUR.get_current_world().description;
    if (description === undefined) {
        description = '';
    } else if (typeof description != "string") {
        description = description.join("\n");
    }

    if (RUR.SHOW_EDITORS_CONTENTS) {
        if (RUR.get_current_world().onload) {
            description = "<h3>Onload editor content</h3>INSERT_ONLOAD" + description;
        }
         if (RUR.get_current_world().pre) {
            description = "<h3>Pre editor content</h3>INSERT_PRE" + description;
        }
        if (RUR.get_current_world().post) {
            description = "<h3>Post editor content</h3>INSERT_POST" + description;
        }
        if (RUR.get_current_world().editor) {
            description = "<h3>World's Editor content</h3>INSERT_EDITOR" + description;
        }
        if (RUR.get_current_world().library) {
            description = "<h3>World's Library content</h3>INSERT_LIBRARY" + description;
        }
    }

    if (description) {
        if (RUR.get_current_world().pre) {
            content = RUR.get_current_world().pre;
            if (typeof content != "string") {
                content = content.join("\n");
            }
            insertion = "<pre class='world_info_source'>" + content + "</pre>";
            to_replace = "INSERT_PRE";
            description = description.replace(to_replace, insertion);
        }
        if (RUR.get_current_world().editor) {
            content = RUR.get_current_world().editor;
            if (typeof content != "string") {
                content = content.join("\n");
            }
            insertion = "<pre class='world_info_source'>" + content + "</pre>";
            to_replace = "INSERT_EDITOR";
            description = description.replace(to_replace, insertion);
        }
        if (RUR.get_current_world().library) {
            content = RUR.get_current_world().library;
            if (typeof content != "string") {
                content = content.join("\n");
            }
            insertion = "<pre class='world_info_source'>" + content + "</pre>";
            to_replace = "INSERT_LIBRARY";
            description = description.replace(to_replace, insertion);
        }
        if (RUR.get_current_world().post) {
            content = RUR.get_current_world().post;
            if (typeof content != "string") {
                content = content.join("\n");
            }
            insertion = "<pre class='world_info_source'>" + content + "</pre>";
            to_replace = "INSERT_POST";
            description = description.replace(to_replace, insertion);
        }
        if (RUR.get_current_world().onload) {
            content = RUR.get_current_world().onload;
            if (typeof content != "string") {
                content = content.join("\n");
            }
            insertion = "<pre class='world_info_onload'>" + content + "</pre>";
            to_replace = "INSERT_ONLOAD";
            description = description.replace(to_replace, insertion);
        }
        description = description.replace("DIFFICULTY10", difficulty("difficulty10"));
        description = description.replace("DIFFICULTY1", difficulty("difficulty1"));
        description = description.replace("DIFFICULTY2", difficulty("difficulty2"));
        description = description.replace("DIFFICULTY3", difficulty("difficulty3"));
        description = description.replace("DIFFICULTY4", difficulty("difficulty4"));
        description = description.replace("DIFFICULTY5", difficulty("difficulty5"));
        description = description.replace("DIFFICULTY6", difficulty("difficulty6"));
        description = description.replace("DIFFICULTY7", difficulty("difficulty7"));
        description = description.replace("DIFFICULTY8", difficulty("difficulty8"));
        description = description.replace("DIFFICULTY9", difficulty("difficulty9"));

        // replace the default since a description was provided.
        information = "<div class='automatic-description'>" + description + "</div>";
    }

    if (show_info_at_location) {
        information = get_info_about_location() + information;
    }

    // Info about existing robots
    robots = RUR.get_current_world().robots;

    if (robots !== undefined && robots.length !== undefined){
        for (r=0; r<robots.length; r++){
            robot = robots[r];
            x = robot.x;
            y = robot.y;
            if (robot.possible_initial_positions !== undefined && robot.possible_initial_positions.length > 1){
                x = RUR.translate("random location");
                y = '';
            }
            no_object = true;
            for (obj in robot.objects){
                if (robot.objects.hasOwnProperty(obj)) {
                    if (no_object) {
                        no_object = false;
                        information += "<br><b>" + RUR.translate("A robot located here carries:").supplant({x:x, y:y}) + "</b>";
                    }
                    information += "<br>" + RUR.translate(obj) + ":" + RUR.translate(robot.objects[obj].toString());
                }
            }
            if (no_object){
                information += "<br><b>" + RUR.translate("A robot located here carries no objects.").supplant({x:x, y:y}) + "</b>";
            }
        }
    }

    // Goal: final position of the robot - only one can be specified

    goals = RUR.get_current_world().goal;
    if (goals !== undefined &&
         (goals.possible_final_positions !== undefined || goals.position !== undefined)){

        information += goal_to_achieve();
        if (goals.possible_final_positions !== undefined && goals.possible_final_positions.length > 2) {
            information += RUR.translate("The final required position of the robot will be chosen at random.");
        } else {
            information += RUR.translate("The final position of the robot must be (x, y) = ") +
                           "(" + goals.position.x + ", " + goals.position.y + ")";
        }
    }

    if (!description) {
        information = information + "</div>";
    }


    $("#World-info").html(information + '</div>');
    // automatically determined from running program
    $('.world_info_source').each(function() {
        var $this = $(this), $code = $this.text();
        $this.empty();
        CodeMirror(this, {
            value: $code,
            mode:  RUR.state.programming_language,
            lineNumbers: !$this.is('.inline'),
            readOnly: true,
            theme: 'reeborg-readonly'
        });
    });
    $('.world_info_onload').each(function() {
        var $this = $(this), $code = $this.text();
        $this.empty();
        CodeMirror(this, {
            value: $code,
            mode:  RUR.state.onload_programming_language,
            lineNumbers: !$this.is('.inline'),
            readOnly: true,
            theme: 'reeborg-readonly'
        });
    });

    // defined explicitly by World Creator
    $('.python').each(function() {
        var $this = $(this), $code = $this.text();
        $this.empty();
        CodeMirror(this, {
            value: $code,
              mode: {
                name: "python",
                version: 3
              },
            lineNumbers: !$this.is('.inline'),
            readOnly: true,
            theme: 'reeborg-readonly'
        });
    });
    $('.javascript').each(function() {
        var $this = $(this), $code = $this.text();
        $this.empty();
        CodeMirror(this, {
            value: $code,
            mode:  'javascript',
            lineNumbers: !$this.is('.inline'),
            readOnly: true,
            theme: 'reeborg-readonly'
        });
    });
    $('.html').each(function() {
        var $this = $(this), $code = $this.text();
        $this.empty();
        CodeMirror(this, {
            value: $code,
            mode:  "htmlmixed",
            lineNumbers: !$this.is('.inline'),
            readOnly: true,
            theme: 'reeborg-readonly'
        });
    });

};


function get_info_about_location() {
    /* finds all the relevant information about a location where the
       user has clicked. */
    "use strict";
    var position, x, y, coords, grid_info, need_heading, goals;
    var tile, tilename, tiles, fence_noted;
    var obj, obj_here, obj_type;
    var special_info_about_location = "<h3>" + RUR.translate("Special information about this location:") + "</h3>";

    position = RUR.calculate_grid_position();
    x = position[0];
    y = position[1];
    if (isNaN(x) || isNaN(y)){
        return '';
    }

    coords = x + "," + y;
    grid_info = "<div class='grid-info'><code>x,y = " + coords + "</code><br>";

    try {
        tile = RUR.get_background_tile(x, y);
        if (tile) {
            tile = RUR.THINGS[tile];
        }
    } catch (e) {
        tile = false;
    }

    need_heading = true;
    if (tile){
        if (RUR.translate(tile.info)) {
            need_heading = false;
            grid_info += special_info_about_location;
            grid_info += RUR.translate(tile.info) + "<br>";
        }
    }

    // obstacles at that location; same topic heading as for background tiles
    try {
        tiles = RUR.get_obstacles(x, y);
    } catch (e) {
        tiles = false;
    }
    if (tiles) {
        for (tilename of tiles) {
            tile = RUR.THINGS[tilename];
            if (RUR.translate(tile.info)){
                if (need_heading) {
                    need_heading = false;
                    grid_info += special_info_about_location;
                }
                if (tile.name == "fence") {
                    // multiple fences can be drawn at a single location to
                    // create a compount fence; the only information relevant
                    // to the user is that there is at least one fence there.
                    if (!fence_noted) {
                        fence_noted = true;
                        grid_info += RUR.translate(tile.info) + "<br>";
                    }
                } else {
                    grid_info += RUR.translate(tile.info) + "<br>";
                }
            }
        }
    }

    // objects at that location
    obj = RUR.get_current_world().objects;
    need_heading = true; // done with previous heading

    if (obj !== undefined && obj[coords] !== undefined){
        obj_here = obj[coords];
        for (obj_type in obj_here) {
            if (obj_here.hasOwnProperty(obj_type)) {
                if (need_heading) {
                    need_heading = false;
                    grid_info += "<h3>" + RUR.translate("Objects found here:") + "</h3>";
                }
                grid_info += RUR.translate(obj_type) + ":" + obj_here[obj_type];
                grid_info += " " + RUR.translate(RUR._get_property(obj_type, "info"))+"<br>";
            }
        }
    }

    // goal to achieve that that location
    goals = RUR.get_current_world().goal;
    need_heading = true; // done with previous heading

    if (goals !== undefined){
        obj = goals.objects;
        if (obj !== undefined && obj[coords] !== undefined){
            obj_here = obj[coords];
            for (obj_type in obj_here) {
                if (obj_here.hasOwnProperty(obj_type)) {
                    if (need_heading){
                        need_heading = false;
                        grid_info += goal_to_achieve();
                    }
                   grid_info += RUR.translate(obj_type) + ":" + obj_here[obj_type] + "<br>";
                }
            }
        }
        if (goals.walls !== undefined) {
            if (goals.walls[coords] !== undefined){
                if (goals.walls[coords].indexOf("east") != -1) {
                    if (need_heading){
                        need_heading = false;
                        grid_info += goal_to_achieve();
                    }
                    grid_info += RUR.translate("A wall must be built east of this location.") + "<br>";
                }
                if (goals.walls[coords].indexOf("north") != -1) {
                    if (need_heading){
                        need_heading = false;
                        grid_info += goal_to_achieve();
                    }
                    grid_info += RUR.translate("A wall must be built north of this location.") + "<br>";
                }
            }
            x -= 1;
            coords = x + "," + y;
            if (goals.walls[coords] !== undefined){
                if (goals.walls[coords].indexOf("east") != -1) {
                    if (need_heading){
                        need_heading = false;
                        grid_info += goal_to_achieve();
                    }
                    grid_info += RUR.translate("A wall must be built west of this location.") + "<br>";
                }
            }
            x += 1;
            y -= 1;
            coords = x + "," + y;
            if (goals.walls[coords] !== undefined){
                if (goals.walls[coords].indexOf("north") != -1) {
                    if (need_heading){
                        need_heading = false;
                        grid_info += goal_to_achieve();
                    }
                    grid_info += RUR.translate("A wall must be built south of this location.") + "<br>";
                }
            }
        }
    }

    return grid_info + '</div>';
}

$(document).ready(function () {
 RUR.create_and_activate_dialogs( $("#world-info-button"), $("#World-info"),
                                 {height:600, width:800}, RUR.world_get.world_info);
});



/** @function show_description
 * @memberof RUR
 * @instance
 *
 * @desc Ensures that the world description window
 * (usually open from **World Info** button for English UI)
 * is shown.
 *
 */
RUR.show_description = function () {
    if ($("#world-info-button").hasClass("blue-gradient")) {
        $("#world-info-button").click();
    }
};

},{"./../default_tiles/tiles.js":1,"./../dialogs/create.js":3,"./../listeners/canvas.js":18,"./../programming_api/exceptions.js":28,"./../rur.js":44,"./../translator.js":46,"./../utils/supplant.js":71,"./../world_api/background_tile.js":75,"./../world_api/things.js":84}],87:[function(require,module,exports){
require("./../rur.js");

/* The following is used in a few places, including in unit and
   functional tests. It is not documented with JSdoc as it should not
   be required for normal world creation; the recommended practice being
   to start with an existing world. */
RUR.create_empty_world = function (blank_canvas) {
    "use strict";
    var world = {};
    if (blank_canvas) {
        world.blank_canvas = true;
        return world;
    }
    world.robots = [];
    world.walls = {};
    world.objects = {};
    world.small_tiles = false;
    world.rows = RUR.MAX_Y_DEFAULT;
    world.cols = RUR.MAX_X_DEFAULT;

    return world;
};
RUR.set_current_world(RUR.create_empty_world());
},{"./../rur.js":44}],88:[function(require,module,exports){
require("./../translator.js");
require("./../rur.js");
require("./../robot/robot.js");
require("./../drawing/visible_world.js");
require("./../programming_api/exceptions.js");
require("./../editors/create.js");
require("./create_empty_world.js");
require("./../world_api/animated_images.js");

var edit_robot_menu = require("./../ui/edit_robot_menu.js");

RUR.world_utils.import_world = function (json_string) {
    "use strict";
    var body;

    RUR.hide_end_dialogs();

    if (json_string === undefined || json_string === "undefined"){
        RUR.show_feedback("#Reeborg-shouts",
            RUR.translate("Problem in RUR.world_utils.import_world: world not defined."));
        console.log("Problem: no argument passed to RUR.world_utils.import_world");
        RUR.CURRENT_WORLD = RUR.create_empty_world();
        return;
    }
    RUR.reset_animated_images();
    if (typeof json_string == "string"){
        try {
            RUR.CURRENT_WORLD = JSON.parse(json_string) || RUR.create_empty_world();
        } catch (e) {
            alert("Exception caught in import_world; see console for details.");
            console.warn("Exception caught in import_world.");
            console.log("First 80 characters of json_string = ", json_string.substring(0, 80));
            console.log("Error = ", e);
            RUR.CURRENT_WORLD = RUR.create_empty_world();
        }
    } else {  // already parsed into a Javascript Object
        RUR.CURRENT_WORLD = json_string;
    }

    if (RUR.CURRENT_WORLD.robots !== undefined) {
        if (RUR.CURRENT_WORLD.robots[0]) {
            RUR.robot.modernize(RUR.CURRENT_WORLD.robots[0]);
            body = RUR.CURRENT_WORLD.robots[0];
            body._prev_x = body.x;
            body._prev_y = body.y;
            body._prev_orientation = body._orientation;
        } else {
            // protect against robots[0] == (undefined or null)
            RUR.CURRENT_WORLD.robots = [];
        }
    }

    convert_old_worlds();

    RUR.CURRENT_WORLD.small_tiles = RUR.CURRENT_WORLD.small_tiles || false;
    RUR.CURRENT_WORLD.rows = RUR.CURRENT_WORLD.rows || RUR.MAX_Y_DEFAULT;
    RUR.CURRENT_WORLD.cols = RUR.CURRENT_WORLD.cols || RUR.MAX_X_DEFAULT;
    RUR.set_world_size(RUR.CURRENT_WORLD.cols, RUR.CURRENT_WORLD.rows);

    RUR.update_editors(RUR.CURRENT_WORLD);

    if (RUR.state.editing_world) {
        edit_robot_menu.toggle();
    }
    RUR.WORLD_BEFORE_ONLOAD = RUR.clone_world();
    process_onload();
    RUR.world_get.world_info();
};

function show_onload_feedback (e, lang) {
    var lang_info;
    if (lang == "python") {
        if (window.translate_python === undefined) {
            return;
        }
        lang_info = RUR.translate("Invalid Python code in Onload editor");
    } else {
        lang_info = RUR.translate("Invalid Javascript code in Onload editor");
    }
    RUR.show_feedback("#Reeborg-shouts", lang_info + "<br>" + e.message + "<br>" +
        RUR.translate("Problem with onload code.") + "<pre>" +
        RUR.CURRENT_WORLD.onload + "</pre>");
}

process_onload = function () {
    var src, ignore;

    RUR.reset_pre_run_defaults(); // TODO:rename this and perhaps move elsewhere?

    RUR.set_current_world(RUR.clone_world(RUR.WORLD_BEFORE_ONLOAD));
    if (RUR.CURRENT_WORLD.onload !== undefined && !RUR.state.editing_world) {
        /* editors content can be saved either as a string (old format)
           with embedded new lines characters or as an array of lines (new format)
        */
        if (typeof RUR.CURRENT_WORLD.onload == "string") {
            src = RUR.CURRENT_WORLD.onload;
        } else {
            src = RUR.CURRENT_WORLD.onload.join("\n");
        }
        RUR.state.evaluating_onload = true; // affects the way errors are treated
        if (src[0]=="#") {
            RUR.state.onload_programming_language = "python";
            try {
                onload_editor.setOption("mode", {name: "python", version: 3});
            } catch (e){}
            try {
               window.translate_python(src);
               if (RUR.__python_error) {
                    throw RUR.__python_error;
                }
            } catch (e) {
                show_onload_feedback(e, "python");
            }
        } else {
            RUR.state.onload_programming_language = "javascript";
            try {
                onload_editor.setOption("mode", "javascript");
            } catch (e){}
            try {
                ignore = eval(src);  // jshint ignore:line
            } catch (e) {
                show_onload_feedback(e, "javascript");
            }
        }

        RUR.state.evaluating_onload = false;
        // remove any frames created by onload
        RUR.frames = [];
        RUR.nb_frames = 0;
        RUR.current_frame_no = 0;
    }
    RUR.WORLD_AFTER_ONLOAD = RUR.clone_world();
    RUR.vis_world.draw_all();

};
RUR.world_utils.process_onload = process_onload;

function convert_old_worlds () {
    // TODO: convert goal.possible_positions to goal.possible_final_positions ?
    // TODO: convert start_positions to possible_initial_positions ?
    var i, index, coord, keys, obstacles;

    // Backward compatibility following change done on Jan 5, 2016
    // top_tiles has been renamed obstacles (and prior to that [or after?],
    // they were known as solid_objects); to ensure compatibility of
    // worlds created before, we change the old name
    // following http://stackoverflow.com/a/14592469/558799
    // thus ensuring that if a new world is created from an old one,
    // it will have the new syntax.
    if (RUR.CURRENT_WORLD.top_tiles !== undefined) {
        Object.defineProperty(RUR.CURRENT_WORLD, "obstacles",
            Object.getOwnPropertyDescriptor(RUR.CURRENT_WORLD, "top_tiles"));
        delete RUR.CURRENT_WORLD.top_tiles;
    } else if (RUR.CURRENT_WORLD.solid_objects !== undefined) {
        Object.defineProperty(RUR.CURRENT_WORLD, "obstacles",
            Object.getOwnPropertyDescriptor(RUR.CURRENT_WORLD, "solid_objects"));
        delete RUR.CURRENT_WORLD.solid_objects;
    }

    // Backward compatibility change done on December 29, 2016.
    // tiles were written as e.g. "water"; need to be written as ["water"]
    if (RUR.CURRENT_WORLD.tiles !== undefined) {
        keys = Object.keys(RUR.CURRENT_WORLD.tiles);
        for (i=0; i < keys.length; i++) {
            coord = keys[i];
            if (typeof RUR.CURRENT_WORLD.tiles[coord] == "string") {
                RUR.CURRENT_WORLD.tiles[coord] = [RUR.CURRENT_WORLD.tiles[coord]];
            } else {
                break;
            }
        }
    }

    // and obstacles were written in the form {fence:1} and need to be simply
    // ["fence"]
    if (RUR.CURRENT_WORLD.obstacles !== undefined) {
        keys = Object.keys(RUR.CURRENT_WORLD.obstacles);
        for (i=0; i < keys.length; i++) {
            coord = keys[i];
            if (Object.prototype.toString.call(RUR.CURRENT_WORLD.obstacles[coord]) == "[object Object]") {
                obstacles = Object.keys(RUR.CURRENT_WORLD.obstacles[coord]);
                // also convert from the old names to the new ones
                index = obstacles.indexOf("fence4");
                if (index !== -1) {
                    obstacles[index] = "fence_right";
                }
                index = obstacles.indexOf("fence5");
                if (index !== -1) {
                    obstacles[index] = "fence_left";
                }
                index = obstacles.indexOf("fence6");
                if (index !== -1) {
                    obstacles[index] = "fence_double";
                }
                index = obstacles.indexOf("fence7");
                if (index !== -1) {
                    obstacles[index] = "fence_vertical";
                }
                RUR.CURRENT_WORLD.obstacles[coord] = obstacles;
            } else {
                break;
            }
        }
    }


    // Backward compatibility change done on March 28, 2016, where
    // "pre_code" and "post_code" were simplified to "pre" and "post"
    // for consistency with other editor contents.
    if (RUR.CURRENT_WORLD.pre_code !== undefined) {
        RUR.CURRENT_WORLD.pre = RUR.CURRENT_WORLD.pre_code;
        delete RUR.CURRENT_WORLD.pre_code;
    }
    if (RUR.CURRENT_WORLD.post_code !== undefined) {
        RUR.CURRENT_WORLD.post = RUR.CURRENT_WORLD.post_code;
        delete RUR.CURRENT_WORLD.post_code;
    }

    if (RUR.CURRENT_WORLD.background_image !== undefined) {
        RUR.BACKGROUND_IMAGE.src = RUR.CURRENT_WORLD.background_image;
        RUR.BACKGROUND_IMAGE.onload = RUR.onload_new_image;
    } else {
        RUR.BACKGROUND_IMAGE.src = '';
    }

}

},{"./../drawing/visible_world.js":10,"./../editors/create.js":11,"./../programming_api/exceptions.js":28,"./../robot/robot.js":41,"./../rur.js":44,"./../translator.js":46,"./../ui/edit_robot_menu.js":49,"./../world_api/animated_images.js":73,"./create_empty_world.js":87}],89:[function(require,module,exports){
// Only create a new version of this file for a target language
// if the corresponding functions are
// defined in reeborg_xx.js and reeborg_xx.py

exports.cn = cn = {};

cn["at_goal"] = "到达目的地";
cn["front_is_clear"] = "前方通畅";
cn["right_is_clear"] = "右侧通畅";
cn["wall_in_front"] = "前方有墙";
cn["wall_on_right"] = "右侧有墙";
cn["object_here"] = "此处的物品";
cn["carries_object"] = "携带的物品";
cn["is_facing_north"] = "面向北方";

cn["move"] = "前进";
cn["turn_left"] = "左转";
cn["take"] = "拾起";
cn["put"] = "放下";
cn["toss"] = "抛出";
cn["build_wall"] = "砌墙";
cn["pause"] = "暂停";
cn["done"] = "完成";
cn["think"] = "思考";
cn["think(100)"] = "思考(100)";
cn["sound"] = "音效";
cn["sound(True)"] = "音效(是)";
cn["sound(true)"] = "音效(否)";
cn["World"] = "世界";
cn["UsedRobot"] = "机器人";
cn["new UsedRobot"] = "new 机器人";
cn["no_highlight"] = "禁止高亮";
cn["write"] = "write";

cn["from library import ?"] = "from library import ?";

},{}],90:[function(require,module,exports){
// Erstelle eine neue Version dieser Datei für eine Zielsprache
// nur, wenn die zutreffenden Funktionen
// in reeborg_xx.js und reeborg_xx.py definiert sind.

exports.de = de = {};

de["at_goal"] = "ist_am_ziel";
de["front_is_clear"] = "ist_vorne_frei";
de["right_is_clear"] = "ist_rechts_frei";
de["wall_in_front"] = "wand_voraus";
de["wall_on_right"] = "wand_rechts";
de["object_here"] = "ist_objekt_hier";
de["carries_object"] = "hat_objekt";
de["is_facing_north"] = "ist_norden";

de["move"] = "schritt";
de["turn_left"] = "linksdrehen";
de["take"] = "aufheben";
de["put"] = "hinlegen"; // Kontext?
de["toss"] = "werfen";
de["build_wall"] = "baue_wand";
de["pause"] = "pausieren";
de["done"] = "fertig";
de["think"] = "denke";
de["think(100)"] = "denke(100)";
de["sound"] = "ton";
de["sound(True)"] = "ton(True)";
de["sound(true)"] = "ton(true)";
de["World"] = "Welt";
de["UsedRobot"] = "BenutzterRoboter";
de["new UsedRobot"] = "new BenutzterRoboter";
de["no_highlight"] = "hervorheben_aus";
de["write"] = "schreiben";

de["from library import ?"] = "from bibliothek import ?";

},{}],91:[function(require,module,exports){
// Only create a new version of this file for a target language
// if the corresponding functions are
// defined in reeborg_xx.js and reeborg_xx.py

exports.en = en = {};

en["at_goal"] = "at_goal";
en["front_is_clear"] = "front_is_clear";
en["right_is_clear"] = "right_is_clear";
en["wall_in_front"] = "wall_in_front";
en["wall_on_right"] = "wall_on_right";
en["object_here"] = "object_here";
en["carries_object"] = "carries_object";
en["is_facing_north"] = "is_facing_north";

en["move"] = "move";
en["turn_left"] = "turn_left";
en["take"] = "take";
en["put"] = "put";
en["toss"] = "toss";
en["build_wall"] = "build_wall";
en["pause"] = "pause";
en["done"] = "done";
en["think"] = "think";
en["think(100)"] = "think(100)";
en["sound"] = "sound";
en["sound(True)"] = "sound(True)";
en["sound(true)"] = "sound(true)";
en["World"] = "World";
en["UsedRobot"] = "UsedRobot";
en["new UsedRobot"] = "new UsedRobot";
en["no_highlight"] = "no_highlight";
en["write"] = "write";

en["from library import ?"] = "from library import ?";

},{}],92:[function(require,module,exports){
// Only create a new version of this file for a target language
// if the corresponding functions are
// defined in reeborg_xx.js and reeborg_xx.py

exports.fr = fr = {};

fr["at_goal"] = "au_but";
fr["front_is_clear"] = "rien_devant";
fr["right_is_clear"] = "rien_a_droite";
fr["wall_in_front"] = "mur_devant";
fr["wall_on_right"] = "mur_a_droite";
fr["object_here"] = "objet_ici";
fr["carries_object"] = "transporte";
fr["is_facing_north"] = "est_face_au_nord";

fr["move"] = "avance";
fr["turn_left"] = "tourne_a_gauche";
fr["take"] = "prend";
fr["put"] = "depose";
fr["toss"] = "lance";
fr["build_wall"] = "construit_un_mur";
fr["pause"] = "pause";
fr["done"] = "termine";
fr["think"] = "pense";
fr["think(100)"] = "pense(100)";
fr["sound"] = "son";
fr["sound(True)"] = "son(True)";
fr["sound(true)"] = "son(true)";
fr["World"] = "Monde";
fr["UsedRobot"] = "RobotUsage";
fr["new UsedRobot"] = "new RobotUsage";
fr["no_highlight"] = "pas_de_surlignement";
fr["write"] = "ecrit";

fr["from library import ?"] = "from biblio import ?";

},{}],93:[function(require,module,exports){
// Only create a new version of this file for a target language
// if the corresponding functions are
// defined in reeborg_xx.js and reeborg_xx.py

exports.ko = ko = {};

ko["at_goal"] = "목적지에_도착함";
ko["front_is_clear"] = "앞이_비어_있음";
ko["right_is_clear"] = "오른쪽이_비어_있음";
ko["wall_in_front"] = "앞에_벽이_있음";
ko["wall_on_right"] = "오른쪽에_벽이_있음";
ko["object_here"] = "바닥에_물건이_있음";
ko["carries_object"] = "물건을_가지고_있음";
ko["is_facing_north"] = "북쪽을_향하고_있음";

ko["move"] = "전진";
ko["turn_left"] = "좌회전";
ko["take"] = "줍기";
ko["put"] = "놓기";
ko["toss"] = "던지기";
ko["build_wall"] = "벽_만들기";
ko["pause"] = "정지";
ko["done"] = "종료";
ko["think"] = "생각";
ko["think(100)"] = "생각(100)";
ko["sound"] = "소리";
ko["sound(True)"] = "소리(True)";
ko["sound(true)"] = "소리(true)";
//ko["sound(False)"] = "소리(False)";
ko["World"] = "월드";
ko["UsedRobot"] = "사용_로봇";
ko["new UsedRobot"] = "new 사용_로봇";
ko["no_highlight"] = "강조표시_끄기";
ko["write"] = "기록하기";

ko["from library import ?"] = "from 라이브러리 import ?";

// 전면_좌표
// 현재_좌표
// 바닥_색칠
// 바닥_색상
// 사용자지정_메뉴_만들기
// 경로_모양_설정
// 경로_색상_설정
// 최대_명령실행_수_설정
// 로봇_제거
// 기록
// 새_로봇_그림
// 모델_설정
},{}],94:[function(require,module,exports){
// Only create a new version of this file for a target language
// if the corresponding functions are
// defined in reeborg_xx.js and reeborg_xx.py

exports.lt = lt = {};

lt["at_goal"] = "prie_tikslo";
lt["front_is_clear"] = "priekyje_laisva";
lt["right_is_clear"] = "dešinėje_laisva";
lt["wall_in_front"] = "priekyje_siena";
lt["wall_on_right"] = "dešinėje_siena";
lt["object_here"] = "aptiktas_objektas";
lt["carries_object"] = "neša_objektą";
lt["is_facing_north"] = "pasisukęs_šiaurėn";

lt["move"] = "pirmyn";
lt["turn_left"] = "suktis_kairėn";
lt["take"] = "paimti";
lt["put"] = "padėti";
lt["toss"] = "mesti";
lt["build_wall"] = "statyti_sieną";
lt["pause"] = "pauzė";
lt["done"] = "baigti";
lt["think"] = "galvoti";
lt["think(100)"] = "galvoti(100)";
lt["sound"] = "garsas";
lt["sound(True)"] = "garsas(True)";
lt["sound(true)"] = "garsas(true)";
lt["World"] = "Pasaulis";
lt["UsedRobot"] = "NaudojamasRobotas";
lt["new UsedRobot"] = "new NaudojamasRobotas";
lt["no_highlight"] = "be_paryškinimo";
lt["write"] = "rašyti";

lt["from library import ?"] = "from biblioteka import ?";

},{}],95:[function(require,module,exports){
var _recorded_ids = [];
var _text_elements = [];
var _elements_names = [];
var _elements_titles = [];
var _function_names = [];
var _value_names = [];

__record_id = function(id){
    if (_recorded_ids.indexOf(id) !== -1) {
        alert("Fatal error: " + id + " already exists.");
    } else {
        _recorded_ids.push(id);
    }
};

record_id = function (id, text) {
    __record_id(id);
    if (text !== undefined) {
        _text_elements.push([id, text]);
    }
};

record_value = function (id, text) {
    __record_id(id);
    _value_names.push([id, text]);
};
record_fn = function (id, text) {
    __record_id(id);
    _function_names.push([id, text]);
};
record_name = function (id, text) {
    __record_id(id);
    _elements_names.push([id, text]);
};
record_title = function (id, text) {
    __record_id(id);
    _elements_titles.push([id, text]);
};


update_ui = function (lang) {
    "use strict";
    var i, id, msg;
    window.document.documentElement.lang = lang;

    for(i=0; i<_function_names.length; i++) {
        id = "#" + _function_names[i][0];
        msg = _function_names[i][1];
        $(id).html(RUR.translate(msg) + "()");
    }
    for(i=0; i<_text_elements.length; i++) {
        id = "#" + _text_elements[i][0];
        msg = _text_elements[i][1];
        $(id).html(RUR.translate(msg));
    }
    for(i=0; i<_elements_names.length; i++) {
        id = "#" + _elements_names[i][0];
        msg = _elements_names[i][1];
        $(id).attr("name", RUR.translate(msg));
    }
    for(i=0; i<_value_names.length; i++) {
        id = "#" + _value_names[i][0];
        msg = _value_names[i][1];
        $(id).attr("value", RUR.translate(msg));
    }
    update_titles();
};

update_titles = function () {
    "use strict";
    var i, id, msg;
    for(i=0; i<_elements_titles.length; i++) {
        id = "#" + _elements_titles[i][0];
        msg = _elements_titles[i][1];
        $(id).text(RUR.translate(msg));
    }
};

exports.update_ui = update_ui;
exports.record_id = record_id;
exports.update_titles = update_titles;
exports.record_title = record_title;
exports.record_fn = record_fn;
exports.record_value = record_value;

record_id("site-name", "SITE NAME");
record_id("world-info-button", "WORLD INFO");
record_id("editor-visible-label", "EDITOR VISIBLE");
record_id("special-keyboard-button", "KEYBOARD BUTTON");
record_id("more-menus-button", "ADDITIONAL OPTIONS");
record_title("ui-dialog-title-more-menus", "ADDITIONAL OPTIONS");

record_id("thinking", "THINKING")

record_id("blockly-wrapper");
record_id("move-handle");
record_id("blocklyDiv");
record_name("blockly-basic-commands", "BASIC COMMANDS");
record_name("blockly-defining", "DEFINING");
record_name("blockly-loops", "LOOPS");
record_name("blockly-decisions", "DECISIONS");
record_name("blockly-conditions", "CONDITIONS");
record_name("blockly-using-variables", "USING VARIABLES");
record_name("blockly-commands-var", "COMMANDS");
record_name("blockly-conditions-var", "CONDITIONS");
record_name("blockly-other", "OTHER");
record_name("blockly-objects", "OBJECTS");

record_id("highlight-impossible", "HIGHLIGHT IMPOSSIBLE");
record_id("command-result", "COMMAND RESULT");
record_id("delete-world-text", "DELETE WORLD TEXT");
record_id("python-only", "PYTHON ONLY");
record_id("togetherjs", "COLLABORATION");
record_id("togetherjs-text", "TOGETHERJS EXPLAIN");
record_id("world-title", "WORLD CREATION TITLE");
record_id("program-in-editor", "PROGRAM IN EDITOR");
record_id("progress-section", "PROGRESS SECTION TITLE");
record_id("progress-explain", "PROGRESS EXPLAIN");
record_id("retrieve-solution-explain", "RETRIEVE SOLUTION EXPLAIN");
record_id("program-in-blockly-workspace", "PROGRAM IN BLOCKLY WORKSPACE");
record_id("contact", "CONTACT");
record_id("issues", "ISSUES");
record_id("help", "HELP");
record_id("forum", "FORUM");
record_id("documentation", "DOCUMENTATION");
record_id("python-help", "PYTHON HELP");
record_id("keyboard-help", "KEYBOARD HELP");

record_title("ui-dialog-title-edit-world-panel", "WORLD EDITOR");
record_id("east", "m-east");
record_id("north", "m-north");
record_id("west", "m-west");
record_id("south", "m-south");
record_id("random", "m-random");
record_id("m-dimensions", "m-dimensions");
record_id("m-add-robot", "m-add-robot");
record_id("m-robot", "m-robot");
record_id("m-position", "m-position");
record_id("m-turn", "m-turn");
record_id("m-objects", "m-objects");
record_id("m-add", "m-add");
record_id("m-walls", "m-walls");
record_id("m-objects2", "m-objects2");
record_id("m-tiles", "m-tiles");
record_id("m-fill", "m-fill");
record_id("m-solid", "m-solid");
record_id("m-decorative", "m-decorative");
record_id("m-background", "m-background");
record_id("m-goal", "m-goal");
record_id("mg-robot", "mg-robot");
record_id("mg-walls", "mg-walls");
record_id("mg-objects", "mg-objects");

record_title("ui-dialog-title-Reeborg-concludes", "Reeborg says: I'm done!");
record_title("ui-dialog-title-Reeborg-writes", "Reeborg writes:");
record_title("ui-dialog-title-Reeborg-shouts", "Reeborg shouts: Something is wrong!");
record_title("ui-dialog-title-Reeborg-explores", "Reeborg explores some Javascript code");
record_title("ui-dialog-title-Reeborg-proclaims", "Reeborg states:");
record_title("ui-dialog-title-Reeborg-watches", "Reeborg watches some variables!");
record_title("ui-dialog-title-World-info", "Click on the world to get some additional information.");

record_id("kbd-repeat-not-keyword", "<code>repeat</code> is not a true Python keyword.");

},{}],96:[function(require,module,exports){
// Only create a new version of this file for a target language
// if the corresponding functions are
// defined in reeborg_xx.js and reeborg_xx.py

exports.pl = pl = {};

pl["at_goal"] = "u_celu";
pl["front_is_clear"] = "droga_wolna";
pl["right_is_clear"] = "prawo_wolne";
pl["wall_in_front"] = "mur_z_przodu";
pl["wall_on_right"] = "mur_po_prawej";
pl["object_here"] = "wykryto_obiekt";
pl["carries_object"] = "obiekt_niesiony";
pl["is_facing_north"] = "skierowany_na_polnoc";

pl["move"] = "ruch";
pl["turn_left"] = "obrot_w_lewo";
pl["take"] = "wez";
pl["put"] = "odloz";
pl["build_wall"] = "wybuduj_mur";
pl["pause"] = "pauza";
pl["done"] = "skonczone";
pl["think"] = "mysl";
pl["think(100)"] = "mysl(100)";
pl["sound"] = "dzwiek";
pl["sound(True)"] = "dzwiek(Prawda)";
pl["sound(true)"] = "dzwiek(prawda)";
pl["World"] = "swiat";
pl["UsedRobot"] = "RobotWUzyciu";
pl["new UsedRobot"] = "new RobotWUzyciu";
pl["no_highlight"] = "bez_podswietlenia";
pl["write"] = "napisz";

pl["from library import ?"] = "zaimportuj z Biblioteki ?";

},{}],97:[function(require,module,exports){
// Only create a new version of this file for a target language
// if the corresponding functions are
// defined in reeborg_xx.js and reeborg_xx.py

exports.pt = pt = {};

pt["at_goal"] = "chegou";
pt["front_is_clear"] = "frente_esta_livre";
pt["right_is_clear"] = "direita_esta_livre";
pt["wall_in_front"] = "parede_a_frente";
pt["wall_on_right"] = "parede_a_direita";
pt["object_here"] = "objeto_aqui";
pt["carries_object"] = "carrega_objeto";
pt["is_facing_north"] = "virado_norte";
pt["move"] = "mover";
pt["turn_left"] = "virar_esquerda";
pt["take"] = "pegar";
pt["put"] = "colocar"; 
pt["toss"] = "gerar";
pt["build_wall"] = "construir_parede";
pt["pause"] = "pausar";
pt["done"] = "pronto";
pt["think"] = "pensar";
pt["think(100)"] = "pensar(100)";
pt["sound"] = "som";
pt["sound(True)"] = "som(True)";
pt["World"] = "Mundo";
pt["UsedRobot"] = "robousado";
pt["new UsedRobot"] = "novo_robousado";
pt["no_highlight"] = "sem_destaque";
pt["write"] = "salvar";
pt["from library import ?"] = "importar da biblioteca ?";
},{}],98:[function(require,module,exports){
// the following is used in a few places below
var mac_user_save_files_cn = ' <b>Mac 用户：</b> 请参考<a href="https://github.com/aroberge/reeborg/blob/master/dev_tools/known_problems.md" target="_blank" rel="noopener">已知的问题</a>。';

exports.ui_cn = ui_cn = {};
exports.cn_to_en = cn_to_en = {};

ui_cn["cn-en"] = "混合模式：中文界面，英文编程。<br>" +
    "Mixed mode: User Interface in Chinese; programming language in English.<br>";

ui_cn["SITE NAME"] = "乐跑的世界";
ui_cn["WORLD INFO"] = "世界信息";
ui_cn["EDITOR VISIBLE"] = "保持编辑器可见";

ui_cn["apple"] = "苹果";
cn_to_en["苹果"] = "apple";
ui_cn["banana"] = "香蕉";
cn_to_en["香蕉"] = "banana";
ui_cn["beeper"] = "喇叭";
cn_to_en["喇叭"] = "beeper";
ui_cn["box"] = "箱子";
cn_to_en["箱子"] = "box";
ui_cn["bridge"] = "桥";
cn_to_en["桥"] = "bridge";
ui_cn["carrot"] = "胡萝卜";
cn_to_en["胡萝卜"] = "carrot";
ui_cn["daisy"] = "菊花";
cn_to_en["菊花"] = "daisy";
ui_cn["dandelion"] = "蒲公英";
cn_to_en["蒲公英"] = "dandelion";
ui_cn["leaf"] = "树叶";
cn_to_en["树叶"] = "leaf";
ui_cn.square = "方块";
cn_to_en["方块"] = "square";
ui_cn.star = "星星";
cn_to_en["星星"] = "star";
ui_cn["strawberry"] = "草莓";
cn_to_en["草莓"] = "strawberry";
ui_cn.token = "笑脸";
cn_to_en["笑脸"] = "token";
ui_cn["tokens are Reeborg's favourite thing."] = "笑脸是乐跑最喜欢的物品。";
ui_cn.triangle = "三角形";
cn_to_en["三角形"] = "triangle";
ui_cn["tulip"] = "郁金香";
cn_to_en["郁金香"] = "tulip";
ui_cn["bucket"] = "桶";
cn_to_en["桶"] = "bucket";
ui_cn["bulb"] = "球茎";
cn_to_en["球茎"] = "bulb";
ui_cn["bricks"] = "砖";
cn_to_en["砖"] = "bricks";

ui_cn["mud"] = "泥";
cn_to_en["泥"] = "mud";
ui_cn["soil"] = "土壤";
cn_to_en["土壤"] = "soil";
ui_cn["water"] = "水";
cn_to_en["水"] = "water";
ui_cn["grass"] = "草";
cn_to_en["草"] = "grass";
ui_cn["gravel"] = "砾石";
cn_to_en["砾石"] = "gravel";
ui_cn["ice"] = "冰";
cn_to_en["冰"] = "ice";
ui_cn["fire"] = "火";
cn_to_en["火"] = "fire";

ui_cn["infinite"] = "无穷";

ui_cn["fence_right"] = "右侧篱笆";
cn_to_en["右侧篱笆"] = "fence_right";
ui_cn["fence_left"] = "左侧篱笆";
cn_to_en["左侧篱笆"] = "fence_left";
ui_cn["fence_vertical"] = "垂直篱笆";
cn_to_en["垂直篱笆"] = "fence_vertical";
ui_cn["fence_double"] = "双侧篱笆";
cn_to_en["双侧篱笆"] = "fence_double";

ui_cn["Invalid Javascript code in Onload editor"] = "Onload 编辑器里有无效的 JavaScript 代码。";
ui_cn["Invalid Python code in Onload editor"] = "Onload 编辑器里有无效的 Python 代码。";

ui_cn["Too many steps:"] = "太多步骤了：{max_steps}<br>使用 <code>set_max_nb_steps(nb)</code> 来提高上线。";
ui_cn["<li class='success'>Reeborg is at the correct x position.</li>"] = "<li class='success'>乐跑的 x 坐标正确。</li>";
ui_cn["<li class='failure'>Reeborg is at the wrong x position.</li>"] = "<li class='failure'>乐跑的 x 坐标不正确。</li>";
ui_cn["<li class='success'>Reeborg is at the correct y position.</li>"] = "<li class='success'>乐跑的 y 坐标正确。</li>";
ui_cn["<li class='failure'>Reeborg is at the wrong y position.</li>"] = "<li class='failure'>乐跑的 y 坐标不正确。</li>";
ui_cn["<li class='success'>All objects are at the correct location.</li>"] = "<li class='success'>所有的物品都在正确的位置。</li>";
ui_cn["<li class='failure'>One or more objects are not at the correct location.</li>"] = "<li class='failure'>一个或多个物品不在正确的位置。</li>";
ui_cn["<li class='success'>All walls have been built correctly.</li>"] = "<li class='success'>所有的墙都砌在了正确的位置。</li>";
ui_cn["<li class='failure'>One or more walls missing or built at wrong location.</li>"] = "<li class='failure'>一个或多个墙缺失或不在正确的位置。</li>";
ui_cn["Last instruction completed!"] = "已完成最后一条指令！";
ui_cn["<p class='center'>Instruction <code>done()</code> executed.</p>"] = "<p class='center'><code>完成()</code> 指令执行完毕。</p>";

ui_cn["Unknown object"] = "未知物品：<code>{obj}</code>";
ui_cn["No object found here"] = "这里没有物品：<code>{obj}</code>";
ui_cn["object"] = "物品";
ui_cn["I don't have any object to put down!"] = "我没有<code>{obj}</code>可以放下！";
ui_cn["There is already a wall here!"] = "这里已经有墙了！";
ui_cn["There is no wall to remove!"] = "这里没有墙可以移除！";
ui_cn["Ouch! I hit a wall!"] = "啊呀！我撞到墙了！";
ui_cn["Done!"] = "完成！";
ui_cn["There is no position as a goal in this world!"] = "这个世界里没有目的地坐标！";
ui_cn["There is no goal in this world!"] = "这个世界里没有目标！";
ui_cn["I carry too many different objects. I don't know which one to put down!"] = "我带了很多不同的物品，不知道要放下哪个！";
ui_cn["Many objects are here; I do not know which one to take!"] = "这里有很多不同的物品，我不知道要拾起哪个！";

ui_cn.east = "东";
ui_cn.north = "北";
ui_cn.west = "西";
ui_cn.south = "南";
cn_to_en["东"] = "east";
cn_to_en["北"] = "north";
cn_to_en["西"] = "west";
cn_to_en["南"] = "south";
ui_cn["Unknown orientation for robot."] = "未知的机器人朝向";

ui_cn["Invalid position."] = "{pos}是无效的坐标。";
ui_cn["Invalid orientation."] = "'{orient}'是未知的朝向。";

ui_cn["World selected"] = "选择了世界：{world}";
ui_cn["Could not find world"] = "找不到世界：{world}";
ui_cn["Object names"] = " 库、笑脸、星星、三角形、方块等等。";

ui_cn["Invalid world file."] = "无效的世界文件。";
ui_cn["PERMALINK"] = "固定链接";
ui_cn["Could not find link: "] = "找不到链接：";

ui_cn["Click on world to move robot."] = "点击世界里的格子以添加或移除乐跑可能的初始位置。";
ui_cn["Added robot."] = "添加了乐跑。";
ui_cn["Click on image to turn robot"] = "点击图片以旋转乐跑。";
ui_cn["Robot now has tokens."] = "乐跑现在有{x_tokens}个笑脸。";
ui_cn["Click on world to add object."] = "点击世界里的格子以设置<code>{obj}</code>的数量。";
ui_cn["Click on desired object below."] = "在下面点击所需的物品。";
ui_cn["Click on world to toggle walls."] = "点击世界里的格子以添加或移除墙。";
ui_cn["Click on world to set home position for robot."] = "点击世界里的格子以添加或移除乐跑可能的目的地位置。";
ui_cn["Click on world to toggle additional walls to build."] = "点击世界里的格子以添加或移除需要砌墙的位置。";
ui_cn["Click on desired goal object below."] = "在下面点击所需的目标物品。";
ui_cn["Click on world to set number of goal objects."] = "点击世界里的格子以设置目标<code>{obj}</code>的数量。";
ui_cn["Enter number of tokens for robot to carry (use inf for infinite number)"] = "输入乐跑所携带的笑脸数量。";
ui_cn[" is not a valid value!"] = " 不是一个有效的数字！";
ui_cn["Enter number of objects desired at that location."] = "点击世界里的格子以设置<code>{obj}</code>的数量。";
ui_cn["Objects found here:"] = "这里的物品有：";
ui_cn["Description"] = "说明";
ui_cn["A robot located here carries no objects."] = "座标 (x, y) = ({x}, {y}) 的机器人没有携带物品。";
ui_cn["Goal to achieve:"] = "需要达成的目标：";
ui_cn["A robot located here carries:"] = "座标 (x, y) = ({x}, {y}) 的机器人携带有：";
ui_cn["random location"] = "随机位置";
ui_cn["Enter number of objects to give to robot."] = "输入给机器人的<code>{obj}</code>的数量。";
ui_cn["Special information about this location:"] = "这个位置的特别信息：";
ui_cn["Click on world to toggle tile."] = "点击世界里的格子以添加或移除<code>{obj}</code>贴图。";
ui_cn["Click on desired tile below."] = "在下面点击所需的贴图。";
ui_cn["A wall must be built east of this location."] = "在此位置，墙只能砌在东边。";
ui_cn["A wall must be built north of this location."] = "在此位置，墙只能砌在北边。";
ui_cn["A wall must be built west of this location."] = "在此位置，墙只能砌在西边。";
ui_cn["A wall must be built south of this location."] = "在此位置，墙只能砌在南边。";
ui_cn["The final required position of the robot will be chosen at random."] = "机器人的目的地将会被随机选择。";
ui_cn["The final position of the robot must be (x, y) = "] = "机器人最后必须停留在坐标 (x, y) = ";
ui_cn["Click on world to fill with given tile."] = "点击世界里的格子以填充指定的贴图。";
ui_cn["Enter url of image to use as background."] = "请输入背景图片的链接。";
ui_cn["Replace editor content"] = "你想把编辑器里的代码替换为这个世界的作者所提供的代码吗？";
ui_cn["Replace library content"] = "你想把库里的代码替换为这个世界的作者所提供的代码吗？";
ui_cn["colour"] = "颜色";

ui_cn["Name already exist; confirm that you want to replace its content."] = "该名称已经存在，请确认你想替换其中的内容。";
ui_cn["No such world!"] = "该世界不存在！";
ui_cn["Enter world name to save"] = "请输入世界的名称以保存。使用名称：";
ui_cn["Enter world name to delete"] = "请输入要删除的世界的名称。删除世界";
ui_cn["Delete "] = "删除";

ui_cn["Error found at or near line {number}."] = "在第{number}行或附近发现错误。";
ui_cn["<br>Perhaps a missing colon is the cause."] = "<br>可能是由于缺少冒号（“:”）造成的。";
ui_cn["<br>Perhaps you forgot to add parentheses ()."] = "<br>你可能忘记了加括号（“()”）。";
ui_cn["<br>Perhaps you misspelled a word or forgot to define a function or a variable."] = "<br>你可能写错了世界的名字、忘记了定义一个函数或变量。";
ui_cn["I cannot help you with this problem."] = "关于这个错误，我帮不了你。";

ui_cn["I'm stuck in mud."] = "我陷在泥里了。";
ui_cn["Mud: Reeborg <b>cannot</b> detect this and will get stuck if it moves to this location."] = "泥：乐跑<b>无法</b>发现，来到此位置将被困住。";
ui_cn["Soil: usually safe, but looks identical to mud."] = "土壤：一般是安全的，但看起来和泥一样。";
ui_cn["I'm slipping on ice!"] = "我在冰上打滑了！";
ui_cn["Ice: Reeborg <b>cannot</b> detect this and <em>might</em> slide and move to the next location if it moves to this location."] = "冰：乐跑<b>无法</b>发现，来到此位置将<em>可能</em>会滑到下一格。";
ui_cn["Grass: usually safe."] = "草：一般是安全的。";
ui_cn["Gravel: usually safe."] = "砾石：一般是安全的。";
ui_cn["I'm in water!"] = "我掉水里了！";
ui_cn["Water: Reeborg <b>can</b> detect this but will get damaged if it moves to this location."] = "水：乐跑<b>可以</b>发现，来到此位置将会损坏。";
ui_cn["green home tile: Reeborg <b>can</b> detect this tile using at_goal()."] = "绿色基地贴图：乐跑<b>可以</b>用 at_goal() 发现。";
ui_cn["Crash!"] = "哎呦！";
ui_cn["brick wall: Reeborg <b>can</b> detect this but will hurt himself if he attemps to move through it."] = "砖墙：乐跑<b>可以</b>发现，试图穿越此位置将会受伤。";
ui_cn["I hit a fence!"] = "我撞到篱笆了！";
ui_cn["Fence: Reeborg <b>can</b> detect this but will be stopped by it."] = "篱笆：乐跑<b>可以</b>发现，但无法穿越。";
ui_cn["Bridge:Reeborg <b>can</b> detect this and will know that it allows safe passage over water."] = "桥：乐跑<b>可以</b>发现，并且知道可以用来安全的渡水。";
ui_cn["My joints are melting!"] = "我的关节正在融化！";
ui_cn["A bucket full of water"] = "一桶满满的水。";
ui_cn["Tulip bulb: might grow into a nice tulip with some water from a bucket."] = "郁金香球茎：浇点桶里的水或许能长成郁金香。";


ui_cn["Something is blocking the way!"] = "有东西挡住了路！";
ui_cn["Reeborg <b>can</b> detect this tile using at_goal()."] = "乐跑<b>可以</b>用 at_goal() 发现此贴图。";
ui_cn["green home tile:"] = "绿色基地贴图：";
ui_cn["home:"] = "家：";
ui_cn["racing flag:"] = "赛车旗帜：";
ui_cn["house:"] = "房子：";

ui_cn["Local variables"] = "本地变量";
ui_cn["Global variables"] = "全局变量";
ui_cn["Watched expressions"] = "查看中的表达式";

ui_cn["move forward"] = "前进";
ui_cn["turn left"] = "左转";
ui_cn["take object"] = "拾起物品";
ui_cn["put object"] = "放下物品";
ui_cn["Pause the program's execution."] = "暂停执行程序。";
ui_cn["Build a wall in front of the robot."] = "在机器人前方砌墙。";
ui_cn["End the program's execution."] = "停止执行程序。";
ui_cn["True if a wall is blocking the way."] = "当有墙挡住路时，返回“是”";
ui_cn["True if nothing is blocking the way."] = "当没有东西挡住路时，返回“是”";
ui_cn["True if desired destination."] = "当到达目的地时，返回“是”";
ui_cn["True if robot carries at least one object."] = "当机器人携带有物品时，返回“是”";
ui_cn["True if there is at least one object here."] = "当此处有物品时，返回“是”";
ui_cn["True if robot is facing North."] = "当机器人朝向北方时，返回“是”";
ui_cn["Delay between actions; default is 300 ms."] = "操作间的延迟，默认为300毫秒。";

ui_cn["Save world in browser"] = "在浏览器中保存";
ui_cn["LOAD BLOCKLY"] = "导入到工作区";
ui_cn["LOAD BLOCKLY EXPLAIN"] = "打开文件并用其内容替换 Blockly 工作区当前的内容。";
ui_cn["LOAD EDITOR"] = "导入到编辑器";
ui_cn["LOAD EDITOR EXPLAIN"] = "打开文件并用其内容替换代码编辑器当前的内容。";
ui_cn["LOAD LIBRARY"] = "导入到库";
ui_cn["LOAD LIBRARY EXPLAIN"] = "打开文件并用其内容替换库里当前的内容。";
ui_cn["LOAD WORLD"] = "加载世界";
ui_cn["LOAD WORLD EXPLAIN"] = "打开文件并导入世界内容。";
ui_cn["SAVE BLOCKLY"] = "保存工作区";
ui_cn["SAVE BLOCKLY EXPLAIN"] = "把工作区的内容（blocks）保存到文件。" + mac_user_save_files_cn;
ui_cn["SAVE EDITOR"] = "保存程序";
ui_cn["SAVE EDITOR EXPLAIN"] = "把程序保存到文件。" + mac_user_save_files_cn;
ui_cn["SAVE LIBRARY"] = "保存库";
ui_cn["SAVE LIBRARY EXPLAIN"] = "把库保存到文件。" + mac_user_save_files_cn;
ui_cn["SAVE WORLD"] = "保存世界";
ui_cn["SAVE WORLD EXPLAIN"] = "把世界内容（以 JSON 对象的格式）保存到文件。" + mac_user_save_files_cn;


ui_cn["PROGRESS SECTION TITLE"] = "持续跟踪已解决的任务";
ui_cn["PROGRESS EXPLAIN"] = "已解决的任务在世界菜单里有" + RUR.CHECKMARK +
    "标识，该信息保存在浏览器里。当切换到不同的浏览器，该信息不会被同步。" +
    "如果你点击下面的保存按钮，当前浏览器里的任务进度信息将被保存为名为“progress.json”的文件。" +
    "你可以在别的浏览器里导入该文件以同步任务进度。";
ui_cn["SAVE PROGRESS"] = "保存";
ui_cn["IMPORT PROGRESS"] = "导入";
ui_cn["RETRIEVE SOLUTION"] = "检索解决方案";
ui_cn["RETRIEVE SOLUTION EXPLAIN"] = "如果这个世界的解决方案（blocks、代码和库里的代码）在当前的编程模式下有保存过，则该解决方案将被检索并替换当前的内容。";

ui_cn["ADD CONTENT TO WORLD"] = "从下面选择物品并添加到世界里。";
ui_cn["ADD BLOCKLY TEXT"] = "代码块";
ui_cn["ADD EDITOR TEXT"] = "编辑器里的代码";
ui_cn["ADD LIBRARY TEXT"] = "库里的代码";
ui_cn["ADD PRE TEXT"] = "Pre";
ui_cn["ADD POST TEXT"] = "Post";
ui_cn["ADD DESCRIPTION TEXT"] = "说明";
ui_cn["ADD ONLOAD TEXT"] = "Onload";

ui_cn["KEYBOARD BUTTON"] = "乐跑键盘";
ui_cn["ADDITIONAL OPTIONS"] = "其它选项";

ui_cn["BASIC COMMANDS"] = "基本指令";
ui_cn["DEFINING"] = "定义";
ui_cn["LOOPS"] = "循环";
ui_cn["DECISIONS"] = "判断";
ui_cn["CONDITIONS"] = "条件";
ui_cn["USING VARIABLES"] = "使用变量";
ui_cn["COMMANDS"] = "注释";
ui_cn["OTHER"] = "其它";
ui_cn["OBJECTS"] = "物品";

ui_cn["Python Code"] = "Python 代码";
ui_cn["Javascript Code"] = "JavaScript 代码";
ui_cn["LIBRARY"] = "库";
ui_cn["EXTRA"] = "更多";
ui_cn["PRE"] = "Pre";
ui_cn["POST"] = "Post";
ui_cn["DESCRIPTION"] = "说明";
ui_cn["ONLOAD"] = "Onload";

ui_cn["HIGHLIGHT IMPOSSIBLE"] = "代码中的问题导致我关闭了代码高亮。";
ui_cn["COMMAND RESULT"] = "从下面的菜单中选择一个操作执行。";

ui_cn["DELETE WORLD TEXT"] = "以下是当前存储在你的浏览器里并且可以删除的世界：";
ui_cn["PYTHON ONLY"] = "Python";
ui_cn["COLLABORATION"] = "合作";
ui_cn["TOGETHERJS EXPLAIN"] = "允许和另外一个或多个协作者使用 Mozilla 的 TogetherJS 进行合作的工具。不适用于 Blockly。";
ui_cn["WORLD CREATION TITLE"] = "世界：创建、编辑、……";
ui_cn["EDIT WORLD"] = "编辑世界";
ui_cn["EDIT WORLD EXPLAIN"] = "你可以通过编辑当前的世界来创建一个你自己的世界。";
ui_cn["PROGRAM IN EDITOR"] = "编辑器里的程序";
ui_cn["PROGRAM IN BLOCKLY WORKSPACE"] = "Blockly 工作区里的程序";
ui_cn["CONTACT"] = "电邮（英语或法语）：";
ui_cn["ISSUES"] = "提交错误报告、建议、其它问题等等（英语或法语）。";
ui_cn["FORUM"] = "论坛（英语或法语）";
ui_cn["HELP"] = "帮助";
ui_cn["DOCUMENTATION"] = '<a href="http://reeborg.ca/docs/en" target="_blank" rel="noopener">文档</a>';
ui_cn["PYTHON HELP"] = "使用 Python，如果执行<code>help()</code>可以得到一个指令列表；如果执行比如<code>help(move)</code>可以得到<code>move()</code>函数的说明。";
ui_cn["KEYBOARD HELP"] = "点击乐跑键盘可以看到可用的函数、Python 关键字等的列表。";

ui_cn["WORLD EDITOR"] = "世界编辑器";
ui_cn["m-east"] = "东";
ui_cn["m-north"] = "北";
ui_cn["m-west"] = "西";
ui_cn["m-south"] = "南";
ui_cn["m-random"] = "随机";
ui_cn["m-dimensions"] = "世界的尺寸";
ui_cn["m-add"] = "添加";
ui_cn["m-add-robot"] = "添加机器人";
ui_cn["m-robot"] = "机器人";
ui_cn["m-position"] = "坐标";
ui_cn["m-turn"] = "方向";
ui_cn["m-objects"] = "物品";
ui_cn["m-walls"] = "墙";
ui_cn["m-objects2"] = "物品";
ui_cn["m-tiles"] = "标题";
ui_cn["m-fill"] = "填充";
ui_cn["m-solid"] = "障碍物";
ui_cn["m-decorative"] = "装饰物";
ui_cn["m-background"] = "背景图片";
ui_cn["m-goal"] = "目标";
ui_cn["mg-robot"] = "机器人";
ui_cn["mg-walls"] = "墙";
ui_cn["mg-objects"] = "物体";

ui_cn["Reeborg says: I'm done!"] = "乐跑说：我完成了！";
ui_cn["Reeborg writes:"] = "乐跑写：";
ui_cn["Reeborg shouts: Something is wrong!"] = "乐跑喊：有什么地方出错了！";
ui_cn["Reeborg explores some Javascript code"] = "乐跑探索了一些 JavaScript 代码";
ui_cn["Reeborg states:"] = "乐跑宣布：";
ui_cn["Reeborg watches some variables!"] = "乐跑查看了一些变量！";
ui_cn["Click on the world to get some additional information."] = "点击世界以得到更多的信息。";

ui_cn["Reeborg's basic keyboard"] = "乐跑的基本键盘";
ui_cn["kbd-command-btn"] = "指令";
ui_cn["kbd-condition-btn"] = "条件";
ui_cn["kbd-python-btn"] = "Python";
ui_cn["kbd-py-console-btn"] = "Python";
ui_cn["kbd-javascript-btn"] = "JavaScript";
ui_cn["kbd-objects-btn"] = "物品";
ui_cn["kbd-special-btn"] = "特殊";

ui_cn["UNDO"] = "撤销";
ui_cn["REDO"] = "重做";
ui_cn["tab"] = "TAB";
ui_cn["shift-tab"] = "Shift-TAB";
ui_cn["enter"] = "\u23CE";
ui_cn["<code>repeat</code> is not a true Python keyword."] = "<code>repeat</code>不是一个真正的 Python 关键字。";

ui_cn["Colour:"] = "颜色：";
ui_cn["Enter a colour"] = "输入一个颜色";

ui_cn["Background image"] = "背景图片";

ui_cn["NAME:"] = "名称：";


ui_cn["Set the world's dimensions"] = "设置世界的尺寸";
ui_cn["set-dimensions-explain"] = "如果需要，你可以更改默认的尺寸。请记得低解析度的显示器不能显示非常大的世界。";
ui_cn["Maximum x value:"] = "x 坐标的最大值";
ui_cn["Maximum y value:"] = "y 坐标的最大值";
ui_cn["Use small tiles"] = "使用小贴图";

ui_cn["Set goal number for object"] = "设置物品的目标数量";
ui_cn["dialog-goal-object-explain"] = "如果想使用该物品在世界中的总数，则勾选复选框。";
ui_cn["Number of objects"] = "物品数量";
ui_cn["All such objects"] = "使用物品总数";

ui_cn["Number of objects:"] = "物品数量：";
ui_cn["Maximum:"] = "最大值：";
ui_cn["Add object in the world"] = "设置物品数量";
ui_cn["ADD OBJECT EXPLAIN"] = "设置0可以移除该物品。如果<code>最大值</code>大于<code>物品数量</code>，那么物品数量会是一个在两个数值之间的随机数，该随机数在每次运行程序时被生成。";

ui_cn["Unlimited:"] = "无限";
ui_cn["Give object to robot"] = "把物品给机器人";
ui_cn["GIVE OBJECT EXPLAIN"] = "设置机器人所携带的物品数量。如果想设置数量为无线，则勾选复选框。";

ui_cn["UPDATE BLOCKLY CONTENT"] = "这个世界里有一些默认的工作区内容。想要替换掉当前的内容，请点击按钮。";
ui_cn["UPDATE BLOCKLY BUTTON"] = "替换当前内容";
ui_cn["Contents from World"] = "世界里的内容";

ui_cn["WARNING: Do not change this comment."] = "警告：不要更改这条注释。";
ui_cn["Library Code is below."] = "以下是库里的代码。";
ui_cn["No solution can be saved when using REPL (Py)."] = "使用 REPL（Py）模式时不能保存。";
ui_cn["No solution can be loaded when using REPL (Py)."] = "使用 REPL（Py）模式时不能加载。";

ui_cn["You are not allowed to use <code>done</code> in this world!"] = "在这个世界里，不允许使用<code>done()</code>！";
ui_cn["Execution ended before the <em>Post</em> code was executed."] = "在<em>Post</em>代码之前，执行已经结束。";

ui_cn["Difficulty level"] = "难度等级";

ui_cn["Expected result"] = "期望结果";
ui_cn["Differences highlighted"] = "不同点已高亮显示";
ui_cn["Actual result"] = "实际结果";

ui_cn["Cannot parse progress file."] = "无法分析进度文件。";
ui_cn["Cannot merge progress."] = "无法合并进度。";
ui_cn["No solution found for this world."] = "找不到这个世界的解决方案。";

ui_cn["THINKING"] = "思考中……";

},{}],99:[function(require,module,exports){
// the following is used in a few places below
var mac_user_save_files_en = ' <b>Mac Nutzer:</b> Siehe <a href="https://github.com/aroberge/reeborg/blob/master/dev_tools/known_problems.md" target="_blank" rel="noopener">bekannte Probleme</a>.';

exports.ui_de = ui_de = {};
exports.en_to_de = en_to_de = {};
exports.de_to_en = de_to_en = {};

ui_de["de-en"] =  "Gemischter Modus: Benutzeroberfläche in Deutsch; Programmiersprache in Englisch." +
                  "Mixed mode: User Interface in Deutsch; programming language English.<br>";

ui_de["SITE NAME"] = "Reeborg's Welt";
ui_de["WORLD INFO"] = "Welt Info";
ui_de["EDITOR VISIBLE"] = "Editor sichtbar bleiben lassen";

ui_de["apple"] = en_to_de["apple"] = "Apfel";
ui_de["banana"] = en_to_de["banana"] = "Banane";
ui_de["beeper"] = en_to_de["beeper"] = "Piepser";
ui_de["box"] = en_to_de["box"] = "Box";
ui_de["bridge"] = en_to_de["bridge"] = "Brücke";
ui_de["carrot"] = en_to_de["carrot"] = "Karotte";
ui_de["daisy"] = en_to_de["daisy"] = "Gänseblümchen";
ui_de["dandelion"] = en_to_de["dandelion"] = "Löwenzahn";
ui_de["leaf"] = en_to_de["leaf"] = "Blatt";
ui_de["square"] = en_to_de["square"] = "Quadrat";
ui_de["star"] = en_to_de["star"] = "Stern";
ui_de["strawberry"] = en_to_de["strawberry"] = "Erdbeere";
ui_de["token"] = en_to_de["token"] = "Token";
ui_de["tokens are Reeborg's favourite thing."] = "Tokens sind Reeborg's Lieblingsding.";
ui_de["triangle"] = en_to_de["triangle"] = "Dreieck";
ui_de["tulip"] = en_to_de["tulip"] = "Tulpe";
ui_de["bucket"] = en_to_de["bucket"] = "Eimer";
ui_de["bulb"] = en_to_de["bulb"] = "Glühbirne";
ui_de["bricks"] = en_to_de["bricks"] = "Ziegel";

ui_de["mud"] = en_to_de["mud"] = "Schlamm";
ui_de["soil"] = en_to_de["soil"] = "Dreck";
ui_de["water"] = en_to_de["water"] = "Wasser";
ui_de["grass"] = en_to_de["grass"] = "Gras";
ui_de["gravel"] = en_to_de["gravel"] = "Kies";
ui_de["ice"] = en_to_de["ice"] = "Eis";
ui_de["fire"] = en_to_de["fire"] = "Feuer";

ui_de["infinite"] = "unbegrenzte Anzahl";

ui_de["fence_right"] = en_to_de["fence_right"] = "Zaun_rechts";
ui_de["fence_left"] = en_to_de["fence_left"] = "Zaun_links";
ui_de["fence_vertical"] = en_to_de["fence_vertical"] = "Zaun_vertilal";
ui_de["fence_double"] = en_to_de["fence_double"] = "Zaun_doppelt";

ui_de["Invalid Javascript code in Onload editor"] = "Ungültiger Javascript onload code; kontaktiere den Ersteller der Welt.";
ui_de["Invalid Python code in Onload editor"] = "Ungültiger Python onload code; kontaktiere den Ersteller der Welt.";

ui_de["Too many steps:"] = "Zu viele Schritte: {max_steps}<br>Nutze <code>set_max_nb_steps(nb)</code> um das Limit zu erhöhen.";
ui_de["<li class='success'>Reeborg is at the correct x position.</li>"] = "<li class='success'>Reeborg ist an der korrekten x-Position.</li>";
ui_de["<li class='failure'>Reeborg is at the wrong x position.</li>"] = "<li class='failure'>Reeborg ist an der falschen x-Position.</li>";
ui_de["<li class='success'>Reeborg is at the correct y position.</li>"] = "<li class='success'>Reeborg ist an der korrekten y-Position.</li>";
ui_de["<li class='failure'>Reeborg is at the wrong y position.</li>"] = "<li class='failure'>Reeborg ist an der falschen y-Position.</li>";
ui_de["<li class='success'>All objects are at the correct location.</li>"] = "<li class='success'>Alle Objekte sind an der korrekten Position.</li>";
ui_de["<li class='failure'>One or more objects are not at the correct location.</li>"] = "<li class='failure'>Eines oder mehrere Objekte sind nicht an der korrekten Position.</li>";
ui_de["<li class='success'>All walls have been built correctly.</li>"] = "<li class='success'>Alle Wände wurden korrekt gebaut.</li>";
ui_de["<li class='failure'>One or more walls missing or built at wrong location.</li>"] = "<li class='failure'>Eine oder mehrere Wände fehlen oder wurden an der falschen Position gebaut.</li>";
ui_de["Last instruction completed!"] = "Letzte Anweisung vollendet!";
ui_de["<p class='center'>Instruction <code>done()</code> executed.</p>"] = "<p class='center'>Anweisung <code>done()</code> ausgeführt.</p>";

ui_de["Unknown object"] = "Unbekanntes Objekt: <code>{obj}</code>";
ui_de["No object found here"] = "<code>{obj}</code> hier nicht gefunden!";
ui_de["object"] = "Objekt";
ui_de["I don't have any object to put down!"] = "Ich habe kein <code>{obj}</code> um es abzulegen!";
ui_de["There is already a wall here!"] = "Hier ist schon eine Wand!";
ui_de["There is no wall to remove!"] = "Hier ist keine Wand, die entfernt werden kann!";
ui_de["Ouch! I hit a wall!"] = "Autsch! Ich bin gegen die Wand gelaufen!";
ui_de["Done!"] = "Fertig!";
ui_de["There is no position as a goal in this world!"] = "In dieser Welt gibt es keine Ziel-Position!";
ui_de["There is no goal in this world!"] = "In dieser Welt gibt es kein Ziel!";
ui_de["I carry too many different objects. I don't know which one to put down!"] = "Ich trage zu viele verschiedene Objekte. Ich weis nicht, welches ich ablegen soll!";
ui_de["Many objects are here; I do not know which one to take!"] = "Hier sind viele verschiedene Objekte; Ich weis nicht, welches ich nehmen soll!";

ui_de.east = en_to_de.east = "Ost";
ui_de.north = en_to_de.north = "Nord";
ui_de.west = en_to_de.west = "West";
ui_de.south = en_to_de.south = "Süd";
ui_de["Unknown orientation for robot."] = "Unbekannte Roboter-Ausrichtung.";

ui_de["Invalid position."] = "{pos} ist eine ungültige Position.";
ui_de["Invalid orientation."] = "'{orient}' ist eine ungültige Ausrichtung.";

ui_de["World selected"] = "Welt {world} ausgewählt";
ui_de["Could not find world"] = "Welt {world} konnte nicht gefunden werden";
ui_de["Object names"] = " library, token, star, triangle, square, etc.";

ui_de["Invalid world file."] = "Ungültige world Datei.";
ui_de["PERMALINK"] = "PERMALINK";
ui_de["Could not find link: "] = "Link konnte nicht gefunden werden: ";

ui_de["Click on world to move robot."] = "Klicke auf die Welt um mögliche Start-Positionen für Reeborg hinzuzufügen oder zu entfernen.";
ui_de["Added robot."] = "Reeborg hinzugefügt.";
ui_de["Click on image to turn robot"] = "Klicke auf das Bild um Reeborg zu drehen";
ui_de["Robot now has tokens."] = "Reeborg hat jetzt {x_tokens} Tokens.";
ui_de["Click on world to add object."] = "Klicke auf die Welt um eine Anzahl für <code>{obj}</code> zu setzen.";
ui_de["Click on desired object below."] = "Klicke unterhalb auf das gewünschte Objekt.";
ui_de["Click on world to toggle walls."] = "Klicke auf die Welt um Wände ein- oder auszuschalten.";
ui_de["Click on world to set home position for robot."] = "Klicke auf die Welt um mögliche finale Positionen für den Roboter hinzuzufügen / zu entfernen.";
ui_de["Click on world to toggle additional walls to build."] = "Klicke auf die Welt um das Bauen zusätzlicher Wände zu (de)aktivieren.";
ui_de["Click on desired goal object below."] = "Klicke unterhalb auf das gewünschte Zielobjekt.";
ui_de["Click on world to set number of goal objects."] = "Klicke auf die Welt um die Anzahl des Ziels <code>{obj}</code> zu setzen.";
ui_de["Enter number of tokens for robot to carry (use inf for infinite number)"] = "Gib die Anzahl der Tokens ein, die Reeborg tragen soll.";
ui_de[" is not a valid value!"] = " ist kein gültiger Wert!";
ui_de["Enter number of objects desired at that location."] = "Klicke auf die Welt um die Anzahl von <code>{obj}</code> zu setzen.";
ui_de["Objects found here:"] = "Objekte, die hier gefunden wurden:";
ui_de["Description"] = "Beschreibung";
ui_de["A robot located here carries no objects."] = "Ein Roboter an der Position (x, y) = ({x}, {y}) trägt keine Objekte.";
ui_de["Goal to achieve:"] = "Zu erreichendes Ziel:";
ui_de["A robot located here carries:"] = "Ein Roboter an der Position (x, y) = ({x}, {y}) trägt:";
ui_de["random location"] = "zufällige Position";
ui_de["Enter number of objects to give to robot."] = "Gib die Anzahl von <code>{obj}</code> ein, die dem Roboter gegeben werden sollen.";
ui_de["Special information about this location:"] = "Spezifische Informationen über diese Position:";
ui_de["Click on world to toggle tile."] = "Klicke auf die Welt um <code>{obj}</code> Kachel zu (de)aktivieren.";
ui_de["Click on desired tile below."] = "Klicke unterhalb auf die gewünschte Kachel oder auf die Farbauswahl.";
ui_de["A wall must be built east of this location."] = "Östlich von dieser Position muss eine Wand gebaut werden.";
ui_de["A wall must be built north of this location."] = "Nördlich von dieser Position muss eine Wand gebaut werden.";
ui_de["A wall must be built west of this location."] = "Westlich von dieser Position muss eine Wand gebaut werden.";
ui_de["A wall must be built south of this location."] = "Südlich von dieser Position muss eine Wand gebaut werden.";
ui_de["The final required position of the robot will be chosen at random."] = "Die benötigte finale Position des Roboters wird zufällig ausgewählt werden.";
ui_de["The final position of the robot must be (x, y) = "] = "Die finale Position des Roboters muss sein: (x, y) = ";
ui_de["Click on world to fill with given tile."] = "Klicke auf die Welt um mit der gegebenen Kachel zu füllen.";
ui_de["Click on desired object below."] = "Klicke unterhalb auf das gewünschte Objekt.";
ui_de["Enter url of image to use as background."] = "Gebe die URL des Bildes ein, das als Hintergrund genutzt werden soll.";
ui_de["Replace editor content"] = "Möchtest du deinen Editor-Code durch den vom Weltersteller vorgegebenen ersetzen?";
ui_de["Replace library content"] = "Möchtest du deinen Library-Code durch den vom Weltersteller vorgegebenen ersetzen?";
ui_de["colour"] = "Farbe";

ui_de["Name already exist; confirm that you want to replace its content."] = "Name existiert bereits; bestätige, dass du seinen Inhalt ersetzen möchtest.";
ui_de["No such world!"] = "Eine solche Welt existiert nicht!";
ui_de["Enter world name to save"] = "Gibt den Namen der Welt zum speichern ein; Namen in Benutzung: ";
ui_de["Enter world name to delete"] = "Gib den Namen der zu löschenden Welt ein; existierende Welten: ";
ui_de["Delete "] = "Lösche ";

ui_de["Error found at or near line {number}."] = "Fehler nahe oder in Zeile {number} gefunden.";
ui_de["<br>Perhaps a missing colon is the cause."] = "<br>Vielleicht ist ein fehlender Strichpunkt der Grund.";
ui_de["<br>Perhaps you forgot to add parentheses ()."] = "<br>Vielleicht hast du vergessen, Klammern () hinzuzufügen.";
ui_de["<br>Perhaps you misspelled a word or forgot to define a function or a variable."] = "<br>Vielleicht hast du ein Wort falsch geschrieben oder hast vergessen eine Methode / Variable zu definieren.";
ui_de["I cannot help you with this problem."] = "Bei diesem Problem kann ich dir nicht helfen.";

ui_de["I'm stuck in mud."] = "Ich stecke im Schlamm fest.";
ui_de["Mud: Reeborg <b>cannot</b> detect this and will get stuck if it moves to this location."] = "Schlamm: Reeborg <b>kann</b> das <b>nicht</b> feststellen und wird feststecken wenn er sich zu dieser Position bewegt.";
ui_de["Soil: usually safe, but looks identical to mud."] = "Dreck: normalerweise sicher, aber sieht genau so aus wie Schlamm.";
ui_de["I'm slipping on ice!"] = "Ich rutsche auf Eis!";
ui_de["Ice: Reeborg <b>cannot</b> detect this and <em>might</em> slide and move to the next location if it moves to this location."] = "Eis: Reeborg <b>kann</b> das <b>nicht</b> feststellen und <em>könnte</em> zur nächsten Position rutschen wenn er sicht zu dieser Position bewegt.";
ui_de["Grass: usually safe."] = "Gras: normalerweise sicher.";
ui_de["Gravel: usually safe."] = "Kies: normalerweise sicher.";
ui_de["I'm in water!"] = "Ich bin im Wasser!";
ui_de["Water: Reeborg <b>can</b> detect this but will get damaged if it moves to this location."] = "Wasser: Reeborg <b>kann</b> das <b>nicht</b> feststellen und wird beschädigt wenn er sicht zu dieser Position bewegt.";
ui_de["green home tile: Reeborg <b>can</b> detect this tile using at_goal()."] = "grüne Home-Kachel: Reeborg <b>kann</b> sie mit at_goal() aufspüren.";
ui_de["Crash!"] = "Crash!";
ui_de["brick wall: Reeborg <b>can</b> detect this but will hurt himself if he attemps to move through it."] = "Ziegelwand: Reeborg <b>kann</b> sie erkennen wird sich verletzen wenn er versucht, sich durch die Wand zu bewegen.";
ui_de["I hit a fence!"] = "Ich bin gegen einen Zaun gelaufen!";
ui_de["Fence: Reeborg <b>can</b> detect this but will be stopped by it."] = "Zaun: Reeborg <b>kan</b> ihn erkennen aber wird durch ihn gestoppt werden.";
ui_de["Bridge:Reeborg <b>can</b> detect this and will know that it allows safe passage over water."] = "Brücke: Reeborg <b>kann</b> sie erkennen und wird wissen dass sie das sichere Passieren über Wasser ermöglicht.";
ui_de["My joints are melting!"] = "Meine Verbindungsstücke schmelzen!";
ui_de["A bucket full of water."] = "Ein Eimer voll Wasser.";
ui_de["Tulip bulb: might grow into a nice tulip with some water from a bucket."] = "Tulpenknolle: kann mit etwas Wasser zu einer schönen Tulpe heranwachsen.";


ui_de["Something is blocking the way!"] = "Etwas blockiert den Weg!";
ui_de["Reeborg <b>can</b> detect this tile using at_goal()."] = "Reeborg <b>kann</b> das mit at_goal() erkennen.";
ui_de["green home tile:"] = "grüne Home-Kachel:";
ui_de["home:"] = "Home:";
ui_de["racing flag:"] = "Rennflagge:";
ui_de["house:"] = "Haus:";

ui_de["Local variables"] = "Lokale Variablen";
ui_de["Global variables"] = "Globale Variablen";
ui_de["Watched expressions"] = "Bewachte Ausdrücke";

ui_de["move forward"] = "schritt nach vorne";
ui_de["turn left"] = "nach links drehen";
ui_de["take object"] = "Objekt nehmen";
ui_de["put object"] = "Objekt ablegen";
ui_de["Pause the program's execution."] = "Ausführung des Programms pausieren.";
ui_de["Build a wall in front of the robot."] = "Eine Wand vor dem Roboter bauen.";
ui_de["End the program's execution."] = "Ausführung des Programms beenden.";
ui_de["True if a wall is blocking the way."] = "Wahr wenn eine Wand den Weg blockiert.";
ui_de["True if nothing is blocking the way."] = "Wahr wenn nichts den Weg blockiert.";
ui_de["True if desired destination."] = "Wahr wenn gewünschte Position.";
ui_de["True if robot carries at least one object."] = "Wahr wenn der Roboter mindestens ein Objekt trägt.";
ui_de["True if there is at least one object here."] = "Wahr wenn hier mindestens ein Objekt ist.";
ui_de["True if robot is facing North."] = "Wahr wenn der Roboter nach Norden schaut.";
ui_de["Delay between actions; default is 300 ms."] = "Verzögerung zwischen Aktionen; Standard: 300 ms.";

ui_de["Save world in browser"] = "Welt in Browser speichern";
ui_de["LOAD BLOCKLY"] = "Programm aus Datei importieren (Blockly)";
ui_de["LOAD BLOCKLY EXPLAIN"] = "Öffnet eine lokale Datei und nutzt seinen Inhalt um den Inhalt des Blockly-Workspace zu ersetzen.";
ui_de["LOAD EDITOR"] = "Programm aus Datei importieren";
ui_de["LOAD EDITOR EXPLAIN"] = "Öffnet eine lokale Datei und nutzt seinen Inhalt um den Inhalt des Code-Editor zu ersetzen.";
ui_de["LOAD LIBRARY"] = "Library aus Datei importieren";
ui_de["LOAD LIBRARY EXPLAIN"] = "Öffnet eine lokale Datei und nutzt seinen Inhalt um den Inhalt der Library zu ersetzen.";
ui_de["LOAD WORLD"] = "Welt aus Datei öffnen";
ui_de["LOAD WORLD EXPLAIN"] = "Lädt eine Welt aus einer Datei auf deinem Computer.";
ui_de["SAVE BLOCKLY"] = "Programm in Datei speichern";
ui_de["SAVE BLOCKLY EXPLAIN"] = "Speichert die aktuellen Blöcke in einer Datei." + mac_user_save_files_en;
ui_de["SAVE EDITOR"] = "Programm in Datei speichern";
ui_de["SAVE EDITOR EXPLAIN"] = "Speichert den Inahlt des Editors in einer Datei." + mac_user_save_files_en;
ui_de["SAVE LIBRARY"] = "Speichert die Library";
ui_de["SAVE LIBRARY EXPLAIN"] = "Speichert den Inhalt der Library in einer Datei." + mac_user_save_files_en;
ui_de["SAVE WORLD"] = "Welt in Datei speichern";
ui_de["SAVE WORLD EXPLAIN"] = "Speichert die Welt (als JSON-Objekt) in einer Datei auf deinem Computer." + mac_user_save_files_en;

ui_de["PROGRESS SECTION TITLE"] = "Verfolge gelöste Aufgaben:";
ui_de["PROGRESS EXPLAIN"] = "Gelöste Aufgaben sind mit " + RUR.CHECKMARK +
    "in der Weltauswahl markiert und die Informationen werden in deinem Browser gespeichert. Wenn du einen anderen Browser nutzt, " +
    "werden die Aufgaben die du bereits mit einem anderen Browser gelöst hast nicht gezeigt. " +
    "Wenn du unterhalb auf den Speichern Knopf drückst, wird eine Datei mit dem Namen progress.json mit den gelösten Aufgaben gepseichert werden, " +
    "die im aktuellen Browser aufgezeichnet wurden. Du kannst diese Datei in einem anderen Browser importieren, damit dein Fortschritt aktualisiert werden kann.";
ui_de["SAVE PROGRESS"] = "Speichern";
ui_de["IMPORT PROGRESS"] = "Importieren";
ui_de["RETRIEVE SOLUTION"] = "Lösung holen!";
ui_de["RETRIEVE SOLUTION EXPLAIN"] = "Falls eine Lösung (Blöcke, oder Code und möglicherweise Code in der Library) für diese Welt im Browser für den Aktuellen Programmier-Modus gespeichert wurde, wird sie geholt und der aktuelle Inhalt durch sie ersetzt.";

ui_de["ADD CONTENT TO WORLD"] = "Inhalt zur Welt von den unterhalb ausgewählen Gegenständen hinzuzufügen.";
ui_de["ADD BLOCKLY TEXT"] = "Code Blöcke";
ui_de["ADD EDITOR TEXT"] = "Code im Editor";
ui_de["ADD LIBRARY TEXT"] = "Bibliothek";
ui_de["ADD PRE TEXT"] = "Vor";
ui_de["ADD POST TEXT"] = "Nach";
ui_de["ADD DESCRIPTION TEXT"] = "Beschreibung";
ui_de["ADD ONLOAD TEXT"] = "Laden";

ui_de["KEYBOARD BUTTON"] = "Reeborg's Tastatur";
ui_de["ADDITIONAL OPTIONS"] = "Zusätzliche Optionen";

ui_de["BASIC COMMANDS"] = "Grundlegende Kommandos";
ui_de["DEFINING"] = "Definieren";
ui_de["LOOPS"] = "Schleifen";
ui_de["DECISIONS"] = "Entscheidungen";
ui_de["CONDITIONS"] = "Bedingungen";
ui_de["USING VARIABLES"] = "Nutzung von Variablen";
ui_de["COMMANDS"] = "Kommandos";
ui_de["OTHER"] = "Andere";
ui_de["OBJECTS"] = "Objekte";

ui_de["Python Code"] = "Python Code";
ui_de["Javascript Code"] = "Javascript Code";
ui_de["LIBRARY"] = "Library";
ui_de["EXTRA"] = "Zusatz";
ui_de["PRE"] = "Vor";
ui_de["POST"] = "Nach";
ui_de["DESCRIPTION"] = "Beschreibung";
ui_de["ONLOAD"] = "Laden";

ui_de["HIGHLIGHT IMPOSSIBLE"] = "Durch ein Problem mit deinem Code musste ich Code-Highlighting deaktivieren.";
ui_de["COMMAND RESULT"] = "Wähle eine auszuführende Aktion vom Menü unterhalb aus.";

ui_de["DELETE WORLD TEXT"] = "Das Nachfolgende bezieht sich auf die aktuell in deinem Browser gespeicherten Welten, die du löschen kannst:";
ui_de["PYTHON ONLY"] = "Nur Python";
ui_de["COLLABORATION"] = "Kooperation";
ui_de["TOGETHERJS EXPLAIN"] = "Tool zur Zusammenarbeit mit einer oder mehreren anderen Personen durch Nutzung von Mozilla's TogetherJS. Funktioniert nicht mit Blockly.";
ui_de["WORLD CREATION TITLE"] = "Welt: Erstellung, Edition, ...";
ui_de["EDIT WORLD"] = "Welt editieren";
ui_de["EDIT WORLD EXPLAIN"] = "Du kannst deine eigene Welt erstellen, indem du die aktuelle editierst.";
ui_de["PROGRAM IN EDITOR"] = "Programm im Editor";
ui_de["PROGRAM IN BLOCKLY WORKSPACE"] = "Programm im Blockly-Workspace";
ui_de["CONTACT"] = "(Nur Englisch/Französisch) Email:";
ui_de["ISSUES"] = "Bugmeldungen, Vorschläge, andere Anliegen, etc. (nur Englisch/Französisch)";
ui_de["FORUM"] = "Diskussionsforum (nur Englisch/Französisch)";
ui_de["HELP"] = "Hilfe";
ui_de["DOCUMENTATION"] = '<a href="http://reeborg.ca/docs/en" target="_blank" rel="noopener">Dokumentation</a>';
ui_de["PYTHON HELP"] = "In Python: Führe ein Programm mit <code>help()</code> aus, um eine Liste von Kommandos zu erhalten oder <code>help(move)</code> um Hilfe zur <code>move()</code> Funktion zu erhalten, etc.";
ui_de["KEYBOARD HELP"] = "Klicke auf die Reeborg Tastatur um eine Liste von verfügbaren Kommandos, Python Schlüsselwörtern, etc. zu erhalten.";

ui_de["WORLD EDITOR"] = "Welteditor";
ui_de["m-east"] = "Osten";
ui_de["m-north"] = "Norden";
ui_de["m-west"] = "Westen";
ui_de["m-south"] = "Süden";
ui_de["m-random"] = "zufällig";
ui_de["m-dimensions"] = "Weltmaße";
ui_de["m-add"] = "Hinzufügen";
ui_de["m-add-robot"] = "Roboter hinzufügen";
ui_de["m-robot"] = "Roboter";
ui_de["m-position"] = "Position(en)";
ui_de["m-turn"] = "Drehen";
ui_de["m-objects"] = "Objekte";
ui_de["m-walls"] = "Wände";
ui_de["m-objects2"] = "Objekte";
ui_de["m-tiles"] = "Kacheln";
ui_de["m-fill"] = "Füllen";
ui_de["m-solid"] = "Hindernisse";
ui_de["m-decorative"] = "Dekorative Objekte";
ui_de["m-background"] = "Hintergrundbild";
ui_de["m-goal"] = "Ziel";
ui_de["mg-robot"] = "Roboter";
ui_de["mg-walls"] = "Wände";
ui_de["mg-objects"] = "Objekte";

ui_de["Reeborg says: I'm done!"] = "Reeborg sagt: Ich bin fertig!";
ui_de["Reeborg writes:"] = "Reeborg schreibt:";
ui_de["Reeborg shouts: Something is wrong!"] = "Reeborg schreit: Hier ist etwas falsch!";
ui_de["Reeborg explores some Javascript code"] = "Reeborg entdeckt etwas JavaScript Code";
ui_de["Reeborg states:"] = "Reeborg sagt:";
ui_de["Reeborg watches some variables!"] = "Reeborg beobachtet einige Variablen!";
ui_de["Click on the world to get some additional information."] = "Klicke auf die Welt um einige zusätzliche Informationen zu erhalten.";

ui_de["Reeborg's basic keyboard"] = "Reeborg's grundlegende Tastatur";
ui_de["kbd-command-btn"] = "Kommandos";
ui_de["kbd-condition-btn"] = "Bedingungen";
ui_de["kbd-python-btn"] = "Python";
ui_de["kbd-py-console-btn"] = "Python";
ui_de["kbd-javascript-btn"] = "JavaScript";
ui_de["kbd-objects-btn"] = "Objekte";
ui_de["kbd-special-btn"] = "Speziell";

ui_de["UNDO"] = "Rückgängig";
ui_de["REDO"] = "Wiederholen";
ui_de["tab"] = "TAB";
ui_de["shift-tab"] = "Shift-TAB";
ui_de["enter"] = "\u23CE";
ui_de["<code>repeat</code> is not a true Python keyword."] = "<code>repeat</code> ist kein richtiges Python Schlüsselwort.";

ui_de["Colour:"] = "Farbe:";
ui_de["Enter a colour"] = "Gib eine Farbe ein";

ui_de["Background image"] = "Hintergrundbild";

ui_de["NAME:"] = "Name:";
ui_de["Save world in browser"] = "Welt in Browser speichern";

ui_de["Set the world's dimensions"] = "Setze die Maße der Welt";
ui_de["set-dimensions-explain"] = "Falls gewünscht, kannst du die Größe der Welt zu anderen als den Standardmaßen setzen. Bitte denke daran, dass eine geringere AuflösungIf so desired, you can set the size of the world to be different from the default dimensions. Please remember that smaller resolution screens may not be able to display very large worlds.";
ui_de["Maximum x value:"] = "Maximaler x-Wert:";
ui_de["Maximum y value:"] = "Maximaler  y-Wert:";
ui_de["Use small tiles"] = "Verwende kleine Bilder";

ui_de["Set goal number for object"] = "Setze Zielnummer für das Objekt";
ui_de["dialog-goal-object-explain"] = "Klicke don the checkbox if you wish that number to be equal  to the total number of such objects found in the world at the beginning.";
ui_de["Number of objects"] = "Anzahl der Objekte";
ui_de["All such objects"] = "Alle Objekte der Art";

ui_de["Number of objects:"] = "Anzahl der Objekte:";
ui_de["Maximum:"] = "Maximum:";
ui_de["Add object in the world"] = "Set number of object";
ui_de["ADD OBJECT EXPLAIN"] = "Choose zero to remove any existing such object at this location. If <code>Maximum</code> is set to a value greater than the <code>Number of objects</code>, a number of objects, between these two values, will be chosen randomly each time a program is run.";

ui_de["Unlimited:"] = "Unlimited:";
ui_de["Give object to robot"] = "Give object to robot";
ui_de["GIVE OBJECT EXPLAIN"] = "Choose a number of objects for the robot to carry. Click on the checkbox if you wish that number to be unlimited.";

ui_de["UPDATE BLOCKLY CONTENT"] = "This world has some default content for the blocks workspace. To replace the current blocks content, click on the button";
ui_de["UPDATE BLOCKLY BUTTON"] = "Ersetze bisherige Blöcke";
ui_de["Contents from World"] = "Inhalte von World";

ui_de["WARNING: Do not change this comment."] = "WARNING: Do not change this comment.";
ui_de["Library Code is below."] = "Code-Bibliothek ist unten.";
ui_de["No solution can be saved when using REPL (Py)."] = "Mit REPL (Py) können keine Lösungen gespeichert werden!.";
ui_de["No solution can be loaded when using REPL (Py)."] = "Mit REPL (Py) können keine Lösungen geladen werden!.";

ui_de["You are not allowed to use <code>done</code> in this world!"] = "Du darfst <code>done()</code> nicht in dieser Welt verwenden!";
ui_de["Execution ended before the <em>Post</em> code was executed."] = "Ausführung wurde beendet. bevor der Code <em>Post</em> ausgeführt wurde.";

ui_de["Difficulty level"] = "Schwierigkeitsgrad";

ui_de["Expected result"] = "Erwartetes Ergebnis";
ui_de["Differences highlighted"] = "Differenzen markiert";
ui_de["Actual result"] = "Aktuelles Ergebnis";

ui_de["Cannot parse progress file."] = "Kann die Datei mit dem Fortschritt nicht lesen.";
ui_de["Cannot merge progress."] = "Fortschritt kann nicht hinzugefügt werden.";
ui_de["No solution found for this world."] = "Keine Lösung für diese Welt.";

ui_de["THINKING"] = "Denke ...";

function inverse(obj){
  var retobj = {};
  for(var key in obj){
    retobj[obj[key]] = key;
  }
  return retobj;
}

de_to_en = inverse(en_to_de)

},{}],100:[function(require,module,exports){
// the following is used in a few places below
var mac_user_save_files_en = ' <b>Mac users:</b> please see <a href="https://github.com/aroberge/reeborg/blob/master/dev_tools/known_problems.md" target="_blank" rel="noopener">Known problems</a>.';

exports.ui_en = ui_en = {};
exports.en_to_en = en_to_en = {};

ui_en["en-fr"] = "Mixed mode: User Interface in English; programming language in French.<br>" +
    "Mode mixte: interface graphique en anglais; programmation en français.";

ui_en["SITE NAME"] = "Reeborg's World";
ui_en["WORLD INFO"] = "World Info";
ui_en["EDITOR VISIBLE"] = "Keep editor visible";

ui_en["apple"] = en_to_en["apple"] = "apple";
ui_en["banana"] = en_to_en["banana"] = "banana";
ui_en["beeper"] = en_to_en["beeper"] = "beeper";
ui_en["box"] = en_to_en["box"] = "box";
ui_en["bridge"] = en_to_en["bridge"] = "bridge";
ui_en["carrot"] = en_to_en["carrot"] = "carrot";
ui_en["daisy"] = en_to_en["daisy"] = "daisy";
ui_en["dandelion"] = en_to_en["dandelion"] = "dandelion";
ui_en["leaf"] = en_to_en["leaf"] = "leaf";
ui_en["square"] = en_to_en["square"] = "square";
ui_en["star"] = en_to_en["star"] = "star";
ui_en["strawberry"] = en_to_en["strawberry"] = "strawberry";
ui_en["token"] = en_to_en["token"] = "token";
ui_en["tokens are Reeborg's favourite thing."] = "tokens are Reeborg's favourite thing.";
ui_en["triangle"] = en_to_en["triangle"] = "triangle";
ui_en["tulip"] = en_to_en["tulip"] = "tulip";
ui_en["bucket"] = en_to_en["bucket"] = "bucket";
ui_en["bulb"] = en_to_en["bulb"] = "bulb";
ui_en["bricks"] = en_to_en["bricks"] = "bricks";

ui_en["mud"] = en_to_en["mud"] = "mud";
ui_en["soil"] = en_to_en["soil"] = "soil";
ui_en["water"] = en_to_en["water"] = "water";
ui_en["grass"] = en_to_en["grass"] = "grass";
ui_en["gravel"] = en_to_en["gravel"] = "gravel";
ui_en["ice"] = en_to_en["ice"] = "ice";
ui_en["fire"] = en_to_en["fire"] = "fire";

ui_en["infinite"] = "infinite number";

ui_en["fence_right"] = en_to_en["fence_right"] = "fence_right";
ui_en["fence_left"] = en_to_en["fence_left"] = "fence_left";
ui_en["fence_vertical"] = en_to_en["fence_vertical"] = "fence_vertical";
ui_en["fence_double"] = en_to_en["fence_double"] = "fence_double";

ui_en["Invalid Javascript code in Onload editor"] = "Invalid Javascript onload code; contact the creator of this world.";
ui_en["Invalid Python code in Onload editor"] = "Invalid Python onload code; contact the creator of this world.";

ui_en["Too many steps:"] = "Too many steps: {max_steps}<br>Use <code>set_max_nb_steps(nb)</code> to increase the limit.";
ui_en["<li class='success'>Reeborg is at the correct x position.</li>"] = "<li class='success'>Reeborg is at the correct x position.</li>";
ui_en["<li class='failure'>Reeborg is at the wrong x position.</li>"] = "<li class='failure'>Reeborg is at the wrong x position.</li>";
ui_en["<li class='success'>Reeborg is at the correct y position.</li>"] = "<li class='success'>Reeborg is at the correct y position.</li>";
ui_en["<li class='failure'>Reeborg is at the wrong y position.</li>"] = "<li class='failure'>Reeborg is at the wrong y position.</li>";
ui_en["<li class='success'>All objects are at the correct location.</li>"] = "<li class='success'>All objects are at the correct location.</li>";
ui_en["<li class='failure'>One or more objects are not at the correct location.</li>"] = "<li class='failure'>One or more objects are not at the correct location.</li>";
ui_en["<li class='success'>All walls have been built correctly.</li>"] = "<li class='success'>All walls have been built correctly.</li>";
ui_en["<li class='failure'>One or more walls missing or built at wrong location.</li>"] = "<li class='failure'>One or more walls missing or built at wrong location.</li>";
ui_en["Last instruction completed!"] = "Last instruction completed!";
ui_en["<p class='center'>Instruction <code>done()</code> executed.</p>"] = "<p class='center'>Instruction <code>done()</code> executed.</p>";

ui_en["Unknown object"] = "Unknown object: <code>{obj}</code>";
ui_en["No object found here"] = "No <code>{obj}</code> found here!";
ui_en["object"] = "object";
ui_en["I don't have any object to put down!"] = "I don't have any <code>{obj}</code> to put down!";
ui_en["There is already a wall here!"] = "There is already a wall here!";
ui_en["There is no wall to remove!"] = "There is no wall to remove!";
ui_en["Ouch! I hit a wall!"] = "Ouch! I hit a wall!";
ui_en["Done!"] = "Done!";
ui_en["There is no position as a goal in this world!"] = "There is no position as a goal in this world!";
ui_en["There is no goal in this world!"] = "There is no goal in this world!";
ui_en["I carry too many different objects. I don't know which one to put down!"] = "I carry too many different objects. I don't know which one to put down!";
ui_en["Many objects are here; I do not know which one to take!"] = "Many different objects are here; I do not know which one to take!";

ui_en.east = en_to_en.east = "east";
ui_en.north = en_to_en.north = "north";
ui_en.west = en_to_en.west = "west";
ui_en.south = en_to_en.south = "south";
ui_en["Unknown orientation for robot."] = "Unknown orientation for robot.";

ui_en["Invalid position."] = "{pos} is an invalid position.";
ui_en["Invalid orientation."] = "'{orient}' is an unknown orientation.";

ui_en["World selected"] = "World {world} selected";
ui_en["Could not find world"] = "Could not find world {world}";
ui_en["Object names"] = " library, token, star, triangle, square, etc.";

ui_en["Invalid world file."] = "Invalid world file.";
ui_en["PERMALINK"] = "PERMALINK";
ui_en["Could not find link: "] = "Could not find link: ";

ui_en["Click on world to move robot."] = "Click on world to add or remove possible starting positions for Reeborg.";
ui_en["Added robot."] = "Added Reeborg.";
ui_en["Click on image to turn robot"] = "Click on image to turn Reeborg";
ui_en["Robot now has tokens."] = "Reeborg now has {x_tokens} tokens.";
ui_en["Click on world to add object."] = "Click on world to set number of <code>{obj}</code>.";
ui_en["Click on desired object below."] = "Click on desired object below.";
ui_en["Click on world to toggle walls."] = "Click on world to toggle walls.";
ui_en["Click on world to set home position for robot."] = "Click on world to add/remove possible final positions for robot.";
ui_en["Click on world to toggle additional walls to build."] = "Click on world to toggle additional walls to build.";
ui_en["Click on desired goal object below."] = "Click on desired goal object below.";
ui_en["Click on world to set number of goal objects."] = "Click on world to set number of goal <code>{obj}</code>.";
ui_en["Enter number of tokens for robot to carry (use inf for infinite number)"] = "Enter number of tokens for Reeborg to carry.";
ui_en[" is not a valid value!"] = " is not a valid value!";
ui_en["Enter number of objects desired at that location."] = "Click on world to set number <code>{obj}</code>.";
ui_en["Objects found here:"] = "Objects found here:";
ui_en["Description"] = "Description";
ui_en["A robot located here carries no objects."] = "A robot located at (x, y) = ({x}, {y}) carries no objects.";
ui_en["Goal to achieve:"] = "Goal to achieve:";
ui_en["A robot located here carries:"] = "A robot located at (x, y) = ({x}, {y}) carries:";
ui_en["random location"] = "random location";
ui_en["Enter number of objects to give to robot."] = "Enter number of <code>{obj}</code> to give to robot.";
ui_en["Special information about this location:"] = "Special information about this location:";
ui_en["Click on world to toggle tile."] = "Click on world to toggle <code>{obj}</code> tile.";
ui_en["Click on desired tile below."] = "Click on desired tile below or on the colour selector.";
ui_en["A wall must be built east of this location."] = "A wall must be built east of this location.";
ui_en["A wall must be built north of this location."] = "A wall must be built north of this location.";
ui_en["A wall must be built west of this location."] = "A wall must be built west of this location.";
ui_en["A wall must be built south of this location."] = "A wall must be built south of this location.";
ui_en["The final required position of the robot will be chosen at random."] = "The final required position of the robot will be chosen at random.";
ui_en["The final position of the robot must be (x, y) = "] = "The final position of the robot must be (x, y) = ";
ui_en["Click on world to fill with given tile."] = "Click on world to fill with given tile.";
ui_en["Click on desired object below."] = "Click on desired object below.";
ui_en["Enter url of image to use as background."] = "Enter url of image to use as background.";
ui_en["Replace editor content"] = "Do you wish to replace your editor code by that provided by the creator of this world?";
ui_en["Replace library content"] = "Do you wish to replace your library code by that provided by the creator of this world?";
ui_en["colour"] = "colour";

ui_en["Name already exist; confirm that you want to replace its content."] = "Name already exist; confirm that you want to replace its content.";
ui_en["No such world!"] = "No such world!";
ui_en["Enter world name to save"] = "Enter world name to save; names in use: ";
ui_en["Enter world name to delete"] = "Enter world name to delete; existing worlds: ";
ui_en["Delete "] = "Delete ";

ui_en["Error found at or near line {number}."] = "Error found at or near line {number}.";
ui_en["<br>Perhaps a missing colon is the cause."] = "<br>Perhaps a missing colon is the cause.";
ui_en["<br>Perhaps you forgot to add parentheses ()."] = "<br>Perhaps you forgot to add parentheses ().";
ui_en["<br>Perhaps you misspelled a word or forgot to define a function or a variable."] = "<br>Perhaps you misspelled a word or forgot to define a function or a variable.";
ui_en["I cannot help you with this problem."] = "I cannot help you with this problem.";

ui_en["I'm stuck in mud."] = "I'm stuck in mud.";
ui_en["Mud: Reeborg <b>cannot</b> detect this and will get stuck if it moves to this location."] = "Mud: Reeborg <b>cannot</b> detect this and will get stuck if it moves to this location.";
ui_en["Soil: usually safe, but looks identical to mud."] = "Soil: usually safe, but looks identical to mud.";
ui_en["I'm slipping on ice!"] = "I'm slipping on ice!";
ui_en["Ice: Reeborg <b>cannot</b> detect this and <em>might</em> slide and move to the next location if it moves to this location."] = "Ice: Reeborg <b>cannot</b> detect this and <em>might</em> slide and move to the next location if it moves to this location.";
ui_en["Grass: usually safe."] = "Grass: usually safe.";
ui_en["Gravel: usually safe."] = "Gravel: usually safe.";
ui_en["I'm in water!"] = "I'm in water!";
ui_en["Water: Reeborg <b>can</b> detect this but will get damaged if it moves to this location."] = "Water: Reeborg <b>can</b> detect this but will get damaged if it moves to this location.";
ui_en["green home tile: Reeborg <b>can</b> detect this tile using at_goal()."] = "green home tile: Reeborg <b>can</b> detect this tile using at_goal().";
ui_en["Crash!"] = "Crash!";
ui_en["brick wall: Reeborg <b>can</b> detect this but will hurt himself if he attemps to move through it."] = "Brick wall: Reeborg <b>can</b> detect this but will hurt himself if he attemps to move through it.";
ui_en["I hit a fence!"] = "I hit a fence!";
ui_en["Fence: Reeborg <b>can</b> detect this but will be stopped by it."] = "Fence: Reeborg <b>can</b> detect this but will be stopped by it.";
ui_en["Bridge:Reeborg <b>can</b> detect this and will know that it allows safe passage over water."] = "Bridge: Reeborg <b>can</b> detect this and will know that it allows safe passage over water.";
ui_en["My joints are melting!"] = "My joints are melting!";
ui_en["A bucket full of water."] = "A bucket full of water.";
ui_en["Tulip bulb: might grow into a nice tulip with some water from a bucket."] = "Tulip bulb: might grow into a nice tulip with some water from a bucket.";


ui_en["Something is blocking the way!"] = "Something is blocking the way!";
ui_en["Reeborg <b>can</b> detect this tile using at_goal()."] = "Reeborg <b>can</b> detect this using at_goal().";
ui_en["green home tile:"] = "green home tile:";
ui_en["home:"] = "home:";
ui_en["racing flag:"] = "racing flag:";
ui_en["house:"] = "house:";

ui_en["Local variables"] = "Local variables";
ui_en["Global variables"] = "Global variables";
ui_en["Watched expressions"] = "Watched expressions";

ui_en["move forward"] = "move forward";
ui_en["turn left"] = "turn left";
ui_en["take object"] = "take object";
ui_en["put object"] = "put object";
ui_en["Pause the program's execution."] = "Pause the program's execution.";
ui_en["Build a wall in front of the robot."] = "Build a wall in front of the robot.";
ui_en["End the program's execution."] = "End the program's execution.";
ui_en["True if a wall is blocking the way."] = "True if a wall is blocking the way";
ui_en["True if nothing is blocking the way."] = "True if nothing is blocking the way.";
ui_en["True if desired destination."] = "True if desired destination.";
ui_en["True if robot carries at least one object."] = "True if robot carries at least one object.";
ui_en["True if there is at least one object here."] = "True if there is at least one object here.";
ui_en["True if robot is facing North."] = "True if robot is facing North.";
ui_en["Delay between actions; default is 300 ms."] = "Delay between actions; default is 300 ms.";

ui_en["Save world in browser"] = "Save world in browser";
ui_en["LOAD BLOCKLY"] = "Import program (blocks) from file";
ui_en["LOAD BLOCKLY EXPLAIN"] = "Opens a local file and use its content to replace the content of the Blockly workspace.";
ui_en["LOAD EDITOR"] = "Import program from file";
ui_en["LOAD EDITOR EXPLAIN"] = "Opens a local file and use its content to replace the content of the Code editor.";
ui_en["LOAD LIBRARY"] = "Import library from a file";
ui_en["LOAD LIBRARY EXPLAIN"] = "Opens a file and use its content to replace the current content of the Library.";
ui_en["LOAD WORLD"] = "Open world from file";
ui_en["LOAD WORLD EXPLAIN"] = "Loads a world from a file on your computer.";
ui_en["SAVE BLOCKLY"] = "Save program to file";
ui_en["SAVE BLOCKLY EXPLAIN"] = "Saves the current blocks in a file." + mac_user_save_files_en;
ui_en["SAVE EDITOR"] = "Save program to file";
ui_en["SAVE EDITOR EXPLAIN"] = "Saves the content of the editor in a file." + mac_user_save_files_en;
ui_en["SAVE LIBRARY"] = "Save the library";
ui_en["SAVE LIBRARY EXPLAIN"] = "Saves the content of the library in a file." + mac_user_save_files_en;
ui_en["SAVE WORLD"] = "Save world to file";
ui_en["SAVE WORLD EXPLAIN"] = "Saves the world (as a json object) to a file on your computer." + mac_user_save_files_en;

ui_en["PROGRESS SECTION TITLE"] = "Keeping track of tasks solved";
ui_en["PROGRESS EXPLAIN"] = "Tasks solved are marked with " + RUR.CHECKMARK +
    "in the world selector and the information is saved in your browser. If you use a different browser, " +
    "the tasks you have already solved using a different browser will not be shown. " +
    "If you click on the save button below, a file named progress.json will be saved with the tasks solved " +
    "recorded in the current browser. You can import this file in a different browser so that your progress can be updated.";
ui_en["SAVE PROGRESS"] = "Save";
ui_en["IMPORT PROGRESS"] = "Import";
ui_en["RETRIEVE SOLUTION"] = "Retrieve solution";
ui_en["RETRIEVE SOLUTION EXPLAIN"] = "If a solution (blocks, or code and possibly code in library) for this world has been saved in the browser for the current programming mode, it will be retrieved and replace the current content.";

ui_en["ADD CONTENT TO WORLD"] = "Add content to world from selected items below.";
ui_en["ADD BLOCKLY TEXT"] = "Code blocks";
ui_en["ADD EDITOR TEXT"] = "Code in editor";
ui_en["ADD LIBRARY TEXT"] = "Library";
ui_en["ADD PRE TEXT"] = "Pre";
ui_en["ADD POST TEXT"] = "Post";
ui_en["ADD DESCRIPTION TEXT"] = "Description";
ui_en["ADD ONLOAD TEXT"] = "Onload";

ui_en["KEYBOARD BUTTON"] = "Reeborg's keyboard";
ui_en["ADDITIONAL OPTIONS"] = "Additional options";

ui_en["BASIC COMMANDS"] = "Basic commands";
ui_en["DEFINING"] = "Defining";
ui_en["LOOPS"] = "Loops";
ui_en["DECISIONS"] = "Decisions";
ui_en["CONDITIONS"] = "Conditions";
ui_en["USING VARIABLES"] = "Using variables";
ui_en["COMMANDS"] = "Commandes";
ui_en["OTHER"] = "Other";
ui_en["OBJECTS"] = "Objects";

ui_en["Python Code"] = "Python Code";
ui_en["Javascript Code"] = "Javascript Code";
ui_en["LIBRARY"] = "library";
ui_en["EXTRA"] = "extra";
ui_en["PRE"] = "Pre";
ui_en["POST"] = "Post";
ui_en["DESCRIPTION"] = "Desc.";
ui_en["ONLOAD"] = "Onload";

ui_en["HIGHLIGHT IMPOSSIBLE"] = "A problem with your code has caused me to turn off the code highlighting.";
ui_en["COMMAND RESULT"] = "Select action to perform from menu below.";

ui_en["DELETE WORLD TEXT"] = "The following refers to worlds currently stored in your browser which you can delete:";
ui_en["PYTHON ONLY"] = "Python only";
ui_en["COLLABORATION"] = "Collaboration";
ui_en["TOGETHERJS EXPLAIN"] = "Tool which permits collaboration with one or more other user using Mozilla's TogetherJS. Does not work with Blockly.";
ui_en["WORLD CREATION TITLE"] = "World: creation, edition, ...";
ui_en["EDIT WORLD"] = "Edit world";
ui_en["EDIT WORLD EXPLAIN"] = "You can create your own world by editing the current one.";
ui_en["PROGRAM IN EDITOR"] = "Program in editor";
ui_en["PROGRAM IN BLOCKLY WORKSPACE"] = "Program in blockly workspace";
ui_en["CONTACT"] = "(English/French only) Email:";
ui_en["ISSUES"] = "Bug reports, suggestions, other issues, etc. (English/French only)";
ui_en["FORUM"] = "Discussion forum (English/French only)";
ui_en["HELP"] = "Help";
ui_en["DOCUMENTATION"] = '<a href="http://reeborg.ca/docs/en" target="_blank" rel="noopener">Documentation</a>';
ui_en["PYTHON HELP"] = "Using Python, execute a program with <code>help()</code> to get a list of commands or <code>help(move)</code> to get help on the <code>move()</code> function, etc.";
ui_en["KEYBOARD HELP"] = "Click on Reeborg keyboard to see a list of available commands, Python keywords, etc.";

ui_en["WORLD EDITOR"] = "World editor";
ui_en["m-east"] = "East";
ui_en["m-north"] = "North";
ui_en["m-west"] = "West";
ui_en["m-south"] = "South";
ui_en["m-random"] = "Random";
ui_en["m-dimensions"] = "World dimensions";
ui_en["m-add"] = "Add";
ui_en["m-add-robot"] = "Add robot";
ui_en["m-robot"] = "Robot";
ui_en["m-position"] = "Position(s)";
ui_en["m-turn"] = "Turn";
ui_en["m-objects"] = "Objects";
ui_en["m-walls"] = "Walls";
ui_en["m-objects2"] = "Objects";
ui_en["m-tiles"] = "Tiles";
ui_en["m-fill"] = "Fill";
ui_en["m-solid"] = "Obstacles";
ui_en["m-decorative"] = "Decorative objects";
ui_en["m-background"] = "Background image";
ui_en["m-goal"] = "Goal";
ui_en["mg-robot"] = "Robot";
ui_en["mg-walls"] = "Walls";
ui_en["mg-objects"] = "Objects";

ui_en["Reeborg says: I'm done!"] = "Reeborg says: I'm done!";
ui_en["Reeborg writes:"] = "Reeborg writes:";
ui_en["Reeborg shouts: Something is wrong!"] = "Reeborg shouts: Something is wrong!";
ui_en["Reeborg explores some Javascript code"] = "Reeborg explores some Javascript code";
ui_en["Reeborg states:"] = "Reeborg states:";
ui_en["Reeborg watches some variables!"] = "Reeborg watches some variables!";
ui_en["Click on the world to get some additional information."] = "Click on the world to get some additional information.";

ui_en["Reeborg's basic keyboard"] = "Reeborg's basic keyboard";
ui_en["kbd-command-btn"] = "Commands";
ui_en["kbd-condition-btn"] = "Conditions";
ui_en["kbd-python-btn"] = "Python";
ui_en["kbd-py-console-btn"] = "Python";
ui_en["kbd-javascript-btn"] = "Javascript";
ui_en["kbd-objects-btn"] = "Objects";
ui_en["kbd-special-btn"] = "Special";

ui_en["UNDO"] = "UNDO";
ui_en["REDO"] = "REDO";
ui_en["tab"] = "TAB";
ui_en["shift-tab"] = "Shift-TAB";
ui_en["enter"] = "\u23CE";
ui_en["<code>repeat</code> is not a true Python keyword."] = "<code>repeat</code> is not a true Python keyword.";

ui_en["Colour:"] = "Colour:";
ui_en["Enter a colour"] = "Enter a colour";

ui_en["Background image"] = "Background image";

ui_en["NAME:"] = "Name:";
ui_en["Save world in browser"] = "Save world in browser";

ui_en["Set the world's dimensions"] = "Set the world's dimensions";
ui_en["set-dimensions-explain"] = "If so desired, you can set the size of the world to be different from the default dimensions. Please remember that smaller resolution screens may not be able to display very large worlds.";
ui_en["Maximum x value:"] = "Maximum x value:";
ui_en["Maximum y value:"] = "Maximum y value:";
ui_en["Use small tiles"] = "Use small tiles";

ui_en["Set goal number for object"] = "Set goal number for object";
ui_en["dialog-goal-object-explain"] = "Click on the checkbox if you wish that number to be equal to the total number of such objects found in the world at the beginning.";
ui_en["Number of objects"] = "Number of objects";
ui_en["All such objects"] = "All such objects";

ui_en["Number of objects:"] = "Number of objects:";
ui_en["Maximum:"] = "Maximum:";
ui_en["Add object in the world"] = "Set number of object";
ui_en["ADD OBJECT EXPLAIN"] = "Choose zero to remove any existing such object at this location. If <code>Maximum</code> is set to a value greater than the <code>Number of objects</code>, a number of objects, between these two values, will be chosen randomly each time a program is run.";

ui_en["Unlimited:"] = "Unlimited:";
ui_en["Give object to robot"] = "Give object to robot";
ui_en["GIVE OBJECT EXPLAIN"] = "Choose a number of objects for the robot to carry. Click on the checkbox if you wish that number to be unlimited.";

ui_en["UPDATE BLOCKLY CONTENT"] = "This world has some default content for the blocks workspace. To replace the current blocks content, click on the button";
ui_en["UPDATE BLOCKLY BUTTON"] = "Replace existing blocks";
ui_en["Contents from World"] = "Contents from World";

ui_en["WARNING: Do not change this comment."] = "WARNING: Do not change this comment.";
ui_en["Library Code is below."] = "Library Code is below.";
ui_en["No solution can be saved when using REPL (Py)."] = "No solution can be saved when using REPL (Py).";
ui_en["No solution can be loaded when using REPL (Py)."] = "No solution can be loaded when using REPL (Py).";

ui_en["You are not allowed to use <code>done</code> in this world!"] = "You are not allowed to use <code>done()</code> in this world!";
ui_en["Execution ended before the <em>Post</em> code was executed."] = "Execution ended before the <em>Post</em> code was executed.";

ui_en["Difficulty level"] = "Difficulty level";

ui_en["Expected result"] = "Expected result";
ui_en["Differences highlighted"] = "Differences highlighted";
ui_en["Actual result"] = "Actual result";

ui_en["Cannot parse progress file."] = "Cannot parse progress file.";
ui_en["Cannot merge progress."] = "Cannot merge progress.";
ui_en["No solution found for this world."] = "No solution found for this world.";

ui_en["THINKING"] = "Thinking ...";

},{}],101:[function(require,module,exports){
// the following is used in a few places below
var mac_user_save_files_fr = ' <b>Utilisateurs Mac:</b> consultez <a href="https://github.com/aroberge/reeborg/blob/master/dev_tools/known_problems.md" target="_blank" rel="noopener">Problèmes connus</a>.';

exports.ui_fr = ui_fr = {};
exports.fr_to_en = fr_to_en = {};

ui_fr["fr-en"] = "Mode mixte: interface graphique en français; programmation en anglais.<br>" +
    "Mixed mode: User Interface in French; programming language in English.<br>";

ui_fr["SITE NAME"] = "Le monde de Reeborg";
ui_fr["WORLD INFO"] = "Description";
ui_fr["EDITOR VISIBLE"] = "Garder l'éditeur visible";

ui_fr["apple"] = "pomme";
fr_to_en["pomme"] = "apple";
ui_fr["banana"] = "banane";
fr_to_en["banane"] = "banana";
ui_fr["beeper"] = "sonnette";
fr_to_en["sonnette"] = "beeper";
ui_fr["box"] = "boîte";
fr_to_en["boîte"] = "box";
ui_fr["bridge"] = "pont";
fr_to_en["pont"] = "bridge";
ui_fr["carrot"] = "carotte";
fr_to_en["carotte"] = "carrot";
ui_fr["daisy"] = "marguerite";
fr_to_en["marguerite"] = "daisy";
ui_fr["dandelion"] = "pissenlit";
fr_to_en["pissenlit"] = "dandelion";
ui_fr["leaf"] = "feuille";
fr_to_en["feuille"] = "leaf";
ui_fr.square = "carré";
fr_to_en["carré"] = "square";
ui_fr.star = "étoile";
fr_to_en["étoile"] = "star";
ui_fr["strawberry"] = "fraise";
fr_to_en["fraise"] = "strawberry";
ui_fr.token = "jeton";
ui_fr["tokens are Reeborg's favourite thing."] = "Les jetons sont les objets favoris de Reeborg.";
fr_to_en["jeton"] = "token";
ui_fr.triangle = "triangle";
fr_to_en["triangle"] = "triangle";
ui_fr["tulip"] = "tulipe";
fr_to_en["tulipe"] = "tulip";
ui_fr["bucket"] = "seau d'eau";
fr_to_en["seau d'eau"] = "bucket";
ui_fr["bulb"] = "bulbe de tulipe";
fr_to_en["bulbe de tulipe"] = "bulb";
ui_fr["Tulip bulb: might grow into a nice tulip with some water from a bucket."] = "Bulbe de tulipe : pourrait devenir une belle tulipe avec un seau d'eau.";
ui_fr["bricks"] = "briques";
fr_to_en["briques"] = "bricks";

ui_fr["mud"] = "boue";
fr_to_en["boue"] = "mud";
ui_fr["soil"] = "sol";
fr_to_en["sol"] = "soil";
ui_fr["water"] = "eau";
fr_to_en["eau"] = "water";
ui_fr["grass"] = "gazon";
fr_to_en["gazon"] = "grass";
ui_fr["gravel"] = "gravier";
fr_to_en["gravier"] = "gravel";
ui_fr["ice"] = "glace";
fr_to_en["glace"] = "ice";
ui_fr["fire"] = "feu";
fr_to_en["feu"] = "fire";

ui_fr["infinite"] = "nombre infini";

ui_fr["fence_right"] = "clôture_droite";
fr_to_en["clôture_droite"] = "fence_right";
ui_fr["fence_left"] = "clôture_gauche";
fr_to_en["clôture_gauche"] = "fence_left";
ui_fr["fence_double"] = "clôture_double";
fr_to_en["clôture_double"] = "fence_double";
ui_fr["fence_vertical"] = "clôture_verticale";
fr_to_en["clôture_verticale"] = "fence_vertical";

ui_fr["Invalid Javascript code in Onload editor"] = "Code Javascript 'onload' non valide; veuillez contacter le créateur de ce monde.";
ui_fr["Invalid Python code in Onload editor"] = "Code Python 'onload' non valide; veuillez contacter le créateur de ce monde.";

ui_fr["Too many steps:"] = "Trop d'instructions: {max_steps}<br>Utilisez <code>max_nb_instructions(nb)</code> pour augmenter la limite.";
ui_fr["<li class='success'>Reeborg is at the correct x position.</li>"] = "<li class='success'>Reeborg est à la bonne coordonnée x.</li>";
ui_fr["<li class='failure'>Reeborg is at the wrong x position.</li>"] = "<li class='failure'>Reeborg est à la mauvaise coordonnée x.</li>";
ui_fr["<li class='success'>Reeborg is at the correct y position.</li>"] = "<li class='success'>Reeborg est à la bonne coordonnée y.</li>";
ui_fr["<li class='failure'>Reeborg is at the wrong y position.</li>"] = "<li class='failure'>Reeborg est à la mauvaise coordonnée y.</li>";
ui_fr["<li class='success'>All objects are at the correct location.</li>"] = "<li class='success'>Tous les objets sont aux bons endroits.</li>";
ui_fr["<li class='failure'>One or more objects are not at the correct location.</li>"] = "<li class='failure'>Un ou plusieurs objets ne sont pas aux bons endroits.</li>";
ui_fr["<li class='success'>All walls have been built correctly.</li>"] = "<li class='success'>Tous les murs ont été construits correctement.</li>";
ui_fr["<li class='failure'>One or more walls missing or built at wrong location.</li>"] = "<li class='failure'>Un ou plusieurs murs manquent ou sont aux mauvais endroits.</li>";
ui_fr["Last instruction completed!"] = "Dernière instruction complétée!";
ui_fr["<p class='center'>Instruction <code>done()</code> executed.</p>"] = "<p class='center'>Instruction <code>terminé()</code> exécutée.</p>";

ui_fr["Unknown object"] = "Objet inconnu: <code>{obj}</code>";
ui_fr["No object found here"] = "Pas d'objet <code>{obj}</code> trouvé ici !";
ui_fr["object"] = "objet";
ui_fr["I don't have any object to put down!"] = "Je n'ai pas d'objet <code>{obj}</code>!";
ui_fr["There is already a wall here!"] = "Il y a déjà un mur ici !";
ui_fr["There is no wall to remove!"] = "Il n'y a pas de mur à enlever d'ici !";
ui_fr["Ouch! I hit a wall!"] = "Ouch! J'ai frappé un mur!";
ui_fr["Done!"] = "Terminé !";
ui_fr["There is no position as a goal in this world!"] = "Aucune position n'a été spécifiée comme but dans ce monde!";
ui_fr["There is no goal in this world!"] = "Il n'y a pas de but dans ce monde!";
ui_fr["I carry too many different objects. I don't know which one to put down!"] = "Je transporte trop d'objets: je ne sais pas lequel déposer!";
ui_fr["Many objects are here; I do not know which one to take!"] = "Beaucoup d'objets différents sont ici; je ne sais pas lequel prendre!";

ui_fr.east = "est";
ui_fr.north = "nord";
ui_fr.west = "ouest";
ui_fr.south = "sud";
fr_to_en["est"] = "east";
fr_to_en["nord"] = "north";
fr_to_en["ouest"] = "west";
fr_to_en["sud"] = "south";
ui_fr["Unknown orientation for robot."] = "Orientation inconnue.";

ui_fr["Invalid position."] = "{pos} n'est pas une position valide.";
ui_fr["Invalid orientation."] = "'{orient}' est une orientation inconnue.";

ui_fr["World selected"] = "Monde {world} choisi";
ui_fr["Could not find world"] = "Je ne peux pas trouver {world}";
ui_fr["Object names"] = " biblio, jeton, étoile, triangle, carré, etc.";

ui_fr["Invalid world file."] = "Fichier monde invalide.";
ui_fr["Could not find link: "] = "Lien introuvable : ";

ui_fr["Click on world to move robot."] = "Cliquez sur le monde pour ajouter ou supprimer des positions de départ possibles pour Reeborg.";
ui_fr["Added robot."] = "Reeborg ajouté.";
ui_fr["Click on image to turn robot"] = "Cliquez sur l'image pour tourner Reeborg.";
ui_fr["Robot now has tokens."] = "Reeborg a {x_tokens} jetons.";
ui_fr["Click on world to add object."] = "Cliquez sur le monde pour ajouter des <code>{obj}</code>.";
ui_fr["Click on desired object below."] = "Cliquez sur l'objet désiré ci-dessous.";
ui_fr["Click on world to toggle walls."] = "Cliquez sur le monde pour ajouter/supprimer des murs.";
ui_fr["Click on world to set home position for robot."] = "Cliquez sur le monde pour ajouter ou supprimer une position finale possible du robot.";
ui_fr["Click on world to toggle additional walls to build."] = "Cliquez sur le monde pour ajouter/supprimer des murs à construire.";
ui_fr["Click on desired goal object below."] = "Cliquez sur l'objet désiré comme 'but'.";
ui_fr["Click on world to set number of goal objects."] = "Cliquez sur le monde pour fixer le nombre d'objet <code>{obj}</code> comme but.";
ui_fr["Enter number of tokens for robot to carry (use inf for infinite number)"] = "Entrez un nombre de jetons en possesion de Reeborg.";
ui_fr[" is not a valid value!"] = " n'est pas une valeur valide!";
ui_fr["Enter number of objects desired at that location."] = "Cliquez sur le monde pour fixer le nombre d'objet <code>{obj}</code> désiré à cet endroit.";
ui_fr["Objects found here:"] = "Objets trouvés ici:";
ui_fr["Description"] = "Description";
ui_fr["A robot located here carries no objects."] = "Un robot situé à (x, y) = ({x}, {y}) ne transporte aucun objet.";
ui_fr["A robot located here carries:"] = "Un robot situé à (x, y) = ({x}, {y}) transporte:";
ui_fr["random location"] = "une position choisie au hasard";
ui_fr["Enter number of objects to give to robot."] = "Quel nombre de <code>{obj}</code> voulez-vous donner au robot?";
ui_fr["Special information about this location:"] = "Information particulière au sujet de cet endroit:";
ui_fr["Click on world to toggle tile."] = "Cliquez sur le monde pour ajouter/supprimer l'image: <code>{obj}</code>.";
ui_fr["Click on desired tile below."] = "Cliquez sur l'image désirée ci-dessous ou sur le sélecteur de couleur.";

ui_fr["A wall must be built east of this location."] = "Un mur doit être construit à l'est de cet endroit.";
ui_fr["A wall must be built north of this location."] = "Un mur doit être construit au nord de cet endroit.";
ui_fr["A wall must be built west of this location."] = "Un mur doit être construit à l'ouest de cet endroit.";
ui_fr["A wall must be built south of this location."] = "Un mur doit être construit au sud de cet endroit.";
ui_fr["The final required position of the robot will be chosen at random."] = "La position finale requise pour Reeborg sera choisie au hasard.";
ui_fr["The final position of the robot must be (x, y) = "] = "La position finale de Reeborg doit être (x, y) = ";
ui_fr["Click on world to fill with given tile."] = "Cliquez sur le monde pour remplir avec cet objet.";
ui_fr["Click on desired object below."] = "Cliquez sur l'objet désiré.";
ui_fr["Enter url of image to use as background."] = "Fournir l'adresse (URL) de l'image à utiliser.";
ui_fr["Replace editor content"] = "Voulez-vous remplacer le contenu du code de votre éditeur par celui défini par le créateur du monde?";
ui_fr["Replace library content"] = "Voulez-vous remplacer le contenu du code de votre biliothèque par celui défini par le créateur du monde?";
ui_fr["colour"] = "couleur";

ui_fr["Name already exist; confirm that you want to replace its content."] = "Ce nom existe déjà; confirmez que vous voulez remplacer son contenu.";
ui_fr["No such world!"] = "Ce monde n'existe pas !";
ui_fr["Enter world name to save"] = "Quel nom doit-on utiliser pour ce monde? Noms utilisés:";
ui_fr["Enter world name to delete"] = "Écrivez le nom du monde à supprimer; mondes existant:";
ui_fr["Goal to achieve:"] = "Résultat désiré :";
ui_fr["Delete "] = "Effacer ";

ui_fr["Error found at or near line {number}."] = "Erreur trouvée à la ligne {number} ou tout près.";
ui_fr["<br>Perhaps a missing colon is the cause."] = "<br>Il manque peut-être deux points ':'.";
ui_fr["<br>Perhaps you forgot to add parentheses ()."] = "<br>Il manque peut-être des parenthèses ().";
ui_fr["<br>Perhaps you misspelled a word or forgot to define a function or a variable."] = "<br>Il est possible qu'un mot soit mal épelé ou qu'une définition de fonction ou de variable manque.";
ui_fr["I cannot help you with this problem."] = "Je ne peux pas vous aider avec ce problème.";

ui_fr["I'm stuck in mud."] = "Je suis immobilisé dans la boue.";
ui_fr["Mud: Reeborg <b>cannot</b> detect this and will get stuck if it moves to this location."] = "Boue: Reeborg <b>ne peut pas</b> détecter ceci et y sera immobilisé s'il va à cet endroit.";
ui_fr["Soil: usually safe, but looks identical to mud."] = "Sol: habituellement sans problèmes, mais ressemble visuellement à la boue.";
ui_fr["I'm slipping on ice!"] = "Je glisse sur la glace!";
ui_fr["Ice: Reeborg <b>cannot</b> detect this and <em>might</em> slide and move to the next location if it moves to this location."] = "Glace: Reeborg <b>ne peut pas</b> détecter ceci et pourrait glisser à la prochaine case.";
ui_fr["Grass: usually safe."] = "Gazon: habituellement sans problèmes.";
ui_fr["Gravel: usually safe."] = "Gravier: habituellement sans problèmes.";
ui_fr["I'm in water!"] = "Je suis dans l'eau!";
ui_fr["Water: Reeborg <b>can</b> detect this but will get damaged if it moves to this location."] = "Eau: Reeborg <b>peut</b> détecter ceci mais il va être endommagé s'il s'y déplace.";
ui_fr["green home tile: Reeborg <b>can</b> detect this tile using at_goal()."] = "tuile verte: Reeborg <b>peut</b> détecter ceci avec au_but().";
ui_fr["Crash!"] = "Crash!";
ui_fr["brick wall: Reeborg <b>can</b> detect this but will hurt himself if he attemps to move through it."] = "Mur de brique: Reeborg <b>peut</b> détecter ceci mais il se fera mal s'il essaie de passer au travers.";
ui_fr["I hit a fence!"] = "J'ai frappé une clôture!";
ui_fr["Fence: Reeborg <b>can</b> detect this but will be stopped by it."] = "Clôture: Reeborg <b>peut</b> détecter ceci mais il ne peut pas passer au travers.";
ui_fr["Bridge:Reeborg <b>can</b> detect this and will know that it allows safe passage over water."] = "Pont: Reeborg <b>peut</b> détecter ceci et sait que cela lui permettra de traverser l'eau en sureté.";
ui_fr["My joints are melting!"] = "Mes articulations fondent !";
ui_fr["A bucket full of water"] = "Un seau rempli d'eau.";


fr_to_en["pont"] = "bridge";
ui_fr["Something is blocking the way!"] = "Quelque chose bloque le chemin!";
ui_fr["Reeborg <b>can</b> detect this tile using at_goal()."] = "Reeborg <b>peut</b> détecter ceci avec au_but().";
ui_fr["green home tile:"] = "tuile verte pour l'arrivée :";
ui_fr["home:"] = "la maison :";
ui_fr["racing flag:"] = "drapeau d'arrivée :";
ui_fr["house:"] = "maison :";

ui_fr["Local variables"] = "Variables locales";
ui_fr["Global variables"] = "Variables globales";
ui_fr["Watched expressions"] = "Watched expressions";

ui_fr["move forward"] = "avance";
ui_fr["turn left"] = "tourne à gauche";
ui_fr["take object"] = "prend l'objet";
ui_fr["put object"] = "dépose l'objet";
ui_fr["Pause the program's execution."] = "Pause l'exécution du programme.";
ui_fr["Build a wall in front of the robot."] = "Construit un mur devant le robot.";
ui_fr["End the program's execution."] = "Termine l'exécution du programme.";
ui_fr["True if a wall is blocking the way."] = "Vrai si un mur bloque le chemin.";
ui_fr["True if nothing is blocking the way."] = "Vrai si rien ne bloque le chemin.";
ui_fr["True if desired destination."] = "Vrai si c'est la destination désirée.";
ui_fr["True if robot carries at least one object."] = "Vrai si le robot transporte au moins un objet.";
ui_fr["True if there is at least one object here."] = "Vrai s'il y a au moins un objet ici.";
ui_fr["True if robot is facing North."] = "Vrai se le robot est face au nord.";
ui_fr["Delay between actions; default is 300 ms."] = "Délai entre les actions; le défaut est de 300 ms.";

ui_fr["Save world in browser"] = "Sauvegarder le monde dans le navigateur";
ui_fr["Save permalink"] = "Sauvegarder le permalien";
ui_fr["Save permalink explanation"] = "Sauvegarde une copie du permalien dans un fichier.";
ui_fr["LOAD BLOCKLY"] = "Ouvrir un programme (blocs)";
ui_fr["LOAD BLOCKLY EXPLAIN"] = "Ouvre un fichier local et remplace les blocs (Blockly) par le contenu du fichier.";
ui_fr["LOAD EDITOR"] = "Ouvrir un programme";
ui_fr["LOAD EDITOR EXPLAIN"] = "Ouvre un fichier local et remplace le contenu de l'éditeur par le contenu du fichier.";
ui_fr["LOAD LIBRARY"] = "Importer une bibliothèque";
ui_fr["LOAD LIBRARY EXPLAIN"] = "Ouvre un fichier contenant un programme et remplace le contenu de la bibliothèque par le contenu du fichier choisi.";
ui_fr["LOAD WORLD"] = "Ouvrir un monde";
ui_fr["LOAD WORLD EXPLAIN"] = "Ouvre un monde à partir d'un fichier.";
ui_fr["SAVE BLOCKLY"] = "Sauvegarder les blocs.";
ui_fr["SAVE BLOCKLY EXPLAIN"] = "Sauvegarde le programme (blocs)." + mac_user_save_files_fr;
ui_fr["SAVE EDITOR"] = "Sauvegarder le programme";
ui_fr["SAVE EDITOR EXPLAIN"] = "Sauvegarde le contenu de l'éditeur dans un fichier." + mac_user_save_files_fr;
ui_fr["SAVE LIBRARY"] = "Sauvegarder la bibliothèque";
ui_fr["SAVE LIBRARY EXPLAIN"] = "Sauvegarde le contenu de la bibliothèque dans un fichier." + mac_user_save_files_fr;
ui_fr["SAVE WORLD"] = "Sauvegarder le monde";
ui_fr["SAVE WORLD EXPLAIN"] = "Sauvegarde le monde dans un fichier (format json) sur votre ordinateur." + mac_user_save_files_fr;


ui_fr["PROGRESS SECTION TITLE"] = "Le résumé des tâches";
ui_fr["PROGRESS EXPLAIN"] = "Les tâches résolues sont indiqués par " + RUR.CHECKMARK +
    "dans le sélecteur de monde et l'information est sauvegardée dans votre navigateur. " +
    "Si vous utilisez un navigateur différent, les tâches que vous avez résolues ailleurs n'apparaîtront pas. " +
    "Si vous cliquez sur le bouton sauvegarder, un fichier nommé progress.json sera sauvegardé avec l'information requise. " +
    "vous pouvez importer ce fichier dans un autre navigateur pour mettre vos tâches à jour dans ce dernier.";
ui_fr["SAVE PROGRESS"] = "Sauvegarder";
ui_fr["IMPORT PROGRESS"] = "Importer";
ui_fr["RETRIEVE SOLUTION"] = "Récupérer la solution";
ui_fr["RETRIEVE SOLUTION EXPLAIN"] = "Si une solution (blocs, ou code et possiblement code dans la biblio) pour ce monde et pour le mode de programmation courant a été sauvegardée dans le navigateur, elle sera récupérée et remplacera le programme présent.";

ui_fr["ADD CONTENT TO WORLD"] = "Ajouter au monde le contenu des items indiqués ci-dessous.";
ui_fr["ADD BLOCKLY TEXT"] = "Blocs de code";
ui_fr["ADD EDITOR TEXT"] = "Code dans l'éditeur";
ui_fr["ADD LIBRARY TEXT"] = "Biblio";
ui_fr["ADD PRE TEXT"] = "Pre";
ui_fr["ADD POST TEXT"] = "Post";
ui_fr["ADD DESCRIPTION TEXT"] = "Description";
ui_fr["ADD ONLOAD TEXT"] = "Onload";

ui_fr["KEYBOARD BUTTON"] = "Clavier de Reeborg";
ui_fr["ADDITIONAL OPTIONS"] = "Autres options";

ui_fr["BASIC COMMANDS"] = "Commandes";
ui_fr["DEFINING"] = "Définitions";
ui_fr["LOOPS"] = "Boucles";
ui_fr["DECISIONS"] = "Décisions";
ui_fr["CONDITIONS"] = "Conditions";
ui_fr["USING VARIABLES"] = "Utiliser des variables";
ui_fr["COMMANDS"] = "Commandes";
ui_fr["OTHER"] = "Autres";
ui_fr["OBJECTS"] = "Objets";

ui_fr["Python Code"] = "Code Python";
ui_fr["Javascript Code"] = "Code Javascript";
ui_fr["LIBRARY"] = "biblio";
ui_fr["EXTRA"] = "extra";
ui_fr["PRE"] = "Pre";
ui_fr["POST"] = "Post";
ui_fr["DESCRIPTION"] = "Desc.";
ui_fr["ONLOAD"] = "Onload";

ui_fr["HIGHLIGHT IMPOSSIBLE"] = "Un problème non-identifié avec votre code a fait en sorte que j'ai arrêté le surlignage du code dans l'éditeur.";
ui_fr["COMMAND RESULT"] = "Sélectionnez l'action à performer dans le menu ci-dessous.";

ui_fr["DELETE WORLD TEXT"] = "En cliquant sur un bouton, éliminez un monde connu de la mémoire de votre nagivageur.";
ui_fr["PYTHON ONLY"] = "Python seulement";
ui_fr["COLLABORATION"] = "Collaboration";
ui_fr["TOGETHERJS EXPLAIN"] = "Outil qui permet la collaboration à distance en utilisant l'outil TogetherJS de Mozilla (interface en anglais seulement). Ne fonctionne pas avec Blockly.";
ui_fr["WORLD CREATION TITLE"] = "Monde : édition, création, ...";
ui_fr["EDIT WORLD"] = "Édition du monde";
ui_fr["EDIT WORLD EXPLAIN"] = "Vous pouvez créer vos propres mondes en modifiant un monde existant.";
ui_fr["PROGRAM IN EDITOR"] = "Programme dans l'éditeur";
ui_fr["PROGRAM IN BLOCKLY WORKSPACE"] = "Programme de blocs";
ui_fr["CONTACT"] = "Courriel :";
ui_fr["ISSUES"] = "Rapports de bogues, suggestions, autres problèmes, etc. (en anglais ou en français seulement).";
ui_fr["FORUM"] = "Forum de discussions (en anglais ou en français seulement).";
ui_fr["HELP"] = "Aide";
ui_fr["DOCUMENTATION"] = '<a href="http://reeborg.ca/docs/fr" target="_blank" rel="noopener">Documentation</a>';
ui_fr["PYTHON HELP"] = "En utilisant Python, executez un programme avec <code>help()</code> pour obtenir une liste de commandes ou <code>help(avance)</code> pour obtenir de l'aide sur la fonction <code>avance()</code>, etc.";
ui_fr["KEYBOARD HELP"] = "Cliquez sur le clavier de Reeborg keyboard pour voir une liste des commandes, la syntaxe Python, etc.";

ui_fr["WORLD EDITOR"] = "Éditeur de monde";
ui_fr["m-east"] = "Est";
ui_fr["m-north"] = "Nord";
ui_fr["m-west"] = "Ouest";
ui_fr["m-south"] = "Sud";
ui_fr["m-random"] = "Aléatoire";
ui_fr["m-dimensions"] = "Taille du monde";
ui_fr["m-add"] = "Ajouter";
ui_fr["m-add-robot"] = "Ajouter Reeborg";
ui_fr["m-robot"] = "Robot";
ui_fr["m-position"] = "Position(s)";
ui_fr["m-turn"] = "Orientation";
ui_fr["m-objects"] = "Objets";
ui_fr["m-walls"] = "Murs";
ui_fr["m-objects2"] = "Objets";
ui_fr["m-tiles"] = "Tuiles";
ui_fr["m-fill"] = "Remplir";
ui_fr["m-solid"] = "Obstacles";
ui_fr["m-decorative"] = "Objets décoratifs";
ui_fr["m-background"] = "Image de fond";
ui_fr["m-goal"] = "But";
ui_fr["mg-robot"] = "Robot";
ui_fr["mg-walls"] = "Murs";
ui_fr["mg-objects"] = "Objets";

ui_fr["Reeborg says: I'm done!"] = "Reeborg dit : J'ai fini !";
ui_fr["Reeborg writes:"] = "Reeborg écrit :";
ui_fr["Reeborg shouts: Something is wrong!"] = "Reeborg crie: Quelque chose ne va pas !";
ui_fr["Reeborg explores some Javascript code"] = "Reeborg explore le code Javascript";
ui_fr["Reeborg states:"] = "Reeborg informe :";
ui_fr["Reeborg watches some variables!"] = "Reeborg observe des variables !";
ui_fr["Click on the world to get some additional information."] = "Cliquez sur le monde pour obtenir de l'information supplémentaire.";

ui_fr["Reeborg's basic keyboard"] = "Le clavier spécial de Reeborg";
ui_fr["kbd-command-btn"] = "Commandes";
ui_fr["kbd-condition-btn"] = "Conditions";
ui_fr["kbd-python-btn"] = "Python";
ui_fr["kbd-py-console-btn"] = "Python";
ui_fr["kbd-javascript-btn"] = "Javascript";
ui_fr["kbd-objects-btn"] = "Objets";
ui_fr["kbd-special-btn"] = "Spécial";

ui_fr["UNDO"] = "RENVERSER";
ui_fr["REDO"] = "REFAIRE";
ui_fr["tab"] = "TAB";
ui_fr["shift-tab"] = "Maj-TAB";
ui_fr["enter"] = "\u23CE";
ui_fr["<code>repeat</code> is not a true Python keyword."] = "<code>repeat</code> n'est pas un véritable mot-clé Python.";

ui_fr["Colour:"] = "Couleur :";
ui_fr["Enter a colour"] = "Spécifiez une couleur";

ui_fr["Background image"] = "Image de fond";

ui_fr["NAME:"] = "Nom :";
ui_fr["Save world in browser"] = "Mémoriser une copie du monde";


ui_fr["Set the world's dimensions"] = "Dimensions du monde";
ui_fr["set-dimensions-explain"] = "Vous pouvez changer les dimensions (hauteur et largeur) du monde. Rappelez-vous que les mondes très grands pourraient être difficile à visualiser sur des écrans plus petits.";
ui_fr["Maximum x value:"] = "Valeur maximale pour 'x'";
ui_fr["Maximum y value:"] = "Valeur maximale pour 'y'";
ui_fr["Use small tiles"] = "Utilisez une petite grille";

ui_fr["Set goal number for object"] = "Nombre d'objets désirés";
ui_fr["dialog-goal-object-explain"] = "Cliquez sur la case à cocher si vous désirez que le nombre d'objet soit égal au nombre total d'objet de ce genre présent dans le monde au tout début.";
ui_fr["Number of objects"] = "Nombre d'objets";
ui_fr["All such objects"] = "Tous les objets de ce genre";

ui_fr["Number of objects:"] = "Nombre d'objets :";
ui_fr["Maximum:"] = "Maximum :";
ui_fr["Add object in the world"] = "Modifier le nombre d'objets";
ui_fr["ADD OBJECT EXPLAIN"] = "Choisissez la valeur zéro pour ne pas avoir un tel objet à cet endroit. Si <code>Maximum</code> a une valeur supérieure à <code>Nombre d'objets</code> alors un nombre aléatoire d'objets, entre ces deux valeurs, sera choisi au tout début de l'exécution d'un programme.";

ui_fr["Unlimited:"] = "Nombre illimité ";
ui_fr["Give object to robot"] = "Donner des objets à Reeborg";
ui_fr["GIVE OBJECT EXPLAIN"] = "Choisissez un nombre d'objects que Reeborg aura en sa possession au début du programme. Cliquez sur la case à cocher si vous voulez un nombre illimité.";

ui_fr["UPDATE BLOCKLY CONTENT"] = "Ce monde inclus des blocs différents de ceux qui s'y trouvent présentement. Pour remplacer les blocs présents par ceux définis par le monde, cliquez sur le bouton.";
ui_fr["UPDATE BLOCKLY BUTTON"] = "Remplacer les blocs";
ui_fr["Contents from World"] = "Remplacement de contenus";

ui_fr["WARNING: Do not change this comment."] = "ATTENTION: Ne modifiez pas ce commentaire.";
ui_fr["Library Code is below."] = "Le code de la biblio est ci-dessous.";
ui_fr["No solution can be saved when using REPL (Py)."] = "Aucune solution ne peut être sauvegardée dans le mode REPL (Py).";
ui_fr["No solution can be loaded when using REPL (Py)."] = "Aucune solution ne peut être chargée dans le mode REPL (Py).";

ui_fr["You are not allowed to use <code>done</code> in this world!"] = "Il n'est pas permis d'utiliser <code>termine()</code> dans ce monde !";
ui_fr["Execution ended before the <em>Post</em> code was executed."] = "L'exécution du programme a terminé avant que le code <em>Post</em> ne soit interprété.";

ui_fr["Difficulty level"] = "Niveau de difficulté";

ui_fr["Expected result"] = "Résultat attendu";
ui_fr["Differences highlighted"] = "Différences observées";
ui_fr["Actual result"] = "Résultat observé";

ui_fr["Cannot parse progress file."] = "Impossible d'extraire les données du fichier.";
ui_fr["Cannot merge progress."] = "Impossible d'incorporer les données.";
ui_fr["No solution found for this world."] = "Pas de solution trouvée pour ce monde.";

ui_fr["THINKING"] = "Je pense ...";

},{}],102:[function(require,module,exports){
// the following is used in a few places below
var mac_user_save_files_ko = ' <b>Mac users:</b> please see <a href="https://github.com/aroberge/reeborg/blob/master/dev_tools/known_problems.md" target="_blank" rel="noopener">Known problems</a>.';

exports.ui_ko = ui_ko = {};
exports.ko_to_en = ko_to_en = {};

ui_ko["ko-en"] = "혼용된 모드: 사용자 환경은 한국어로 번역되어 있지만, 프로그래밍 언어는 영어로 이루어져 있습니다. <br>" +
 "Mixed mode: User Interface in Korean; programming language in English.<br>";

ui_ko["SITE NAME"] = "리보그의 세상";
ui_ko["WORLD INFO"] = "월드 정보";
ui_ko["EDITOR VISIBLE"] = "에디터 유지하기";


ui_ko["apple"] = "사과";
ko_to_en["사과"] = "apple";
ui_ko["banana"] = "바나나";
ko_to_en["바나나"] = "banana";
ui_ko["beeper"] = "beeper";
ko_to_en["beeper"] = "beeper";
ui_ko["box"] = "상자";
ko_to_en["상자"] = "box";
ui_ko["bridge"] = "다리";
ko_to_en["다리"] = "bridge";
ui_ko["carrot"] = "당근";
ko_to_en["당근"] = "carrot";
ui_ko["daisy"] = "데이지 꽃";
ko_to_en["데이지 꽃"] = "daisy";
ui_ko["dandelion"] = "민들레";
ko_to_en["민들레"] = "dandelion";
ui_ko["leaf"] = "잎";
ko_to_en["잎"] = "leaf";
ui_ko.square = "사각형";
ko_to_en["사각형"] = "square";
ui_ko.star = "별";
ko_to_en["별"] = "star";
ui_ko["strawberry"] = "딸기";
ko_to_en["딸기"] = "strawberry";
ui_ko.token = "토큰";
ui_ko["tokens are Reeborg's favourite thing."] = "토큰 are Reeborg's favourite thing.";
ko_to_en["토큰"] = "token";
ui_ko.triangle = "삼각형";
ko_to_en["삼각형"] = "triangle";
ui_ko["tulip"] = "튤립";
ko_to_en["튤립"] = "tulip";
ui_ko["bucket"] = "물통"; // bucket of water; translated using google
ko_to_en["물통"] = "bucket";

ui_ko["bricks"] = "bricks";  // translation needed
ko_to_en["bricks"] = "bricks";

ui_ko["mud"] = "진흙";
ko_to_en["진흙"] = "mud";
ui_ko["soil"] = "흙"; // translated using google
ko_to_en["흙"] = "soil";
ui_ko["water"] = "물";
ko_to_en["물"] = "water";
ui_ko["grass"] = "잔디";
ko_to_en["잔디"] = "grass";
ui_ko["gravel"] = "자갈";
ko_to_en["자갈"] = "gravel";
ui_ko["ice"] = "얼음";
ko_to_en["얼음"] = "ice";
ui_ko["fire"] = "불";
ko_to_en["불"] = "fire"; // translated using google
// the following need translations; I do not trust google based
// on its recommendation for the French translation.
ui_ko["bulb"] = "tulip bulb";
ko_to_en["tulip bulb"] = "bulb";
ui_ko["Tulip bulb: might grow into a nice tulip with some water from a bucket."] = "Tulip bulb: might grow into a nice tulip with some water from a bucket.";

ui_ko["infinite"] = "infinite number";


// more translations needed
ui_ko["fence_right"] = "울타리 right";
ko_to_en["울타리 right"] = "fence_right";
ui_ko["fence_left"] = "울타리";
ko_to_en["울타리 left"] = "fence_left";
ui_ko["fence_double"] = "울타리";
ko_to_en["울타리 double"] = "fence_double";
ui_ko["fence_vertical"] = "울타리";
ko_to_en["울타리 vertical"] = "fence_vertical";

ui_ko["Invalid Javascript code in Onload editor"] = "유효하지 않은 자바스크립트 onload 코드입니다; 이 월드의 제작자에게 연락하세요.";
ui_ko["Invalid Python code in Onload editor"] = "유효하지 않은 파이썬 onload 코드입니다; 이 월드의 제작자에게 연락하세요.";

ui_ko["Too many steps:"] = "단계가 너무 많습니다: {max_steps}<br>한계를 높이려면 <code>set_max_nb_steps(nb)</code>를 사용하십시오.";
ui_ko["<li class='success'>Reeborg is at the correct x position.</li>"] = "<li class='success'>리보그는 올바른 x 위치에 있습니다. </li>";
ui_ko["<li class='failure'>Reeborg is at the wrong x position.</li>"] = "<li class='failure'>리보그는 잘못된 x 위치에 있습니다. </li>";
ui_ko["<li class='success'>Reeborg is at the correct y position.</li>"] = "<li class='success'>리보그는 올바른 y 위치에 있습니다. </li>";
ui_ko["<li class='failure'>Reeborg is at the wrong y position.</li>"] = "<li class='failure'>리보그는 잘못된 y 위치에 있습니다. </li>";
ui_ko["<li class='success'>All objects are at the correct location.</li>"] = "<li class='success'>모든 객체가 올바른 위치에 있습니다. </li>";
ui_ko["<li class='failure'>One or more objects are not at the correct location.</li>"] = "<li class='failure'>하나 이상의 객체가 올바른 위치에 있지 않습니다.</li>";
ui_ko["<li class='success'>All walls have been built correctly.</li>"] = "<li class='success'>모든 벽은 제대로 지어지고 있습니다. </li>";
ui_ko["<li class='failure'>One or more walls missing or built at wrong location.</li>"] = "<li class='failure'>하나 이상의 벽이 빠지거나 잘못된 위치에서 건설됐습니다/li>";
ui_ko["Last instruction completed!"] = "마지막 명령이 완료됐습니다!";
ui_ko["<p class='center'>Instruction <code>done()</code> executed.</p>"] = "<p class='center'>명령 <code>done()</code> 실행.</p>";

ui_ko["Unknown object"] = "알 수 없는 객체: <code>{obj}</code>";
ui_ko["No object found here"] = "여기서 <code>{obj}</code> 를 찾을 수 없어요!";
ui_ko["object"] = "객체";
ui_ko["I don't have any object to put down!"] = "나는 집어넣을 <code>{obj}</code> 가 없어요!";
ui_ko["There is already a wall here!"] = "벽이 여기에 이미 있어요!";
ui_ko["There is no wall to remove!"] = "There is no wall to remove!";
ui_ko["Ouch! I hit a wall!"] = "아으, 아파요! 저는 벽을 부딪혔어요!";
ui_ko["Done!"] = "끝!";
ui_ko["There is no position as a goal in this world!"] = "위치에 대한 목표가 없어요!";
ui_ko["There is no goal in this world!"] = "이 월드는 목표가 없어요.";
ui_ko["I carry too many different objects. I don't know which one to put down!"] = "저는 너무 많은 다른 객체들을 싣고 있어요. 저는 이중 어떤 걸 내려놓을지 모르겠어요!";
ui_ko["Many objects are here; I do not know which one to take!"] = "많은 객체가 여기에 있어요; 저는 그 중 어떤 걸 가져갈지 모르겠어요!";

ui_ko.east = "동쪽";
ui_ko.north = "북쪽";
ui_ko.west = "서쪽";
ui_ko.south = "남쪽";
ko_to_en["동쪽"] = "east";
ko_to_en["북쪽"] = "north";
ko_to_en["서쪽"] = "west";
ko_to_en["남쪽"] = "south";
ui_ko["Unknown orientation for robot."] = "로봇의 방향을 알 수 없습니다.";

ui_ko["Invalid position."] = "{pos} is an invalid position.";
ui_ko["Invalid orientation."] = "'{orient}' is an unknown orientation.";

ui_ko["World selected"] = "월드 {world} 가 선택되었습니다";
ui_ko["Could not find world"] = "월드를 찾을 수 없습니다. {world}";
ui_ko["Object names"] = " 라이브러리, 토큰, 별, 삼각형, 사각형, 등.";

ui_ko["Invalid world file."] = "유효하지 않은 월드 파일.";
ui_ko["Could not find link: "] = "링크를 찾을 수 없습니다: ";

ui_ko["Click on world to move robot."] = "월드를 클릭해서 추가하거나 시작 가능한 리보그 위치를 제거합니다.";
ui_ko["Added robot."] = "리보그 추가됨.";
ui_ko["Click on image to turn robot"] = "리보그를 회전하기 위해 이미지를 클릭하세요.";
ui_ko["Robot now has tokens."] = "이제 리보그는 {x_tokens} 토근을 가지고 있습니다.";
ui_ko["Click on world to add object."] = "<code>{obj}</code> 의 수를 설정하기 위해 월드를 클릭하세요.";
ui_ko["Click on desired object below."] = "아래에서 원하는 개체를 클릭합니다.";
ui_ko["Click on world to toggle walls."] = "벽을 달기 위해 월드를 클락하세요.";
ui_ko["Click on world to set home position for robot."] = "로봇의 최종위치를 정하기 위해 월드를 클릭하세요.";
ui_ko["Click on world to toggle additional walls to build."] = "추가로 벽을 달기 위해 월드를 클릭하세요.";
ui_ko["Click on desired goal object below."] = "아래에서 원하는 목표 객체를 클릭하세요.";
ui_ko["Click on world to set number of goal objects."] = "<code>{obj}</code>의 목표를 설정하기 위해 객체를 클릭하세요.";
ui_ko["Enter number of tokens for robot to carry (use inf for infinite number)"] = "싣고 갈 토큰의 수를 입력하세요.";
ui_ko[" is not a valid value!"] = " 유효하지 않은 값입니다!";
ui_ko["Enter number of objects desired at that location."] = "<code>{obj}</code> 의 수를 설정하기 위해 월드를 클릭하세요.";
ui_ko["Objects found here:"] = "객체를 여기서 찾음:";
ui_ko["Description"] = "설명";
ui_ko["A robot located here carries no objects."] = "로봇은 (x, y) = ({x}, {y})에 위치해 있고 싣고 있는 객체는 없습니다.";
ui_ko["Goal to achieve:"] = "목표 달성:";
ui_ko["A robot located here carries:"] = "로봇은 (x, y) = ({x}, {y})에 위치해 있습니다. 싣고 있는 객체:";
ui_ko["random location"] = "무작위 위치";
ui_ko["Enter number of objects to give to robot."] = "로봇에게 주기 위해 <code>{obj}</code> 의 수를 입력하세요..";
ui_ko["Special information about this location:"] = "이 위치에 대한 특별한 정보:";
ui_ko["Click on world to toggle tile."] = "<code>{obj}</code> 타일을 달기 위해 월드를 클릭하세요.";
ui_ko["Click on desired tile below."] = "아래에서 원하는 타일을 클릭합니다. (or color selector)";

ui_ko["A wall must be built east of this location."] = "벽은 이 위치의 동쪽에 지어져야 합니다.";
ui_ko["A wall must be built north of this location."] = "벽은 이 위치의 북쪽에 지어져야 합니다.";
ui_ko["A wall must be built west of this location."] = "벽은 이 위치의 서쪽에 지어져야 합니다.";
ui_ko["A wall must be built south of this location."] = "벽은 이 위치의 남쪽에 지어져야 합니다.";
ui_ko["The final required position of the robot will be chosen at random."] = "로봇의 마지막으로 필요한 위치가 무작위로 선택됩니다.";
ui_ko["The final position of the robot must be (x, y) = "] = "로봇의 최종위치는 반드시 (x, y) = ";
ui_ko["Click on world to fill with given tile."] = "주어진 타일을 채우기 위해 월드를 클릭합니다.";
ui_ko["Click on desired object below."] = "아래에서 원하는 객체를 클릭합니다.";
ui_ko["Enter url of image to use as background."] = "배경화면으로 쓰일 이미지나 이미지 주소를 입력해 주세요.";
ui_ko["Replace editor content"] = "당신의 이 월드의 제작자에 의해 제공되는 에디터 코드를 대체 하고 싶나요?";
ui_ko["Replace library content"] = "당신은 이 월드의 제작자에 의해 제공되는 라이브러리 코드를 대체 하고 싶나요?";
ui_ko["colour"] = "색";

ui_ko["Name already exist; confirm that you want to replace its content."] = "이름이 이미 존재합니다; 당신이 내용을 교체하고 싶으면 확인합니다.";
ui_ko["No such world!"] = "월드가 존재하지 않습니다!";
ui_ko["Enter world name to save"] = "월드를 저장하기 위해 월드 이름을 입력해주세요; 사용될 이름: ";
ui_ko["Enter world name to delete"] = "월드를 삭제하기 위해 월드 이름을 입력 해주세요; 기존 세계: ";
ui_ko["Delete "] = "삭제 ";

ui_ko["Error found at or near line {number}."] = "오류를 발견했습니다 혹은 라인 근처에서 발견됬습니다. : {number}.";
ui_ko["<br>Perhaps a missing colon is the cause."] = "<br>아마도 콜론(:)을 놓쳐서 문제가 발생했을 겁니다.";
ui_ko["<br>Perhaps you forgot to add parentheses ()."] = "<br>아마도 당신은 괄호를 추가하는 것을 잊어버렸을 겁니다 ().";
ui_ko["<br>Perhaps you misspelled a word or forgot to define a function or a variable."] = "<br>아마도 당신은 단어의 철자나 함수를 정의하는것을 잊었거나 변수를 까먹었을 겁니다.";
ui_ko["I cannot help you with this problem."] = "I cannot help you with this problem.";

ui_ko["I'm stuck in mud."] = "난 진흙에 걸렸어요.";
ui_ko["Mud: Reeborg <b>cannot</b> detect this and will get stuck if it moves to this location."] = "진흙: 리보그는 이것을 탐지 <b>하지 못하고<b> 이 위치로 이동하게 되면 걸리게 됩니다.";
ui_ko["Soil: usually safe, but looks identical to mud."] = "Soil: usually safe, but looks identical to mud.";
ui_ko["I'm slipping on ice!"] = "저는 얼음에 미끄러지고 있어요!";
ui_ko["Ice: Reeborg <b>cannot</b> detect this and <em>might</em> slide and move to the next location if it moves to this location."] = "얼음: 리보그는 이것을 탐지 <b>하지 못하고</b> 만약 이 위치로 이동하게 되면 미끄러지고 다음 위치로 이동하게 됩니다.";
ui_ko["Grass: usually safe."] = "잔디: 보통 안전함.";
ui_ko["Gravel: usually safe."] = "자갈: 보통 안전함.";
ui_ko["I'm in water!"] = "난 물 속에 있어요!";
ui_ko["Water: Reeborg <b>can</b> detect this but will get damaged if it moves to this location."] = "물: 리보그는 이것을 탐지 할 수 <b>있지만</b> 이 위치로 이동하는 경우 상처를 입히게 됩니다.";
ui_ko["green home tile: Reeborg <b>can</b> detect this tile using at_goal()."] = "green home tile: 리보그는 at_goal 를 사용하면 이 타일을 감지 할 수 <b>있어요<b>.";
ui_ko["Crash!"] = "Crash!";
ui_ko["brick wall: Reeborg <b>can</b> detect this but will hurt himself if he attemps to move through it."] = "벽돌 벽: 리보그는 이것을 탐지 할 수 있지만 만약 벽돌 벽으로 간다면 자신을 다치게 합니다.";
ui_ko["I hit a fence!"] = "I hit a fence!";
ui_ko["Fence: Reeborg <b>can</b> detect this but will be stopped by it."] = "울타리: 리보그는 이것을  <b>can</b> 탐지 할 수 있지만 그것에 의해 중지됩니다.";
ui_ko["Bridge:Reeborg <b>can</b> detect this and will know that it allows safe passage over water."] = "리보그는 이것을 탐지 할 수 <b>있으며</b> 이 물 위에서 안전한 통행을 허용하는것을 알게 될 것입니다.";
ui_ko["My joints are melting!"] = "내 관절이 녹고있어."; // translated using google
ui_ko["A bucket full of water."] = "A bucket full of water.";

ui_ko["Something is blocking the way!"] = "뭔가가 길을 막고 있어요!";
ui_ko["Reeborg <b>can</b> detect this tile using at_goal()."] = "리보그는 at_goal() 를 사용해서 탐지 할 수 <b>있어요</b>.";
ui_ko["green home tile:"] = "초록색 홈 타일:";
ui_ko["home:"] = "홈:";
ui_ko["racing flag:"] = "레이싱 깃발:";
ui_ko["house:"] = "집:";

ui_ko["Local variables"] = "지역 변수";
ui_ko["Global variables"] = "전역 변수";
ui_ko["Watched expressions"] = "문장 결과 보기";

ui_ko["move forward"] = "앞으로 움직이기";
ui_ko["turn left"] = "왼쪽으로 움직이기";
ui_ko["take object"] = "객체 가지기";
ui_ko["put object"] = "객체 넣기";
ui_ko["Pause the program's execution."] = "프로그램 일시 정지.";
ui_ko["Build a wall in front of the robot."] = "벽을 로봇 앞에 짓기.";
ui_ko["End the program's execution."] = "프로그램 실행 종료.";
ui_ko["True if a wall is blocking the way."] = "벽이 길을 막고 있는 경우가 사실이라면.";
ui_ko["True if nothing is blocking the way."] = "아무것도 차단 하지 않는 경우가 사실이라면.";
ui_ko["True if desired destination."] = "원하는 목적지가 있는 경우가 사실이라면";
ui_ko["True if robot carries at least one object."] = "로봇이 적어도 하나의 객체를 싣고 있는 경우가 사실이라면.";
ui_ko["True if there is at least one object here."] = "적어도 하나의 객체가 여기에 있는 경우가 사실이라면.";
ui_ko["True if robot is facing North."] = "만약 로봇이 북쪽을 바라보고 있는 경우가 사실이라면.";
ui_ko["Delay between actions; default is 300 ms."] = "행동을 지연시킵니다; 기본값은 300 밀리초.";

ui_ko["Save world in browser"] = "월드를 브라우저에 저장하기";
ui_ko["Save permalink"] = "퍼머 저장";
ui_ko["Save permalink explanation"] = "파일의 퍼머링크 복사본을 저장하기";
ui_ko["LOAD BLOCKLY"] = "프로그램(블럭들)을 파일에서 불러오기";
ui_ko["LOAD BLOCKLY EXPLAIN"] = "로컬 파일을 열고 Blockly 작업공간의 요소 대신에 이 요소를 사용합니다";
ui_ko["LOAD EDITOR"] = "파일로 불러오기";
ui_ko["LOAD EDITOR EXPLAIN"] = "로컬 저장소에서 소스코드 불러오기";
ui_ko["LOAD LIBRARY"] = "파일에서 라이브러리를 가져오기";
ui_ko["LOAD LIBRARY EXPLAIN"] = "파일을 열고 라이브러리의 컨텐츠를 지금 사용합니다.";
ui_ko["LOAD WORLD"] = "파일로 불러오기";
ui_ko["LOAD WORLD EXPLAIN"] = "컴퓨터안의 파일로 월드를 불러오기";
ui_ko["SAVE BLOCKLY"] = "Save program to file";
ui_ko["SAVE BLOCKLY EXPLAIN"] = "Saves the current blocks in a file." + mac_user_save_files_ko;
ui_ko["SAVE EDITOR"] = "파일로 저장";
ui_ko["SAVE EDITOR EXPLAIN"] = "에디터 소스코드 저장" + mac_user_save_files_ko;
ui_ko["SAVE LIBRARY"] = "라이브러리 저장";
ui_ko["SAVE LIBRARY EXPLAIN"] = "파일 라이브러리의 내용 저장" + mac_user_save_files_ko;
ui_ko["SAVE WORLD"] = "파일로 저장";
ui_ko["SAVE WORLD EXPLAIN"] = "(json 확장자) 월드를 컴퓨터에 저장" + mac_user_save_files_ko;

ui_ko["PROGRESS SECTION TITLE"] = "Keeping track of tasks solved";
ui_ko["PROGRESS EXPLAIN"] = "Tasks solved are marked with " + RUR.CHECKMARK +
    "in the world selector and the information is saved in your browser. If you use a different browser, " +
    "the tasks you have already solved using a different browser will not be shown. " +
    "If you click on the save button below, a file named progress.json will be saved with the tasks solved " +
    "recorded in the current browser. You can import this file in a different browser so that your progress can be updated.";
ui_ko["SAVE PROGRESS"] = "Save";
ui_ko["IMPORT PROGRESS"] = "Import";
ui_ko["RETRIEVE SOLUTION"] = "Retrieve solution";
ui_ko["RETRIEVE SOLUTION EXPLAIN"] = "If a solution (blocks, or code and possibly code in library) for this world has been saved in the browser for the current programming mode, it will be retrieved and replace the current content.";

ui_ko["ADD CONTENT TO WORLD"] = "Add content to world from selected items below.";
ui_ko["ADD BLOCKLY TEXT"] = "Code blocks";
ui_ko["ADD EDITOR TEXT"] = "Code in editor";
ui_ko["ADD LIBRARY TEXT"] = "Library";
ui_ko["ADD PRE TEXT"] = "Pre";
ui_ko["ADD POST TEXT"] = "Post";
ui_ko["ADD DESCRIPTION TEXT"] = "Description";
ui_ko["ADD ONLOAD TEXT"] = "Onload";

ui_ko["KEYBOARD BUTTON"] = "리보그의 키보드";
ui_ko["ADDITIONAL OPTIONS"] = "추가 설정";

ui_ko["BASIC COMMANDS"] = "기본적인 명령어";
ui_ko["DEFINING"] = "정의";
ui_ko["LOOPS"] = "루프";
ui_ko["DECISIONS"] = "결정";
ui_ko["CONDITIONS"] = "상태";
ui_ko["USING VARIABLES"] = "변수 사용하기";
ui_ko["COMMANDS"] = "명령어들";
ui_ko["OTHER"] = "그 외";
ui_ko["OBJECTS"] = "객체들";

ui_ko["Python Code"] = "파이썬 코드";
ui_ko["Javascript Code"] = "자바스크립트 코드";
ui_ko["LIBRARY"] = "라이브러리";
ui_ko["EXTRA"] = "extra";
ui_ko["PRE"] = "전에";
ui_ko["POST"] = "후";
ui_ko["DESCRIPTION"] = "월드 정보";
ui_ko["ONLOAD"] = "Onload";

ui_ko["HIGHLIGHT IMPOSSIBLE"] = "구문 강조를 꺼서 문제가 발생했습니다.";
ui_ko["COMMAND RESULT"] = "아래 메뉴에서 수행할 작업을 선택합니다.";

ui_ko["DELETE WORLD TEXT"] = "버튼을 클릭하면 브라우져의 메모리에 저장된 월드를 제거합니다:";
ui_ko["PYTHON ONLY"] = "파이썬 전용";
ui_ko["COLLABORATION"] = "협업";
ui_ko["TOGETHERJS EXPLAIN"] = "다른 사용자는 Mozilla의 TogetherJS를 이용하여 협업에 참여 할 수 있습니다.  (Does not work with Blockly.)";
ui_ko["WORLD CREATION TITLE"] = "월드 : 창조, 수정..";
ui_ko["EDIT WORLD"] = "월드 수정";
ui_ko["EDIT WORLD EXPLAIN"] = "기존 월드를 수정하여 자신 만의 월드를 만들 수 있습니다.";
ui_ko["PROGRAM IN EDITOR"] = "에디터";
ui_ko["PROGRAM IN BLOCKLY WORKSPACE"] = "blockly 작업 공간 프로그램";
ui_ko["CONTACT"] = "(English/French only) 이메일:";
ui_ko["ISSUES"] = "버그 제보, 건의 그외 문제 등. (영어/프랑스어만 됨)";
ui_ko["FORUM"] = "토론 포럼 (영어/프랑스어만 됨";
ui_ko["HELP"] = "도움말";
ui_ko["DOCUMENTATION"] = '<a href="http://reeborg.ca/docs/ko" target="_blank" rel="noopener">Documentation (참고 문서)</a>';
ui_ko["PYTHON HELP"] = "파이썬을 사용해서, <code>help()</code>를 실행해서 명령어의 목록을 얻으세요 또는 <code>help(함수명)</code>으로 해당 <code>함수명()</code>의 정보를 확인할 수 있습니다. 예를 들어, <code>help(move)</code>로 <code>move</code>함수의 정보를 얻을 수 있습니다.";
ui_ko["KEYBOARD HELP"] = "리보그의 키보드를 클릭해서 파이썬 키워드 등, 사용할수 있는 명령어의 목록을 보세요.";

ui_ko["WORLD EDITOR"] = "월드 편집기";
ui_ko["m-east"] = "동쪽";
ui_ko["m-north"] = "북쪽";
ui_ko["m-west"] = "서쪽";
ui_ko["m-south"] = "남쪽";
ui_ko["m-random"] = "랜덤";
ui_ko["m-dimensions"] = "월드 크기";
ui_ko["m-add"] = "추가";
ui_ko["m-add-robot"] = "로봇 추가";
ui_ko["m-robot"] = "로봇";
ui_ko["m-position"] = "위치(들)";
ui_ko["m-turn"] = "회전";
ui_ko["m-objects"] = "객체";
ui_ko["m-walls"] = "벽";
ui_ko["m-objects2"] = "객체";
ui_ko["m-tiles"] = "타일들";
ui_ko["m-fill"] = "체우기";
ui_ko["m-solid"] = "특정 객체";
ui_ko["m-decorative"] = "꾸미기용 객체";
ui_ko["m-background"] = "배경 사진";
ui_ko["m-goal"] = "목표";
ui_ko["mg-robot"] = "로봇";
ui_ko["mg-walls"] = "벽";
ui_ko["mg-objects"] = "객체";

ui_ko["Reeborg says: I'm done!"] = "리보그 : 다했어요";
ui_ko["Reeborg writes:"] = "리보그 쓰기:";
ui_ko["Reeborg shouts: Something is wrong!"] = "리보그의 외침: 뭔가 잘못 되었어!";
ui_ko["Reeborg explores some Javascript code"] = "리보그는 일부 자바스크립트 코드를 조사했습니다";
ui_ko["Reeborg states:"] = "리보그 상태:";
ui_ko["Reeborg watches some variables!"] = "리보그는 몇가지의 변수를 보고 있습니다!";
ui_ko["Click on the world to get some additional information."] = "추가 정보를 얻기 위해 월드를 클릭합니다.";

ui_ko["Reeborg's basic keyboard"] = "리보그의 기본적인 키보드";
ui_ko["kbd-command-btn"] = "명령어";
ui_ko["kbd-condition-btn"] = "상태";
ui_ko["kbd-python-btn"] = "파이썬";
ui_ko["kbd-py-console-btn"] = "파이썬";
ui_ko["kbd-javascript-btn"] = "자비스크립트";
ui_ko["kbd-objects-btn"] = "객체";
ui_ko["kbd-special-btn"] = "특수키";

ui_ko["UNDO"] = "되돌리기";
ui_ko["REDO"] = "다시 실행";
ui_ko["tab"] = "TAB";
ui_ko["shift-tab"] = "Shift-TAB";
ui_ko["enter"] = "\u23CE";
ui_ko["<code>repeat</code> is not a true Python keyword."] = "<code>repeat</code>는 여기에서만 작동하는 파이썬 키워드입니다.";

ui_ko["Colour:"] = "색상:";
ui_ko["Enter a colour"] = "색상을 입력하세요";

ui_ko["Background image"] = "배경 이미지";

ui_ko["NAME:"] = "이름:";
ui_ko["Save world in browser"] = "월드를 브라우저에 저장하기";


ui_ko["Set the world's dimensions"] = "월드의 크기를 조절하세요";
ui_ko["set-dimensions-explain"] = "원하는 경우 월드의 기본 크기를 다르게 설정할 수 있습니다. 작은 해상도의 화면은 매우 큰 세계를 볼수 없음을 기억하세요.";
ui_ko["Maximum x value:"] = "최대 x 값:";
ui_ko["Maximum y value:"] = "최대 y 값:";
ui_ko["Use small tiles"] = "작은 타일 사용하기";

ui_ko["Set goal number for object"] = "객체의 목표 수를 설정합니다.";
ui_ko["dialog-goal-object-explain"] = "체크박스를 클릭하세요. 월드가 시작될때 당신의 원하는 객체의 모든 숫자가 보입니다.";
ui_ko["Number of objects"] = "객체의 수:";
ui_ko["All such objects"] = "모든 종류의 객체";

ui_ko["Number of objects:"] = "객체의 수:";
ui_ko["Maximum:"] = "최대 값:";
ui_ko["Add object in the world"] = "Set number of object";
ui_ko["ADD OBJECT EXPLAIN"] = "Choose zero to remove any existing such object at this location. If <code>Maximum</code> is set to a value greater than the <code>Number of objects</code>, a number of objects, between these two values, will be chosen randomly each time a program is run.";

ui_ko["Unlimited:"] = "Unlimited:";
ui_ko["Give object to robot"] = "Give object to robot";
ui_ko["GIVE OBJECT EXPLAIN"] = "로봇이 운반 할 객체의 수를 고르세요. 더 많은 수를 원한다면 체크박스를 클릭하세요.";

ui_ko["UPDATE BLOCKLY CONTENT"] = "This world has some default content for the blocks workspace. To replace the current blocks content, click on the button";
ui_ko["UPDATE BLOCKLY BUTTON"] = "Replace existing blocks";
ui_ko["Contents from World"] = "Contents from World";

ui_ko["WARNING: Do not change this comment."] = "WARNING: Do not change this comment.";
ui_ko["Library Code is below."] = "Library Code is below.";
ui_ko["No solution can be saved when using REPL (Py)."] = "No solution can be saved when using REPL (Py).";
ui_ko["No solution can be loaded when using REPL (Py)."] = "No solution can be loaded when using REPL (Py).";

ui_ko["You are not allowed to use <code>done</code> in this world!"] = "You are not allowed to use <code>done()</code> in this world!";
ui_ko["Execution ended before the <em>Post</em> code was executed."] = "Execution ended before the <em>Post</em> code was executed.";

ui_ko["Difficulty level"] = "난이도";

ui_ko["Expected result"] = "Expected result";
ui_ko["Differences highlighted"] = "Differences highlighted";
ui_ko["Actual result"] = "Actual result";

ui_ko["Cannot parse progress file."] = "Cannot parse progress file.";
ui_ko["Cannot merge progress."] = "Cannot merge progress.";
ui_ko["No solution found for this world."] = "No solution found for this world.";

ui_ko["THINKING"] = "생각 중";

},{}],103:[function(require,module,exports){
// the following is used in a few places below
var mac_user_save_files_en = ' <b>"Mac" naudotojai:</b> žiūrėkite <a href="https://github.com/aroberge/reeborg/blob/master/dev_tools/known_problems.md" target="_blank" rel="noopener">Žinomos problemos</a>.';

exports.ui_lt = ui_lt = {};
exports.lt_to_en = lt_to_en = {};
exports.en_to_lt = en_to_lt = {};

ui_lt["lt-en"] =  "Mišrus režimas: vartotojo sąsaja lietuvių kalba; programavimo kalba anglų kalba." +
    "Mišrus režimas: naudotojo sąsaja lietuvių kalba; programavimo kalba anglų kalba.<br>";

ui_lt["SITE NAME"] = "Robočiuko pasaulis";
ui_lt["WORLD INFO"] = "Pasaulio informacija";
ui_lt["EDITOR VISIBLE"] = "Laikyti redaktorių įjungtą";

ui_lt["apple"] = en_to_lt["apple"] = "obuolys";
ui_lt["banana"] = en_to_lt["banana"] = "bananas";
ui_lt["beeper"] = en_to_lt["beeper"] = "pypsiukas";
ui_lt["box"] = en_to_lt["box"] = "dėžė";
ui_lt["bridge"] = en_to_lt["bridge"] = "tiltas";
ui_lt["carrot"] = en_to_lt["carrot"] = "morka";
ui_lt["daisy"] = en_to_lt["daisy"] = "ramunė";
ui_lt["dandelion"] = en_to_lt["dandelion"] = "pienė";
ui_lt["leaf"] = en_to_lt["leaf"] = "lapas";
ui_lt["square"] = en_to_lt["square"] = "kvadratas";
ui_lt["star"] = en_to_lt["star"] = "žvaigždė";
ui_lt["strawberry"] = en_to_lt["strawberry"] = "braškė";
ui_lt["token"] = en_to_lt["token"] = "ženkliukas";
ui_lt["tokens are Reeborg's favourite thing."] = "Robočiukas mėgsta ženkliukus.";
ui_lt["triangle"] = en_to_lt["triangle"] = "trikampis";
ui_lt["tulip"] = en_to_lt["tulip"] = "tulpė";
ui_lt["bucket"] = en_to_lt["bucket"] = "kibiras";
ui_lt["bulb"] = en_to_lt["bulb"] = "lempa";
ui_lt["bricks"] = en_to_lt["bricks"] = "plytos";
ui_lt["bricks"] = en_to_lt["bricks"] = "plytos";
ui_lt["pale_grass"] = en_to_lt["pale_grass"] = "šviesi_žolė";

lt_to_en["obuolys"] = "apple";
lt_to_en["bananas"] = "banana";
lt_to_en["pypsiukas"] = "beeper";
lt_to_en["dėžė"] = "box";
lt_to_en["tiltas"] = "bridge";
lt_to_en["morka"] = "carrot";
lt_to_en["ramunė"] = "daisy";
lt_to_en["pienė"] = "dandelion";
lt_to_en["lapas"] = "leaf";
lt_to_en["kvadratas"] = "square";
lt_to_en["žvaigždė"] = "star";
lt_to_en["braškė"] = "strawberry";
lt_to_en["ženkliukas"] = "token";
lt_to_en["trikampis"] = "triangle";
lt_to_en["tulpė"] = "tulip";
lt_to_en["kibiras"] = "bucket";
lt_to_en["lempa"] = "bulb";
lt_to_en["plytos"] = "bricks";
lt_to_en["šviesi_žolė"] = "pale_grass";

ui_lt["mud"] = en_to_lt["mud"] = "purvas";
ui_lt["soil"] = en_to_lt["soil"] = "žemė";
ui_lt["water"] = en_to_lt["water"] = "vanduo";
ui_lt["grass"] = en_to_lt["grass"] = "žolė";
ui_lt["gravel"] = en_to_lt["gravel"] = "žvyras";
ui_lt["ice"] = en_to_lt["ice"] = "ledas";
ui_lt["fire"] = en_to_lt["fire"] = "ugnis";

lt_to_en["purvas"] = "mud";
lt_to_en["žemė"] = "soil";
lt_to_en["vanduo"] = "water";
lt_to_en["žolė"] = "grass";
lt_to_en["žvyras"] = "gravel";
lt_to_en["ledas"] = "ice";
lt_to_en["ugnis"] = "fire";

ui_lt["infinite"] = "begalinis skaičius";
ui_lt["Super!"] = "Super!";

ui_lt["fence_right"] = en_to_lt["fence_right"] = "tvora_dešinėje";
ui_lt["fence_left"] = en_to_lt["fence_left"] = "tvora_kairėje";
ui_lt["fence_vertical"] = en_to_lt["fence_vertical"] = "vertikali_tvora";
ui_lt["fence_double"] = en_to_lt["fence_double"] = "dviguba_tvora";

lt_to_en["tvora_dešinėje"] = "fence_right";
lt_to_en["tvora_kairėje"] = "fence_left";
lt_to_en["vertikali_tvora"] = "fence_vertical";
lt_to_en["dviguba_tvora"] = "fence_double";

ui_lt["Invalid Javascript code in Onload editor"] = "Netinkamas Javascript onload kodas; kreipkitės į šio pasaulio kūrėją.";
ui_lt["Invalid Python code in Onload editor"] = "Netinkamas Python onload kodas; kreipkitės į šio pasaulio kūrėją.";

ui_lt["Too many steps:"] = "Per daug žingsnių: {max_steps}<br>Naudokite <code>set_max_nb_steps(nb)</code> ribos padidinimui.";
ui_lt["<li class='success'>Reeborg is at the correct x position.</li>"] = "<li class='success'>Robotukas yra teisingoje x pozicijoje.</li>";
ui_lt["<li class='failure'>Reeborg is at the wrong x position.</li>"] = "<li class='failure'>Robotukas yra neteisingoje x pozicijoje.</li>";
ui_lt["<li class='success'>Reeborg is at the correct y position.</li>"] = "<li class='success'>Robotukas yra teisingoje y pozicijoje.</li>";
ui_lt["<li class='failure'>Reeborg is at the wrong y position.</li>"] = "<li class='failure'>Robotukas yra neteisingoje y pozicijoje.</li>";
ui_lt["<li class='success'>All objects are at the correct location.</li>"] = "<li class='success'>Visi objektai teisingose pozicijose.</li>";
ui_lt["<li class='failure'>One or more objects are not at the correct location.</li>"] = "<li class='failure'>Vienas ar daugiau objektų nėra tinkamoje vietoje.</li>";
ui_lt["<li class='success'>All walls have been built correctly.</li>"] = "<li class='success'>Visos sienos pastatytos teisingai.</li>";
ui_lt["<li class='failure'>One or more walls missing or built at wrong location.</li>"] = "<li class='failure'>Trūksta vienos ar daugiau sienų arba jos pastatytos netinkamoje vietoje.</li>";
ui_lt["Last instruction completed!"] = "Paskutinė instrukcija įvykdyta!";
ui_lt["<p class='center'>Instruction <code>done()</code> executed.</p>"] = "<p class='center'>Instrukcija <code>done()</code> įvykdyta.</p>";

ui_lt["Unknown object"] = "Nežinomas objektas: <code>{obj}</code>";
ui_lt["No object found here"] = "Nerasta: <code>{obj}</code>!";
ui_lt["object"] = "objektas";
ui_lt["I don't have any object to put down!"] = "Neturiu <code>{obj}</code>, kad galėčiau padėti!";
ui_lt["There is already a wall here!"] = "Čia jau yra siena!";
ui_lt["There is no wall to remove!"] = "Nėra sienos, kurią reikėtų pašalinti!";
ui_lt["Ouch! I hit a wall!"] = "Oj! Aš atsitrenkiau į sieną!";
ui_lt["Done!"] = "Padaryta!";
ui_lt["There is no position as a goal in this world!"] = "Šiame pasaulyje nėra pozicijos kaip tikslo!";
ui_lt["There is no goal in this world!"] = "Šiame pasaulyje nėra tikslo!";
ui_lt["I carry too many different objects. I don't know which one to put down!"] = "Nešiojuosi per daug įvairių daiktų. Nežinau, kurį padėti!";
ui_lt["Many objects are here; I do not know which one to take!"] = "Čia daug įvairių daiktų, nežinau, kurį paimti!";

ui_lt.east = en_to_lt.east = "rytai";
ui_lt.north = en_to_lt.north = "šiaurė";
ui_lt.west = en_to_lt.west = "vakarai";
ui_lt.south = en_to_lt.south = "pietūs";
ui_lt["Unknown orientation for robot."] = "Nežinoma robotuko kryptis";

lt_to_en["rytai"] = "east";
lt_to_en["šiaurė"] = "north";
lt_to_en["vakarai"] = "west";
lt_to_en["pietūs"] = "south";

ui_lt["Invalid position."] = "{pos} yra netinkama pozicija.";
ui_lt["Invalid orientation."] = "'{orient}' yra netinkama orientacija.";

ui_lt["World selected"] = "Parinktas pasaulis: {world}";
ui_lt["Could not find world"] = "Neradau pasaulio: {world}";
ui_lt["Object names"] = " biblioteka, ženkliukas, žvaigždė, trikampis, kvadratas, kt.";

ui_lt["Invalid world file."] = "Neteisinkas pasaulio failas.";
ui_lt["PERMALINK"] = "PERMALINKas";
ui_lt["Could not find link: "] = "Nerasta nuoroda: ";

ui_lt["Click on world to move robot."] = "Paspauskite ant pasaulio, kad pridėtumėte arba pašalintumėte galimas starto pozicijas.";
ui_lt["Added robot."] = "Pridėtas robotas.";
ui_lt["Click on image to turn robot"] = "Paspauskite ant paveikslėlio, kad įjungtumėte Robotuką.";
ui_lt["Robot now has tokens."] = "Robotukas turi ženkliukų: {x_tokens}.";
ui_lt["Click on world to add object."] = "Spustelkite nurodydami objektus: <code>{obj}</code>.";
ui_lt["Click on desired object below."] = "Spustelėkite norimą objektą žemiau.";
ui_lt["Click on world to toggle walls."] = "Paspauskite ant pasaulio, kad perjungtumėte sienas.";
ui_lt["Click on world to set home position for robot."] = "Paspauskite ant pasaulio, kad pridėtumėte/pašalintumėte galimas galutines roboto pozicijas.";
ui_lt["Click on world to toggle additional walls to build."] = "Paspauskite ant pasaulio, kad perjungtumėte papildomas sienas.";
ui_lt["Click on desired goal object below."] = "Žemiau spustelėkite norimą tikslo objektą.";
ui_lt["Click on world to set number of goal objects."] = "Paspauskite ant pasaulio, kad nustatytumėte tikslo <code>{obj}</code> skaičių.";
ui_lt["Enter number of tokens for robot to carry (use inf for infinite number)"] = "Įveskite ženkliukų, kuriuos turi nešti robotukas, skaičių.";
ui_lt[" is not a valid value!"] = " nėra galima reikšmė!";
ui_lt["Enter number of objects desired at that location."] = "Spustelėkite ant pasaulio, kad nustatytumėte <code>{obj}</code> skaičių.";
ui_lt["Objects found here:"] = "Čia rasti objektai:";
ui_lt["Description"] = "Aprašymas";
ui_lt["A robot located here carries no objects."] = "Robotas, esantis taške (x, y) = ({x}, {y}), neturi jokių objektų.";
ui_lt["Goal to achieve:"] = "Siekiamas tikslas:";
ui_lt["A robot located here carries:"] = "Robotas, esantis taške (x, y) = ({x}, {y}), turi:";
ui_lt["random location"] = "atsitiktinė vieta";
ui_lt["Enter number of objects to give to robot."] = "Įveskite <code>{obj}</code> skaičių, kurį norite perduoti robotui.";
ui_lt["Special information about this location:"] = "Speciali informacija apie šią vietą:";
ui_lt["Click on world to toggle tile."] = "Paspauskite ant pasaulio, kad perjungtumėte <code>{obj}</code> plytelę.";
ui_lt["Click on desired tile below."] = "Spustelėkite žemiau esančią norimą plytelę arba spalvų rinkiklį.";
ui_lt["A wall must be built east of this location."] = "Siena turi būti pastatyta į rytus nuo šios vietos.";
ui_lt["A wall must be built north of this location."] = "Siena turi būti pastatyta į šiaurę nuo šios vietos.";
ui_lt["A wall must be built west of this location."] = "Siena turi būti pastatyta į vakarus nuo šios vietos.";
ui_lt["A wall must be built south of this location."] = "Siena turi būti pastatyta į pietus nuo šios vietos.";
ui_lt["The final required position of the robot will be chosen at random."] = "Galutinė reikalaujama roboto padėtis bus pasirinkta atsitiktine tvarka.";
ui_lt["The final position of the robot must be (x, y) = "] = "Galutinė roboto padėtis turi būti (x, y) = ";
ui_lt["Click on world to fill with given tile."] = "Spustelėkite ant pasaulio, kad užpildytumėte jį tam tikra plytele.";
ui_lt["Click on desired object below."] = "Spustelėkite norimą objektą žemiau.";
ui_lt["Enter url of image to use as background."] = "Įveskite paveikslėlio, kuris bus naudojamas kaip fonas, url.";
ui_lt["Replace editor content"] = "Ar norite savo redaktoriaus kodą pakeisti šio pasaulio kūrėjo pateiktu kodu?";
ui_lt["Replace library content"] = "Ar norėtumėte savo bibliotekos kodą pakeisti šio pasaulio kūrėjo pateiktu kodu?";
ui_lt["colour"] = "spalva";

ui_lt["Name already exist; confirm that you want to replace its content."] = "Pavadinimas jau egzistuoja; patvirtinkite, kad norite pakeisti jo turinį.";
ui_lt["No such world!"] = "Tokio pasaulio nėra!";
ui_lt["Enter world name to save"] = "Įveskite pasaulio pavadinimą, kad išsaugotumėte; naudojami pavadinimai: ";
ui_lt["Enter world name to delete"] = "Įveskite pasaulio pavadinimą, kurį norite ištrinti; esami pasauliai: ";
ui_lt["Delete "] = "Ištrinti ";

ui_lt["Error found at or near line {number}."] = "Klaida rasta eilutėje {number} arba netoli jos.";
ui_lt["<br>Perhaps a missing colon is the cause."] = "<br>Galbūt priežastis - praleistas dvitaškis.";
ui_lt["<br>Perhaps you forgot to add parentheses ()."] = "<br>Galbūt pamiršai pridėti skliaustelius ().";
ui_lt["<br>Perhaps you misspelled a word or forgot to define a function or a variable."] = "<br>Galbūt neteisingai parašėte žodį arba pamiršote apibrėžti funkciją ar kintamąjį.";
ui_lt["I cannot help you with this problem."] = "Negaliu jums padėti išspręsti šios problemos.";

ui_lt["I'm stuck in mud."] = "Įstrigau purve.";
ui_lt["Mud: Reeborg <b>cannot</b> detect this and will get stuck if it moves to this location."] = "Purvas: Robotukas <b>negali</b> to aptikti ir įstrigs, jei keliaus į šią vietą.";
ui_lt["Soil: usually safe, but looks identical to mud."] = "Žemė: paprastai saugus, bet atrodo lygiai taip pat kaip purvas.";
ui_lt["I'm slipping on ice!"] = "Aš slystu ant ledo!";
ui_lt["Ice: Reeborg <b>cannot</b> detect this and <em>might</em> slide and move to the next location if it moves to this location."] = "Ledas: Robotukas <b>negali</b> jo aptikti ir <em>gali</em> paslysti ir pereiti į kitą vietą, jei keliaus į šią vietą.";
ui_lt["Grass: usually safe."] = "Žolė: paprastai saugi.";
ui_lt["Gravel: usually safe."] = "Žvyras: paprastai saugus.";
ui_lt["I'm in water!"] = "Esu vandenyje!";
ui_lt["Water: Reeborg <b>can</b> detect this but will get damaged if it moves to this location."] = "Vanduo: Robotukas <b>gali</b> jį aptikti, bet bus pažeistas, jei keliaus į šią vietą.";
ui_lt["green home tile: Reeborg <b>can</b> detect this tile using at_goal()."] = "žaliosios namų plytelės: Robotukas <b>gali</b> aptikti šią plytelę naudodamas funkciją at_goal().";
ui_lt["Crash!"] = "Avarija!";
ui_lt["brick wall: Reeborg <b>can</b> detect this but will hurt himself if he attemps to move through it."] = "Mūrinė siena: Robotukas <b>gali</b> ją aptikti, tačiau bandydamas pro ją prasibrauti susižeis.";
ui_lt["I hit a fence!"] = "Atsitrenkiau į tvorą!";
ui_lt["Fence: Reeborg <b>can</b> detect this but will be stopped by it."] = "Tvora: Robotukas <b>gali</b> ją aptikti, bet bus sustabdytas.";
ui_lt["Bridge:Reeborg <b>can</b> detect this and will know that it allows safe passage over water."] = "Tiltas: Robotukas <b>gali</b> jį aptikti ir žinos, kad jis leidžia saugiai pereiti per vandenį.";
ui_lt["My joints are melting!"] = "Mano jungtys tirpsta!";
ui_lt["A bucket full of water."] = "Pilnas kibiras vandens.";
ui_lt["Tulip bulb: might grow into a nice tulip with some water from a bucket."] = "Tulpės svogūnėlis: šiek tiek vandens iš kibiro ir jis gali išaugti į gražią tulpę.";

ui_lt["Something is blocking the way!"] = "Kažkas blokuoja kelią!";
ui_lt["Reeborg <b>can</b> detect this tile using at_goal()."] = "Robotukas <b>gali</b> aptikti šią plytelę naudodamas at_goal().";
ui_lt["green home tile:"] = "žaliosios namų plytelės:";
ui_lt["home:"] = "namai:";
ui_lt["racing flag:"] = "lenktynių vėliava:";
ui_lt["house:"] = "namas:";

ui_lt["Local variables"] = "Lokalūs kintamieji";
ui_lt["Global variables"] = "Globalūs kintamieji";
ui_lt["Watched expressions"] = "Stebimos išraiškos";

ui_lt["move forward"] = "judėti pirmyn";
ui_lt["turn left"] = "pasisukti kairėn";
ui_lt["take object"] = "paimti objektą";
ui_lt["put object"] = "padėti objektą";
ui_lt["Pause the program's execution."] = "Pristabdyti programos vykdymą.";
ui_lt["Build a wall in front of the robot."] = "Pastatykite sieną priešais robotą.";
ui_lt["End the program's execution."] = "Baigti programos vykdymą.";
ui_lt["True if a wall is blocking the way."] = "True, jei kelią užstoja siena";
ui_lt["True if nothing is blocking the way."] = "True, jei niekas neblokuoja kelio.";
ui_lt["True if desired destination."] = "True, jei pageidaujama paskirties vieta.";
ui_lt["True if robot carries at least one object."] = "True, jei robotas neša bent vieną objektą.";
ui_lt["True if there is at least one object here."] = "True, jei čia yra bent vienas objektas.";
ui_lt["True if robot is facing North."] = "True, jei robotas pasisukęs į šiaurę.";
ui_lt["Delay between actions; default is 300 ms."] = "Laikas tarp veiksmų; numatytasis nustatymas yra 300 ms.";

ui_lt["Save world in browser"] = "Išsaugoti pasaulį naršyklėje";
ui_lt["LOAD BLOCKLY"] = "Importuoti programą (blokelius) iš failo";
ui_lt["LOAD BLOCKLY EXPLAIN"] = "Atidaro failą ir naudoja jo turinį blokelių aplinkos turiniui pakeisti.";
ui_lt["LOAD EDITOR"] = "Importuoti programą iš failo";
ui_lt["LOAD EDITOR EXPLAIN"] = "Atidaro failą ir juo pakeičia kodo redaktoriaus turinį.";
ui_lt["LOAD LIBRARY"] = "Importuoti biblioteką iš failo";
ui_lt["LOAD LIBRARY EXPLAIN"] = "Atidaro failą ir naudoja jo turinį vietoj dabartinio bibliotekos turinio.";
ui_lt["LOAD WORLD"] = "Įkelti pasaulį iš failo";
ui_lt["LOAD WORLD EXPLAIN"] = "Įkelia pasaulį iš kompiuteryje esančio failo.";
ui_lt["SAVE BLOCKLY"] = "Išsaugoti programą į failą";
ui_lt["SAVE BLOCKLY EXPLAIN"] = "Įrašo esamus blokelius į failą." + mac_user_save_files_en;
ui_lt["SAVE EDITOR"] = "Išsaugoti programą į failą";
ui_lt["SAVE EDITOR EXPLAIN"] = "Įrašo redaktoriaus turinį į failą." + mac_user_save_files_en;
ui_lt["SAVE LIBRARY"] = "Išsaugoti biblioteką";
ui_lt["SAVE LIBRARY EXPLAIN"] = "Įrašo bibliotekos turinį į failą." + mac_user_save_files_en;
ui_lt["SAVE WORLD"] = "Įrašyti pasaulį į failą";
ui_lt["SAVE WORLD EXPLAIN"] = "Įrašo pasaulį (kaip json objektą) į failą kompiuteryje." + mac_user_save_files_en;

ui_lt["PROGRESS SECTION TITLE"] = "Išspręstų užduočių stebėjimas";
ui_lt["PROGRESS EXPLAIN"] = "Išspręstos užduotys pažymimos " + RUR.CHECKMARK +
    "pasaulio pasirinkimo langelyje, o informacija išsaugoma naršyklėje. Jei naudojate kitą naršyklę, " +
    "tai užduotys, kurias jau išsprendėte naudodami ankstenę naršyklę, nebus rodomos. " +
    "Jei spustelėsite toliau esantį išsaugojimo mygtuką, bus išsaugotas failas pavadinimu progress.json su išspręstomis užduotimis, " +
    "kurios išsaugotos dabartinėje naršyklėje. Galite importuoti failą kitose našyklės ir taip progresas bus atnaujintas.";
ui_lt["SAVE PROGRESS"] = "Išsaugoti";
ui_lt["IMPORT PROGRESS"] = "Importuoti";
ui_lt["RETRIEVE SOLUTION"] = "Paimti sprendimą";
ui_lt["RETRIEVE SOLUTION EXPLAIN"] = "Jei šio pasaulio sprendimas (blokai arba kodas ir galbūt kodas bibliotekoje) buvo išsaugotas dabartinio programavimo režimu naršyklėje, jis bus paimtas ir pakeistas dabartiniu turiniu.";

ui_lt["ADD CONTENT TO WORLD"] = "Papildykite pasaulį žemiau parinktais elementais.";
ui_lt["ADD BLOCKLY TEXT"] = "Programuoti blokeliais";
ui_lt["ADD EDITOR TEXT"] = "Programuoti redaktoriuje";
ui_lt["ADD LIBRARY TEXT"] = "Biblioteka";
ui_lt["ADD PRE TEXT"] = "Prieš";
ui_lt["ADD POST TEXT"] = "Po";
ui_lt["ADD DESCRIPTION TEXT"] = "Aprašymas";
ui_lt["ADD ONLOAD TEXT"] = "Užkraunant";

ui_lt["KEYBOARD BUTTON"] = "Robotuko klaviatūra";
ui_lt["ADDITIONAL OPTIONS"] = "Papildomi nustatymai";

ui_lt["BASIC COMMANDS"] = "Komandos";
ui_lt["DEFINING"] = "Funkcijos";
ui_lt["LOOPS"] = "Ciklai";
ui_lt["DECISIONS"] = "Pasirinkimai";
ui_lt["CONDITIONS"] = "Sąlygos";
ui_lt["USING VARIABLES"] = "Kintamieji";
ui_lt["COMMANDS"] = "Komandos";
ui_lt["OTHER"] = "Kita";
ui_lt["OBJECTS"] = "Objektai";

ui_lt["Python Code"] = "Pitono kodas";
ui_lt["Javascript Code"] = "Javascript kodas";
ui_lt["LIBRARY"] = "biblioteka";
ui_lt["EXTRA"] = "ekstra";
ui_lt["PRE"] = "Prieš";
ui_lt["POST"] = "Po";
ui_lt["DESCRIPTION"] = "Apr.";
ui_lt["ONLOAD"] = "Užkraunant";

ui_lt["HIGHLIGHT IMPOSSIBLE"] = "Dėl neteisingo kodo teko išjungti jo paryškinimą.";
ui_lt["COMMAND RESULT"] = "Iš pateikto meniu pasirinkite veiksmą, kurį norite atlikti.";

ui_lt["DELETE WORLD TEXT"] = "Čia pateikiami jūsų naršyklėje saugomi pasauliai, kuriuos galite ištrinti:";
ui_lt["PYTHON ONLY"] = "Tik Pitonas";
ui_lt["COLLABORATION"] = "Bendradarbiavimas";
ui_lt["TOGETHERJS EXPLAIN"] = "Įrankis, leidžiantis bendradarbiauti su vienu ar keliais kitais naudotojais naudojant Mozilla programą TogetherJS. Neveikia su blokeliais.";
ui_lt["WORLD CREATION TITLE"] = "Pasaulis: kūrimas, redagavimas, ...";
ui_lt["EDIT WORLD"] = "Redaguoti pasaulį";
ui_lt["EDIT WORLD EXPLAIN"] = "Redaguodami esamą pasaulį galite sukurti savo pasaulį.";
ui_lt["PROGRAM IN EDITOR"] = "Programa redaktoriuje";
ui_lt["PROGRAM IN BLOCKLY WORKSPACE"] = "Programa blokelių aplinkoje";
ui_lt["CONTACT"] = "El. paštas:";
ui_lt["ISSUES"] = "Pranešimai apie klaidas, pasiūlymai, kita";
ui_lt["FORUM"] = "Diskusijų forumas";
ui_lt["HELP"] = "Pagalba";
ui_lt["DOCUMENTATION"] = '<a href="http://reeborg.ca/docs/en" target="_blank" rel="noopener">Dokumentacija</a>';
ui_lt["PYTHON HELP"] = "Naudodami Pitoną, vykdykite programą su <code>help()</code>, kad gautumėte komandų sąrašą, arba <code>help(move)</code>, kad gautumėte pagalbą apie <code>move()</code> funkciją ir t. t.";
ui_lt["KEYBOARD HELP"] = "Spustelėkite *Robotuko klaviatūra*, kad pamatytumėte galimų komandų, Pitono raktažodžių ir kt. sąrašą.";

ui_lt["WORLD EDITOR"] = "Pasaulio redaktorius";
ui_lt["m-east"] = "Rytai";
ui_lt["m-north"] = "Šiaurė";
ui_lt["m-west"] = "Vakarai";
ui_lt["m-south"] = "Pietūs";
ui_lt["m-random"] = "Atsitiktinai";
ui_lt["m-dimensions"] = "Pasaulio matmenys";
ui_lt["m-add"] = "Pridėti";
ui_lt["m-add-robot"] = "Pridėti robotą";
ui_lt["m-robot"] = "Robotas";
ui_lt["m-position"] = "Pozicija(-os)";
ui_lt["m-turn"] = "Pasisukti";
ui_lt["m-objects"] = "Objektai";
ui_lt["m-walls"] = "Sienos";
ui_lt["m-objects2"] = "Objektai";
ui_lt["m-tiles"] = "Plytelės";
ui_lt["m-fill"] = "Užpildas";
ui_lt["m-solid"] = "Kliūtys";
ui_lt["m-decorative"] = "Dekoracijų objektai";
ui_lt["m-background"] = "Foninis paveiksliukas";
ui_lt["m-goal"] = "Tikslas";
ui_lt["mg-robot"] = "Robotas";
ui_lt["mg-walls"] = "Sienos";
ui_lt["mg-objects"] = "Objektai";

ui_lt["Reeborg says: I'm done!"] = "Robotukas sako: Aš įveikiau!";
ui_lt["Reeborg writes:"] = "Robotukas rašo:";
ui_lt["Reeborg shouts: Something is wrong!"] = "Robotukas šaukia: Kažkas negerai!";
ui_lt["Reeborg explores some Javascript code"] = "Robotukas tyrinėja kai kuriuos Javascript kodus";
ui_lt["Reeborg states:"] = "Robotukas teigia:";
ui_lt["Reeborg watches some variables!"] = "Robutukas stebi kintamuosius!";
ui_lt["Click on the world to get some additional information."] = "Paspauskite ant pasaulio, kad gautumėte papildomos informacijos.";

ui_lt["Reeborg's basic keyboard"] = "Robotuko pagrindinė klaviatūra";
ui_lt["kbd-command-btn"] = "Komandos";
ui_lt["kbd-condition-btn"] = "Sąlygos";
ui_lt["kbd-python-btn"] = "Pitonas";
ui_lt["kbd-py-console-btn"] = "Pitonas";
ui_lt["kbd-javascript-btn"] = "Javascript";
ui_lt["kbd-objects-btn"] = "Objektai";
ui_lt["kbd-special-btn"] = "Specialūs";

ui_lt["UNDO"] = "ATŠAUKTI";
ui_lt["REDO"] = "ATKARTOTI";
ui_lt["tab"] = "TAB";
ui_lt["shift-tab"] = "Shift-TAB";
ui_lt["enter"] = "\u23CE";
ui_lt["<code>repeat</code> is not a true Python keyword."] = "<code>repeat</code> nėra Pitono raktažodis.";

ui_lt["Colour:"] = "Spalva:";
ui_lt["Enter a colour"] = "Įveskite spalvą";

ui_lt["Background image"] = "Foninis paveiksliukas";

ui_lt["NAME:"] = "Pavadinimas:";
ui_lt["Save world in browser"] = "Išsaugoti pasaulį naršyklėje";

ui_lt["Set the world's dimensions"] = "Nustatyti pasaulio matmenis";
ui_lt["set-dimensions-explain"] = "Jei pageidaujate, galite nustatyti kitokį pasaulio dydį nei numatytieji matmenys. Atminkite, kad mažesnės raiškos ekranuose gali nepavykti rodyti labai didelių pasaulių.";
ui_lt["Maximum x value:"] = "Maksimali x reikšmė:";
ui_lt["Maximum y value:"] = "Maksimali y reikšmė:";
ui_lt["Use small tiles"] = "Naudoti mažas plyteles";

ui_lt["Set goal number for object"] = "Nustatyti tikslų skaičių objektui";
ui_lt["dialog-goal-object-explain"] = "Spustelėkite žymimąjį langelį, jei norite, kad šis skaičius būtų lygus bendram pasaulio objektų skaičiui.";
ui_lt["Number of objects"] = "Objektų skaičius";
ui_lt["All such objects"] = "Visi tokie objektai";

ui_lt["Number of objects:"] = "Objektų skaičius:";
ui_lt["Maximum:"] = "Daugiausiai:";
ui_lt["Add object in the world"] = "Nustatyti objektų skaičių";
ui_lt["ADD OBJECT EXPLAIN"] = "Pasirinkite nulį, kad pašalintumėte bet kokį šioje vietoje esantį tokį objektą. Jei <code>Daugiausiai</code> nustatyta didesnė reikšmė nei <code>Objektų skaičius</code>, kiekvieną kartą paleidus programą atsitiktine tvarka bus parenkamas objektų skaičius tarp šių dviejų verčių.";

ui_lt["Unlimited:"] = "Neribota:";
ui_lt["Give object to robot"] = "Suteikite robotui objektą";
ui_lt["GIVE OBJECT EXPLAIN"] = "Pasirinkite kelis objektus, kuriuos robotas turi gabenti. Spustelėkite žymimąjį langelį, jei norite, kad šis skaičius būtų neribotas.";

ui_lt["UPDATE BLOCKLY CONTENT"] = "Šis pasaulis turi tam tikrą numatytoji blokelių aplinkos turinį. Jei norite pakeisti dabartinį blokelių turinį, spustelėkite mygtuką";
ui_lt["UPDATE BLOCKLY BUTTON"] = "Pakeisti esamus blokelius";
ui_lt["Contents from World"] = "Turinys iš pasaulio";

ui_lt["WARNING: Do not change this comment."] = "DĖMESIO: Nepakeiskite šio komentaro.";
ui_lt["Library Code is below."] = "Bibliotekos kodas yra žemiau.";
ui_lt["No solution can be saved when using REPL (Py)."] = "Naudojant REPL (Py) negalima išsaugoti jokio sprendimo.";
ui_lt["No solution can be loaded when using REPL (Py)."] = "Naudojant REPL (Py) negalima įkelti jokio sprendimo.";

ui_lt["You are not allowed to use <code>done</code> in this world!"] = "Šiame pasaulyje neleidžiama naudoti <code>done()</code>!";
ui_lt["Execution ended before the <em>Post</em> code was executed."] = "Vykdymas baigėsi prieš įvykdant <em>Post</em> kodą.";

ui_lt["Difficulty level"] = "Sunkumo lygis";

ui_lt["Expected result"] = "Laukiami rezultatai";
ui_lt["Differences highlighted"] = "Skirtumai paryškinti";
ui_lt["Actual result"] = "Gautas rezultatas";

ui_lt["Cannot parse progress file."] = "Nepavyksta apdoroti progreso failo.";
ui_lt["Cannot merge progress."] = "Nepavyksta sujungti progresą.";
ui_lt["No solution found for this world."] = "Šiam pasauliui nerastas joks sprendimas.";

ui_lt["THINKING"] = "Galvoju...";

},{}],104:[function(require,module,exports){
// the following is used in a few places below
var mac_user_save_files_en = ' <b>Mac users:</b> please see <a href="https://github.com/aroberge/reeborg/blob/master/dev_tools/known_problems.md" target="_blank" rel="noopener">Known problems</a>.';

exports.ui_pl = ui_pl = {};
exports.pl_to_en = pl_to_en = {};

ui_pl["pl-en"] = "Mixed mode: User Interface in Polish; programming language in English.<br>" +
    "Tryb mieszany: interfejs użytkownika w języku polskim; język programowania w języku angielskim.";

ui_pl["SITE NAME"] = "Świat Reeborga";
ui_pl["WORLD INFO"] = "Informacje";
ui_pl["EDITOR VISIBLE"] = "Zostaw Edytor Widoczny";

ui_pl["apple"] = "jabłko";
ui_pl["banana"] = "banan";
ui_pl["beeper"] = "brzęczyk";
ui_pl["box"] = "pudełko";
ui_pl["bridge"] = "most";
ui_pl["carrot"] = "marchewka";
ui_pl["daisy"] = "stokrotka";
ui_pl["dandelion"] = "mlecz";
ui_pl["leaf"] = "liść";
ui_pl["square"] = "kwadrat";
ui_pl["star"] = "gwiazda";
ui_pl["strawberry"] = "truskawka";
ui_pl["token"] = "token";
ui_pl["tokens are Reeborg's favourite thing."] = "Reeborg uwielbia tokeny";
ui_pl["triangle"] = "trójkąt";
ui_pl["tulip"] = "tulipan";
ui_pl["bucket"] = "wiadro";
ui_pl["bulb"] = "żarówka";

ui_pl["bricks"] = "bricks";  // translation needed
pl_to_en["bricks"] = "bricks";


pl_to_en["jabłko"] = "apple";
pl_to_en["banan"] = "banana";
pl_to_en["brzęczyk"] = "beeper";
pl_to_en["pudełko"] = "box";
pl_to_en["most"] = "bridge";
pl_to_en["marchewka"] = "carrot";
pl_to_en["stokrotka"] = "daisy";
pl_to_en["mlecz"] = "dandelion";
pl_to_en["liść"] = "leaf";
pl_to_en["kwadrat"] = "square";
pl_to_en["gwiazda"] = "star";
pl_to_en["truskawka"] = "strawberry";
pl_to_en["token"] = "token";
pl_to_en["trójkąt"] = "triangle";
pl_to_en["tulipan"] = "tulip";
pl_to_en["wiadro"] = "bucket";
pl_to_en["żarówka"] = "bulb";

ui_pl["mud"] = "błoto";
ui_pl["soil"] = "gleba";
ui_pl["water"] = "woda";
ui_pl["grass"] = "trawa";
ui_pl["gravel"] = "żwir";
ui_pl["ice"] = "lód";
ui_pl["fire"] = "ogień";

pl_to_en["błoto"] = "mud";
pl_to_en["gleba"] = "soil";
pl_to_en["woda"] = "water";
pl_to_en["trawa"] = "grass";
pl_to_en["żwir"] = "gravel";
pl_to_en["lód"] = "ice";
pl_to_en["ogień"] = "fire";

ui_pl["infinite"] = "infinite number";

ui_pl["fence_right"] = "płotek_po_prawa";
ui_pl["fence_left"] = "płotek_po_lewo";
ui_pl["fence_vertical"] = "płotek_pionowy";
ui_pl["fence_double"] = "podwójny_płotek";

pl_to_en["płotek_po_prawa"] = "fence_right";
pl_to_en["płotek_po_lewo"] = "fence_left";
pl_to_en["płotek_pionowy"] = "fence_vertical";
pl_to_en["podwójny_płotek"] = "fence_double";

ui_pl["Invalid Javascript code in Onload editor"] = "Niewłaściwie załadowany kod Javascript, skontaktuj się ze stwórcą tego świata.";
ui_pl["Invalid Python code in Onload editor"] = "Niewłaściwie załadowany kod Python-a, skontaktuj się ze stwórcą tego świata.";
ui_pl["Too many steps:"] = "Za dużo kroków: {max_steps}<br>Use <code>set_max_nb_steps(nb)</code> by zwiększyć limit.";
ui_pl["<li class='success'>Reeborg is at the correct x position.</li>"] = "<li class='success'>Reeborg jest we właściwej pozycji x.</li>";
ui_pl["<li class='failure'>Reeborg is at the wrong x position.</li>"] = "<li class='failure'>Reeborg jest w złej pozycji x.</li>";
ui_pl["<li class='success'>Reeborg is at the correct y position.</li>"] = "<li class='success'>Reeborg jest we dobrej pozycji y.</li>";
ui_pl["<li class='failure'>Reeborg is at the wrong y position.</li>"] = "<li class='failure'>Reeborg jest w złej pozycji y.</li>";
ui_pl["<li class='success'>All objects are at the correct location.</li>"] = "<li class='success'>Wszystkie obiekty są w dobrym miejscu.</li>";
ui_pl["<li class='failure'>One or more objects are not at the correct location.</li>"] = "<li class='failure'>Jeden lub więcej obiektów nie jest na swoim miejscu.</li>";
ui_pl["<li class='success'>All walls have been built correctly.</li>"] = "<li class='success'>Wszystkie ściany zostały wybudowane poprawnie.</li>";
ui_pl["<li class='failure'>One or more walls missing or built at wrong location.</li>"] = "<li class='failure'>Brakuje jednej lub więcej ścian, bądź są w złej lokalizacji.</li>";
ui_pl["Last instruction completed!"] = "Ostatnia instrukcja wykonana!";
ui_pl["<p class='center'>Instruction <code>done()</code> executed.</p>"] = "<p class='center'>Instrukcja <code>done()</code> wykonana.</p>";

ui_pl["Unknown object"] = "Nieznany obiekt: <code>{obj}</code>";
ui_pl["No object found here"] = "Nie znaleziono obiektu: <code>{obj}</code>";
ui_pl["object"] = "obiekt";
ui_pl["I don't have any object to put down!"] = "Nie mam żadnych <code>{obj}</code> do odłożenia!";
ui_pl["There is already a wall here!"] = "Tu już stoi mur!";
ui_pl["There is no wall to remove!"] = "Tu nie ma muru do usunięcia!";
ui_pl["Ouch! I hit a wall!"] = "Ou! Uderzyłem w mur!";
ui_pl["Done!"] = "Skończone!";
ui_pl["There is no position as a goal in this world!"] = "Lokalizacja celu na tym świecie nie jest ustalona!";
ui_pl["There is no goal in this world!"] = "Nie ma ustalonego celu na tym świecie!";
ui_pl["I carry too many different objects. I don't know which one to put down!"] = "Trzymam zbyt dużo obiektów! Nie wiem który odłożyć!";
ui_pl["Many objects are here; I do not know which one to take!"] = "Tu jest zbyt dużo obiektów, nie wiem który mam wziać!";

ui_pl.east = "wschód";
ui_pl.north = "północ";
ui_pl.west = "zachód";
ui_pl.south = "południe";
ui_pl["Unknown orientation for robot."] = "Nieznana orientacja dla robota.";

pl_to_en["wschód"] = "east";
pl_to_en["północ"] = "north";
pl_to_en["zachód"] = "west";
pl_to_en["południe"] = "south";

ui_pl["Invalid position."] = "{pos} jest niewłaściwą pozycją.";
ui_pl["Invalid orientation."] = "'{orient}' jest nieznaną orientacją.";

ui_pl["World selected"] = "Świat {world} wybrany";
ui_pl["Could not find world"] = "Nie można znaleźć światu {world}";
ui_pl["Object names"] = " biblioteka, token, gwiazda, trójkąt, kwadrat, etc.";

ui_pl["Invalid world file."] = "Nieprawidłowy plik świata.";
ui_pl["PERMALINK"] = "PERMALINK";
ui_pl["Could not find link: "] = "Nie można znaleźć link-u : ";

ui_pl["Click on world to move robot."] = "Kliknij na świat by dodać bądź usunąć możliwą pozycje startową Reeborga.";
ui_pl["Added robot."] = "Dodano Reeborga.";
ui_pl["Click on image to turn robot"] = "Kliknij na obrazek by obrócić Reeborga";
ui_pl["Robot now has tokens."] = "Reeborg ma teraz {x_tokens} tokenów.";
ui_pl["Click on world to add object."] = "Kliknij na świat by ustawić <code>{obj}</code>.";
ui_pl["Click on desired object below."] = "Kliknij na porządany obiekt poniżej.";
ui_pl["Click on world to toggle walls."] = "Kliknij na świat by dodać mury.";
ui_pl["Click on world to set home position for robot."] = "Kliknij na świat by dodać/usunąć możliwą finalną pozycje";
ui_pl["Click on world to toggle additional walls to build."] = "Kliknij na świat by włączyć dodatkowe mury.";
ui_pl["Click on desired goal object below."] = "Kliknij na porządany cel poniżej.";
ui_pl["Click on world to set number of goal objects."] = "Kliknij na świat by dodać numery celów <code>{obj}</code>.";
ui_pl["Enter number of tokens for robot to carry (use inf for infinite number)"] = "Wpisz ilośc tokenów które ma trzymać Reeborg.";
ui_pl[" is not a valid value!"] = " to nie jest prawidłowy numer!";
ui_pl["Enter number of objects desired at that location."] = "Naciśnij na świat by wybrać numer <code>{obj}</code>.";
ui_pl["Objects found here:"] = "Obiekty znalezione tutaj:";
ui_pl["Description"] = "Opisy";
ui_pl["A robot located here carries no objects."] = "Robot położony (x, y) = ({x}, {y}) nie trzyma żadnych obiektów.";
ui_pl["Goal to achieve:"] = "Cele do osiągnięcia:";
ui_pl["A robot located here carries:"] = "Robot położony (x, y) = ({x}, {y}) trzyma:";
ui_pl["random location"] = "losowe położenie";
ui_pl["Enter number of objects to give to robot."] = "Wpisz ilość obiektów <code>{obj}</code> które dasz robotowi.";
ui_pl["Special information about this location:"] = "Specjalne informacje o tej lokacji:";
ui_pl["Click on world to toggle tile."] = "Kliknij na świat by go włączyć <code>{obj}</code> pokrycie.";
ui_pl["Click on desired tile below."] = "Kliknij na pożądaną płytke niżej bądź wyborze kolorów.";
ui_pl["A wall must be built east of this location."] = "Mury muszą być wybudowane na wschód od tej lokalizacji.";
ui_pl["A wall must be built north of this location."] = "Mury muszą być wybudowane na północ od tej lokalizacji.";
ui_pl["A wall must be built west of this location."] = "Mury muszą być wybudowane na zachód od tej lokalizacji.";
ui_pl["A wall must be built south of this location."] = "Mury muszą być wybudowane na południe od tej lokalizacji.";
ui_pl["The final required position of the robot will be chosen at random."] = "Finalna wymagana pozycja robota będzie wygenerowana losowo .";
ui_pl["The final position of the robot must be (x, y) = "] = "Finalna pozycja robota musi być na (x, y) = ";
ui_pl["Click on world to fill with given tile."] = "Kliknij na świat by uzupełnić podane kratki.";
ui_pl["Click on desired object below."] = "Kliknij na porządany obiekt poniżej";
ui_pl["Enter url of image to use as background."] = "Zamieść url obrazka by użyć w tle.";
ui_pl["Replace editor content"] = "Czy chcesz przenieść swój edytor kodu na zapewniony Ci przez stwórce świata?";
ui_pl["Replace library content"] = "Czy chcesz przenieść swoją bibioteke kodów na zapewnioną Ci przez stwórce świata?";
ui_pl["colour"] = "color";

ui_pl["Name already exist; confirm that you want to replace its content."] = "Nazwa już istnieje; potwierdź, że chcesz zamienić zawartość.";
ui_pl["No such world!"] = "Nie ma takiego świata!";
ui_pl["Enter world name to save"] = "Wpisz nazwe świata by zapisać; imiona są używane: ";
ui_pl["Enter world name to delete"] = "Wpisz nazwe świata by usunąć; istniejący świat: ";
ui_pl["Delete "] = "usuń";

ui_pl["Error found at or near line {number}."] = "Błąd znaleziony na pobliskiej lini {number}.";
ui_pl["<br>Perhaps a missing colon is the cause."] = "<br>Być może brauje dwukropka.";
ui_pl["<br>Perhaps you forgot to add parentheses ()."] = "<br>Być może zapomniałeś wstawić nawiasów().";
ui_pl["<br>Perhaps you misspelled a word or forgot to define a function or a variable."] = "<br>Być możę źle napisałeś źle słowo, zapomniałeś zdefiniować funkcje bądź zmienną.";
ui_pl["I cannot help you with this problem."] = "Nie mogę Ci pomóc z tym problemem.";

ui_pl["I'm stuck in mud."] = "Utknąłem w błocie.";
ui_pl["Mud: Reeborg <b>cannot</b> detect this and will get stuck if it moves to this location."] = "Błoto: Reeborg <b>cannot</b> Dostrzegnij to, utkniesz jak jeżeli to przeniesie się do tej lokalizacji";
ui_pl["Soil: usually safe, but looks identical to mud."] = "Gleba: zazwyczaj bezpieczne, ale wygląda zupełnie jak błoto.";
ui_pl["I'm slipping on ice!"] = "Ślizgam się na lodzie!";
ui_pl["Ice: Reeborg <b>cannot</b> detect this and <em>might</em> slide and move to the next location if it moves to this location."] = "Lód: Reeborg <b>cannot</b> zwracaj na to uwage <em>might</em> ślizgnij się i przenieś na następną pozycje jeżeli to przeniesie się do tej lokacji.";
ui_pl["Grass: usually safe."] = "Trawa: raczej bezpieczna.";
ui_pl["Gravel: usually safe."] = "Żwir: najczęściej bezpieczny.";
ui_pl["I'm in water!"] = "Jestem w wodzie!";
ui_pl["Water: Reeborg <b>can</b> detect this but will get damaged if it moves to this location."] = "Woda: Reeborg <b>can</b> spójrz na to ale coś Ci się stanie, jeżeli to przemieści Się tutaj.";
ui_pl["green home tile: Reeborg <b>can</b> detect this tile using at_goal()."] = "płytka zielonego domu: Reeborg <b>can</b> zwróć uwagę na to w_celu().";
ui_pl["Crash!"] = "Wypadek!";
ui_pl["brick wall: Reeborg <b>can</b> detect this but will hurt himself if he attemps to move through it."] = "Ceglany Mur: Reeborg <b>can</b> spójrz na to, ale ma skrzywdzi go, jeżeli będzie próbował w to wejść.";
ui_pl["I hit a fence!"] = "Uderzyłem w płotek!";
ui_pl["Fence: Reeborg <b>can</b> detect this but will be stopped by it."] = "Płotek: Reeborg <b>can</b> spójrz na to, ale on zostanie przez to zatrzymany.";
ui_pl["Bridge:Reeborg <b>can</b> detect this and will know that it allows safe passage over water."] = "Most: Reeborg <b>can</b> spójrz, to umożliwi bezpieczne przejście nad wodą.";
ui_pl["My joints are melting!"] = "Moje stawy się topią!";
ui_pl["A bucket full of water."] = "Wiadro pełne wody.";
ui_pl["Tulip bulb: might grow into a nice tulip with some water from a bucket."] = "Tulipanowa żarówka: może urosnąć w ładnym tulipanie z jakimś wiaderkiem wody.";


ui_pl["Something is blocking the way!"] = "Coś mi blokuje droge!";
ui_pl["Reeborg <b>can</b> detect this tile using at_goal()."] = "Reeborg <b>can</b> patrz na to używając w_celu().";
ui_pl["green home tile:"] = "płytka zielonego domu:";
ui_pl["home:"] = "dom:";
ui_pl["racing flag:"] = "flaga wyścigowa:";
ui_pl["house:"] = "dom:";

ui_pl["Local variables"] = "Lokalne zmienne";
ui_pl["Global variables"] = "Globalne zmienne";
ui_pl["Watched expressions"] = "Oglądane wyrażenia";

ui_pl["move forward"] = "ruch naprzód";
ui_pl["turn left"] = "obróć w lewo";
ui_pl["take object"] = "weź obiekt";
ui_pl["put object"] = "połóż obiekt";
ui_pl["Pause the program's execution."] = "Zastopuj wykonywane przez program czynności.";
ui_pl["Build a wall in front of the robot."] = "Wybuduj mur na przeciwko robota.";
ui_pl["End the program's execution."] = "Zakończ wykonywane przez program czynności.";
ui_pl["True if a wall is blocking the way."] = "Prawda jeżeli mur blokuje droge";
ui_pl["True if nothing is blocking the way."] = "Prawda jeżeli nic nie blokuje drogi.";
ui_pl["True if desired destination."] = "Prawda, jeżeli porządany cel.";
ui_pl["True if robot carries at least one object."] = "Prawda jeżeli robot trzymał chociaż jeden obiekt jeden obiekt.";
ui_pl["True if there is at least one object here."] = "Prawda jeżeli robot był chociaż jeden obiekt tutaj.";
ui_pl["True if robot is facing North."] = "Prawda jeżeli robot jest skierowany na północ.";
ui_pl["Delay between actions; default is 300 ms."] = "Opóźnienie pomiędzy akcjami; zaniedbanie wynosi 300 ms.";

ui_pl["Save world in browser"] = "Zapisz świat w przeglądarce";
ui_pl["LOAD BLOCKLY"] = "Zaimportuj program (blocks) z pliku";
ui_pl["LOAD BLOCKLY EXPLAIN"] = "Otwórz lokalne pliki i użyj ich zawartości by przenieść zawartość przestrzeni roboczej Blockly.";
ui_pl["LOAD EDITOR"] = "Zaimportuj program z plików";
ui_pl["LOAD EDITOR EXPLAIN"] = "Otwórz lokalne pliki i użyj ich zawartości by przenieść zawartość Edytora Kodu.";
ui_pl["LOAD LIBRARY"] = "Import library from a file";
ui_pl["LOAD LIBRARY EXPLAIN"] = "Otwórz lokalne pliki i użyj ich zawartości by przenieść zawartość bierzącej zawartości Biblioteki.";
ui_pl["LOAD WORLD"] = "Załaduj świat z pliku";
ui_pl["LOAD WORLD EXPLAIN"] = "Załaduj świat z pliku na Twoim komputerze.";
ui_pl["SAVE BLOCKLY"] = "Zapisz program do pliku";
ui_pl["SAVE BLOCKLY EXPLAIN"] = "Zapisz bierzące bloki w pliku." + mac_user_save_files_en;
ui_pl["SAVE EDITOR"] = "Zapisz program do pliku";
ui_pl["SAVE EDITOR EXPLAIN"] = "Zapisz zawartość edytora w pliku." + mac_user_save_files_en;
ui_pl["SAVE LIBRARY"] = "Zapisz biblioteke";
ui_pl["SAVE LIBRARY EXPLAIN"] = "Zapisz zawartość biblioteki w pliku." + mac_user_save_files_en;
ui_pl["SAVE WORLD"] = "Zapisz świat w pliku";
ui_pl["SAVE WORLD EXPLAIN"] = "Zapisz świat (jako json obiekt) w pliku na Twoim komputerze." + mac_user_save_files_en;

ui_pl["PROGRESS SECTION TITLE"] = "Keeping track of tasks solved";
ui_pl["PROGRESS EXPLAIN"] = "Tasks solved are marked with " + RUR.CHECKMARK +
    "in the world selector and the information is saved in your browser. If you use a different browser, " +
    "the tasks you have already solved using a different browser will not be shown. " +
    "If you click on the save button below, a file named progress.json will be saved with the tasks solved " +
    "recorded in the current browser. You can import this file in a different browser so that your progress can be updated.";
ui_pl["SAVE PROGRESS"] = "Save";
ui_pl["IMPORT PROGRESS"] = "Import";
ui_pl["RETRIEVE SOLUTION"] = "Retrieve solution";
ui_pl["RETRIEVE SOLUTION EXPLAIN"] = "If a solution (blocks, or code and possibly code in library) for this world has been saved in the browser for the current programming mode, it will be retrieved and replace the current content.";


ui_pl["ADD CONTENT TO WORLD"] = "Dodaj zawartość do świata z wybranych przedmiotów poniżej.";
ui_pl["ADD BLOCKLY TEXT"] = "Bloki kodujące";
ui_pl["ADD EDITOR TEXT"] = "Kod w edytorze";
ui_pl["ADD LIBRARY TEXT"] = "Biblioteka";
ui_pl["ADD PRE TEXT"] = "Przed";
ui_pl["ADD POST TEXT"] = "Stanowisko";
ui_pl["ADD DESCRIPTION TEXT"] = "Opis";
ui_pl["ADD ONLOAD TEXT"] = "Onload";

ui_pl["KEYBOARD BUTTON"] = "klawiatura Reeborga";
ui_pl["ADDITIONAL OPTIONS"] = "Dodatkowe opcje";

ui_pl["BASIC COMMANDS"] = "Podstawowe komendy";
ui_pl["DEFINING"] = "Określający";
ui_pl["LOOPS"] = "Pętle";
ui_pl["DECISIONS"] = "Decyzje";
ui_pl["CONDITIONS"] = "Warunki";
ui_pl["USING VARIABLES"] = "Używane zmienne";
ui_pl["COMMANDS"] = "Komendy";
ui_pl["OTHER"] = "Inne";
ui_pl["OBJECTS"] = "Obiekty";

ui_pl["Python Code"] = "Kod Pythona";
ui_pl["Javascript Code"] = "Kod Javascript";
ui_pl["LIBRARY"] = "biblioteka";
ui_pl["EXTRA"] = "extra";
ui_pl["PRE"] = "Przed";
ui_pl["POST"] = "Stanowisko";
ui_pl["DESCRIPTION"] = "Desc.";
ui_pl["ONLOAD"] = "Onload";

ui_pl["HIGHLIGHT IMPOSSIBLE"] = "Problem z Twoim kodem spowodował wyłączenie podświetlenia kodu.";
ui_pl["COMMAND RESULT"] = "Wybierz akcje do wykonania z menu poniżej.";

ui_pl["DELETE WORLD TEXT"] = "Bierzące przekazania dla świata zostały składowane w przeglądarce, możesz je usunąć:";
ui_pl["PYTHON ONLY"] = "Tylko Python";
ui_pl["COLLABORATION"] = "Współpraca";
ui_pl["TOGETHERJS EXPLAIN"] = "Narzędzia któ©e pozwalają współpracować z jednym bądź wiecej użytkownikiem Mozilla's TogetherJS. Nie działa z Blockly.";
ui_pl["WORLD CREATION TITLE"] = "Świat: stworzenie, edytowanie, ...";
ui_pl["EDIT WORLD"] = "Edytuj świat";
ui_pl["EDIT WORLD EXPLAIN"] = "Możesz stworzyć swój świat edytująć bierzący.";
ui_pl["PROGRAM IN EDITOR"] = "Program w edytorze";
ui_pl["PROGRAM IN BLOCKLY WORKSPACE"] = "Program w przestrzeni roboczej blockly";
ui_pl["CONTACT"] = "(Tylko Angielski/Francuski) Email:";
ui_pl["ISSUES"] = "Raporty bugów, sugestie, inne sprawy, etc. (Tylko Angielski/Francuski)";
ui_pl["FORUM"] = "Forum dyskusyje (Tylko Angielski/Francuski)";
ui_pl["HELP"] = "Pomoc";
ui_pl["DOCUMENTATION"] = '<a href="http://reeborg.ca/docs/en" target="_blank" rel="noopener">Documentation</a>';
ui_pl["PYTHON HELP"] = "Używając Pythona, wykonaj program <code>help()</code> by dostać liste komend bądź <code>help(move)</code> by dostać pomoc w <code>move()</code> funkcje, etc.";
ui_pl["KEYBOARD HELP"] = "Kliknij na klawiature Reeborga by zobaczyć osiągalne komendy, klawiatura Pythona, etc.";

ui_pl["WORLD EDITOR"] = "Edytor świata";
ui_pl["m-east"] = "Wschód";
ui_pl["m-north"] = "Północ";
ui_pl["m-west"] = "Zachód";
ui_pl["m-south"] = "Połódnie";
ui_pl["m-random"] = "Losowo";
ui_pl["m-dimensions"] = "Wymiary świata";
ui_pl["m-add"] = "Dodaj";
ui_pl["m-add-robot"] = "Dodaj robota";
ui_pl["m-robot"] = "Robot";
ui_pl["m-position"] = "Pozycja(s)";
ui_pl["m-turn"] = "Obrót";
ui_pl["m-objects"] = "Obiekty";
ui_pl["m-walls"] = "Mury";
ui_pl["m-objects2"] = "Obiekty";
ui_pl["m-tiles"] = "Płytki";
ui_pl["m-fill"] = "Wypełnić";
ui_pl["m-solid"] = "Przeszkody";
ui_pl["m-decorative"] = "Dekoracyjne obiekty";
ui_pl["m-background"] = "Obrazek w tle";
ui_pl["m-goal"] = "Cel";
ui_pl["mg-robot"] = "Robot";
ui_pl["mg-walls"] = "Mury";
ui_pl["mg-objects"] = "Obiekty";

ui_pl["Reeborg says: I'm done!"] = "Reeborg powiedział: Skończyłem!";
ui_pl["Reeborg writes:"] = "Reeborg pisze:";
ui_pl["Reeborg shouts: Something is wrong!"] = "Reeborg krzyknął: Coś jest źle!";
ui_pl["Reeborg explores some Javascript code"] = "Reeborg odkrywa jakiś kod Javascript";
ui_pl["Reeborg states:"] = "Reeborg państwo:";
ui_pl["Reeborg watches some variables!"] = "Reeborg ogląda jakieś zmienne!";
ui_pl["Click on the world to get some additional information."] = "Kliknij na świat by dostać jakieś dodatkowe informacje.";

ui_pl["Reeborg's basic keyboard"] = "Podstawowa klawiatura Reeborga";
ui_pl["kbd-command-btn"] = "Komendy";
ui_pl["kbd-condition-btn"] = "Warunki";
ui_pl["kbd-python-btn"] = "Python";
ui_pl["kbd-py-console-btn"] = "Python";
ui_pl["kbd-javascript-btn"] = "Javascript";
ui_pl["kbd-objects-btn"] = "Obiekty";
ui_pl["kbd-special-btn"] = "Specialne";

ui_pl["UNDO"] = "UNDO";
ui_pl["REDO"] = "REDO";
ui_pl["tab"] = "TAB";
ui_pl["shift-tab"] = "Shift-TAB";
ui_pl["enter"] = "\u23CE";
ui_pl["<code>repeat</code> is not a true Python keyword."] = "<code>repeat</code> nie jest prawdziwą klawiaturą Pythona.";

ui_pl["Colour:"] = "Kolor:";
ui_pl["Enter a colour"] = "Dodaj kolor";

ui_pl["Background image"] = "Obrazek w tle";

ui_pl["NAME:"] = "Imię:";
ui_pl["Save world in browser"] = "Zapisz świat w przeglądarce";

ui_pl["Set the world's dimensions"] = "Wybierz wymiary świata";
ui_pl["set-dimensions-explain"] = "Jeśli chcesz, możesz zmienić wymiar świata z początkowego na inny. Pamiętaj, że mniejsza rozdzielczość ekranu może nie być odpowiednia do odpalenia większych światów.";
ui_pl["Maximum x value:"] = "Maksymalna wartość x:";
ui_pl["Maximum y value:"] = "Maksymalna wartość y:";
ui_pl["Use small tiles"] = "Użyj małych płytek";

ui_pl["Set goal number for object"] = "Wybierz numer celu dla obiektu";
ui_pl["dialog-goal-object-explain"] = "Klinij na checkboxa jeżeli chcesz tą ilość by była równa z ilościa wszystkich obiektów znajdujących się na początku w świecie";
ui_pl["Number of objects"] = "Numer obiektu";
ui_pl["All such objects"] = "Wszystkie obiekty";

ui_pl["Number of objects:"] = "Ilośc obiektów:";
ui_pl["Maximum:"] = "Maksimum:";
ui_pl["Add object in the world"] = "Wybierz ilość obiektów";
ui_pl["ADD OBJECT EXPLAIN"] = "Wybierz zero by usunąć wszystkie obiekty z tego położenia. Jeżeli <code>Maximum</code> jest ustawiony na wartość większą niż <code>Number of objects</code>, ilość obiektów pomiędzy tymi dwoma wartościami zostanie wygenerowana losowo, gdy program zacznie działać.";

ui_pl["Unlimited:"] = "Nielimitowany:";
ui_pl["Give object to robot"] = "Daj obiekt robotowi";
ui_pl["GIVE OBJECT EXPLAIN"] = "Wybierz liczbe przedmiotów, które ma trzymać robot. Kliknij na checkboxa jeżeli chcesz, by ta ilośc była nielimitowana.";

ui_pl["UPDATE BLOCKLY CONTENT"] = "Ten świat ma domyślne przestrzenie robocze dla bloków. By przenieść bierzącą zawartość bloków, kliknij na przycisk";
ui_pl["UPDATE BLOCKLY BUTTON"] = "Przenieś istniejące bloki";
ui_pl["Contents from World"] = "Zawartośc ze świata";

ui_pl["WARNING: Do not change this comment."] = "WARNING: Do not change this comment.";
ui_pl["Library Code is below."] = "Library Code is below.";
ui_pl["No solution can be saved when using REPL (Py)."] = "No solution can be saved when using REPL (Py).";
ui_pl["No solution can be loaded when using REPL (Py)."] = "No solution can be loaded when using REPL (Py).";

ui_pl["You are not allowed to use <code>done</code> in this world!"] = "You are not allowed to use <code>done()</code> in this world!";
ui_pl["Execution ended before the <em>Post</em> code was executed."] = "Execution ended before the <em>Post</em> code was executed.";

ui_pl["Difficulty level"] = "Difficulty level";

ui_pl["Expected result"] = "Expected result";
ui_pl["Differences highlighted"] = "Differences highlighted";
ui_pl["Actual result"] = "Actual result";

ui_pl["Cannot parse progress file."] = "Cannot parse progress file.";
ui_pl["Cannot merge progress."] = "Cannot merge progress.";
ui_pl["No solution found for this world."] = "No solution found for this world.";

ui_pl["THINKING"] = "Thinking ...";

},{}],105:[function(require,module,exports){
// the following is used in a few places below
var mac_user_save_files_en = ' <b>Mac:</b> Por favor consulte <a href="https://github.com/aroberge/reeborg/blob/master/dev_tools/known_problems.md" target="_blank" rel="noopener">problema conhecido</a>.';

exports.ui_pt = ui_pt = {};
exports.en_to_pt = en_to_pt = {};
exports.pt_to_en = pt_to_en = {};

ui_pt["pt-en"] =  "Modo Misto: Interface em Português; Linguagem de programação em Inglês." +
                  "Mixed mode: User Interface in Portuguese; programming language English.<br>";

ui_pt["SITE NAME"] = "Mundo de Reeborg";
ui_pt["WORLD INFO"] = "Info sobre Mundo";
ui_pt["EDITOR VISIBLE"] = "Mostrar Editor";

ui_pt["apple"] = en_to_pt["apple"] = "maçã";
ui_pt["banana"] = en_to_pt["banana"] = "banana";
ui_pt["beeper"] = en_to_pt["beeper"] = "bipe";
ui_pt["box"] = en_to_pt["box"] = "caixa";
ui_pt["bridge"] = en_to_pt["bridge"] = "ponte";
ui_pt["carrot"] = en_to_pt["carrot"] = "cenoura";
ui_pt["daisy"] = en_to_pt["daisy"] = "margarida";
ui_pt["dandelion"] = en_to_pt["dandelion"] = "dente de leão";
ui_pt["leaf"] = en_to_pt["leaf"] = "folha";
ui_pt["square"] = en_to_pt["square"] = "quadrado";
ui_pt["star"] = en_to_pt["star"] = "estrela";
ui_pt["strawberry"] = en_to_pt["strawberry"] = "morango";
ui_pt["token"] = en_to_pt["token"] = "ficha";
ui_pt["tokens are Reeborg's favourite thing."] = "fichas são as coisas favoritas de Reeborg.";
ui_pt["triangle"] = en_to_pt["triangle"] = "triângulo";
ui_pt["tulip"] = en_to_pt["tulip"] = "tulipa";
ui_pt["bucket"] = en_to_pt["bucket"] = "cesta";
ui_pt["bulb"] = en_to_pt["bulb"] = "bulbo";
ui_pt["bricks"] = en_to_pt["bricks"] = "tijolos";

ui_pt["mud"] = en_to_pt["mud"] = "lama";
ui_pt["soil"] = en_to_pt["soil"] = "solo";
ui_pt["water"] = en_to_pt["water"] = "agua";
ui_pt["grass"] = en_to_pt["grass"] = "grama";
ui_pt["gravel"] = en_to_pt["gravel"] = "cascalho";
ui_pt["ice"] = en_to_pt["ice"] = "gelo";
ui_pt["fire"] = en_to_pt["fire"] = "fogo";

ui_pt["infinite"] = "Infinito";
ui_pt["fence_right"] = en_to_pt["fence_right"] = "cerca_a_direita";
ui_pt["fence_left"] = en_to_pt["fence_left"] = "cerca_a_esquerda";
ui_pt["fence_vertical"] = en_to_pt["fence_vertical"] = "cerca_vertical";
ui_pt["fence_double"] = en_to_pt["fence_double"] = "cerca_dupla";

ui_pt["Invalid Javascript code in Onload editor"] = "Código Javascript inválido no Editor.";
ui_pt["Invalid Python code in Onload editor"] = "Código Python inválido no Editor.";

ui_pt["Too many steps:"] = "Muitos passos: {max_steps}<br>Use <code>set_max_nb_steps(nb)</code> como máximo de passos.";
ui_pt["<li class='success'>Reeborg is at the correct x position.</li>"] = "<li class='success'>Reeborg está na posição x correta.</li>";
ui_pt["<li class='failure'>Reeborg is at the wrong x position.</li>"] = "<li class='failure'>Reeborg está na posição x incorreta.</li>";
ui_pt["<li class='success'>Reeborg is at the correct y position.</li>"] = "<li class='success'>Reeborg está na posição y correta.</li>";
ui_pt["<li class='failure'>Reeborg is at the wrong y position.</li>"] = "<li class='failure'>Reeborg está na posição y incorreta.</li>";
ui_pt["<li class='success'>All objects are at the correct location.</li>"] = "<li class='success'>Todos objetos estão na posição correta.</li>";
ui_pt["<li class='failure'>One or more objects are not at the correct location.</li>"] = "<li class='failure'>Um ou mais objetos não estão na posição correta.</li>";
ui_pt["<li class='success'>All walls have been built correctly.</li>"] = "<li class='success'>Todas as paredes foram construídas corretamente.</li>";
ui_pt["<li class='failure'>One or more walls missing or built at wrong location.</li>"] = "<li class='failure'>Uma ou mais paredes foram construídas em posição incorreta.</li>";
ui_pt["Last instruction completed!"] = "Última instrução completa.";
ui_pt["<p class='center'>Instruction <code>done()</code> executed.</p>"] = "<p class='center'>Instrução <code>done()</code> executada.</p>";

ui_pt["Unknown object"] = "Objeto desconhecido: <code>{obj}</code>";
ui_pt["No object found here"] = "Nenhum objeto encontrado aqui!";
ui_pt["object"] = "Objeto";
ui_pt["I don't have any object to put down!"] = "Não tenho nenhum objeto para colocar.";
ui_pt["There is already a wall here!"] = "Existe uma parede aqui!";
ui_pt["There is no wall to remove!"] = "Não existe parede para ser removida!";
ui_pt["Ouch! I hit a wall!"] = "Opa! Bati em uma parede.";
ui_pt["Done!"] = "Feito!";
ui_pt["There is no position as a goal in this world!"] = "Não existe posição de chegada neste mundo!";
ui_pt["There is no goal in this world!"] = "Não existe chegada neste mundo!";
ui_pt["I carry too many different objects. I don't know which one to put down!"] = "Estou carregando vários objetos diferentes. Eu não sei qual deles deixar aqui!";
ui_pt["Many objects are here; I do not know which one to take!"] = "Muitos objetos estão aqui. Não sei qual deles pegar!";

ui_pt.east = en_to_pt.east = "Leste";
ui_pt.north = en_to_pt.north = "Norte";
ui_pt.west = en_to_pt.west = "Oeste";
ui_pt.south = en_to_pt.south = "Sul";
ui_pt["Unknown orientation for robot."] = "Orientação desconhecida para o Robô.";

ui_pt["Invalid position."] = "{pos} é uma posição inválida.";
ui_pt["Invalid orientation."] = "'{orient}' é uma orientação inválida.";

ui_pt["World selected"] = "Mundo {world} selecionado.";
ui_pt["Could not find world"] = "Mundo {world} não encontrado";
ui_pt["Object names"] = " library, token, star, triangle, square, etc.";

ui_pt["Invalid world file."] = "Arquivo inválido de Mundo";
ui_pt["PERMALINK"] = "PERMALINK";
ui_pt["Could not find link: "] = "Link não encontrado:";

ui_pt["Click on world to move robot."] = "Clique no mundo para mover Robô.";
ui_pt["Added robot."] = "Reeborg adicionado.";
ui_pt["Click on image to turn robot"] = "Clique na imagem para virar o Robô.";
ui_pt["Robot now has tokens."] = "Robô agora possui {x_tokens} Fichas.";
ui_pt["Click on world to add object."] = "Clique no mundo para adicionar objeto <code>{obj}</code>.";
ui_pt["Click on desired object below."] = "Clique no objeto desejado abaixo.";
ui_pt["Click on world to toggle walls."] = "Clique no mundo para alternar paredes.";
ui_pt["Click on world to set home position for robot."] = "Clique no mundo para definir posição de início do Robô.";
ui_pt["Click on world to toggle additional walls to build."] = "Clique no mundo para adicionar paredes adicionais.";
ui_pt["Click on desired goal object below."] = "Clique no ponto de chegada desejado abaixo.";
ui_pt["Click on world to set number of goal objects."] = "Clique no mundo para definir número de objetivos (pontos de chegada) <code>{obj}</code>.";
ui_pt["Enter number of tokens for robot to carry (use inf for infinite number)"] = "Entre número de fichas que o Robô pode carregar (Entre com Inf para infinito)";
ui_pt[" is not a valid value!"] = " não é um valor válido!";
ui_pt["Enter number of objects desired at that location."] = "Entre número de objetos desejado no local <code>{obj}</code>.";
ui_pt["Objects found here:"] = "Objetos encontrados aqui:";
ui_pt["Description"] = "Descrição";
ui_pt["A robot located here carries no objects."] = "Um Robô localizado aqui (x, y) = ({x}, {y}) não possui objetos.";
ui_pt["Goal to achieve:"] = "Objetivo a ser atingido:";
ui_pt["A robot located here carries:"] = "Um RobÔ localizado aqui (x, y) = ({x}, {y}) carrega:";
ui_pt["random location"] = "Posição aleatória:";
ui_pt["Enter number of objects to give to robot."] = "Entre número de objetos a serem dados para o Robô.";
ui_pt["Special information about this location:"] = "Informação especial sobre essa localização:";
ui_pt["Click on world to toggle tile."] = "Clique no mundo para alternar o bloco.";
ui_pt["Click on desired tile below."] = "Clique no bloco desejado abaixo.";
ui_pt["A wall must be built east of this location."] = "Uma parede deve ser construída a leste desta localização.";
ui_pt["A wall must be built north of this location."] = "Uma parede deve ser construída ao norte desta localização.";
ui_pt["A wall must be built west of this location."] = "Uma parede deve ser construída a oeste desta localização.";
ui_pt["A wall must be built south of this location."] = "Uma parede deve ser construída ao sul desta localização.";
ui_pt["The final required position of the robot will be chosen at random."] = "A posição final do Robô será escolhida aleatoriamente.";
ui_pt["The final position of the robot must be (x, y) = "] = "A posição final do Robô deve ser: (x, y) = ";
ui_pt["Click on world to fill with given tile."] = "Clique no mundo para preencher com o bloco selecionado.";
ui_pt["Click on desired object below."] = "Clique no objeto desejado abaixo.";
ui_pt["Enter url of image to use as background."] = "Entre com URL de imagem a ser usada como imagem de fundo.";
ui_pt["Replace editor content"] = "Alterar conteúdo do editor?";
ui_pt["Replace library content"] = "Alterar conteúdo de biblioteca?";
ui_pt["colour"] = "Cor";

ui_pt["Name already exist; confirm that you want to replace its content."] = "Nome já existente. Confirme a substituição do conteúdo deste nome.";
ui_pt["No such world!"] = "Não existe este mundo!";
ui_pt["Enter world name to save"] = "Entre com o nome do Mundo a ser salvo";
ui_pt["Enter world name to delete"] = "Entre com o nome do Mundo a ser apagado ";
ui_pt["Delete "] = "Apagar ";

ui_pt["Error found at or near line {number}."] = "Erro encontrado na linha {number}.";
ui_pt["<br>Perhaps a missing colon is the cause."] = "<br>Cheque se não está faltando dois pontos [:].";
ui_pt["<br>Perhaps you forgot to add parentheses ()."] = "<br>Cheque se você não esqueceu de adicionar parênteses ().";
ui_pt["<br>Perhaps you misspelled a word or forgot to define a function or a variable."] = "<br>Talvez você tenha digitado uma palavra incorretamente ou esquecido de definir uma variável ou função.";
ui_pt["I cannot help you with this problem."] = "Eu não consigo te ajudar com esse problema.";

ui_pt["I'm stuck in mud."] = "Estou preso na lama.";
ui_pt["Mud: Reeborg <b>cannot</b> detect this and will get stuck if it moves to this location."] = "Lama: Reeborg <b>não pode</b> detectar a lama e irá ficar preso se você caminhar nesta direção.";
ui_pt["Soil: usually safe, but looks identical to mud."] = "Solo: geralmente é seguro, mas parece idêntico a lama.";
ui_pt["I'm slipping on ice!"] = "Estou escorregando no gelo!";
ui_pt["Ice: Reeborg <b>cannot</b> detect this and <em>might</em> slide and move to the next location if it moves to this location."] = "Gelo: Reeborg <b>não pode</b> detectar o gelo e irá escorregar e mover para a próxima posição caso você caminhe nesta direção.";
ui_pt["Grass: usually safe."] = "Grama: normalmente seguro.";
ui_pt["Gravel: usually safe."] = "Cascalho: normalmente seguro.";
ui_pt["I'm in water!"] = "Estou na água!";
ui_pt["Water: Reeborg <b>can</b> detect this but will get damaged if it moves to this location."] = "Água: Reeborg <b>pode</b> detectar a água mas irá se danificar se você mover para essa direção.";
ui_pt["green home tile: Reeborg <b>can</b> detect this tile using at_goal()."] = "Bloco verde: Reeborg <b>pode</b> detectar este bloco usando a função chegou().";
ui_pt["Crash!"] = "Crash!";
ui_pt["brick wall: Reeborg <b>can</b> detect this but will hurt himself if he attemps to move through it."] = "Parede de tijolos: Reeborg <b>pode</b> detectar mas irá se danificar se tentar se mover através da parede.";
ui_pt["I hit a fence!"] = "Atingi uma cerca!";
ui_pt["Fence: Reeborg <b>can</b> detect this but will be stopped by it."] = "Cerca: Reeborg <b>pode</b> detectar a cerca mas será parado ao atingí-la.";
ui_pt["Bridge:Reeborg <b>can</b> detect this and will know that it allows safe passage over water."] = "Ponte: Reeborg <b>pode</b> detectar a ponte e saberá que a ponte permite uma passagem segura sobre a água.";
ui_pt["My joints are melting!"] = "Minhas juntas estão derretendo!";
ui_pt["A bucket full of water."] = "Um balde cheio de água.";
ui_pt["Tulip bulb: might grow into a nice tulip with some water from a bucket."] = "Bulbo de tulipa: Crescerá em uma linda tulipa se for regada com água de um balde.";


ui_pt["Something is blocking the way!"] = "Algo está bloqueando o caminho!";
ui_pt["Reeborg <b>can</b> detect this tile using at_goal()."] = "Reeborg <b>pode</b> detectar esse bloco usando chegou().";
ui_pt["green home tile:"] = "Bloco verde:";
ui_pt["home:"] = "Home:";
ui_pt["racing flag:"] = "Bandeira:";
ui_pt["house:"] = "Casa:";

ui_pt["Local variables"] = "Variáveis locais";
ui_pt["Global variables"] = "Variáveis globais";
ui_pt["Watched expressions"] = "Expressões assistidas";

ui_pt["move forward"] = "mover em frente";
ui_pt["turn left"] = "virar à direita";
ui_pt["take object"] = "Objekt nehmen";
ui_pt["put object"] = "Objekt ablegen";
ui_pt["Pause the program's execution."] = "Pausa a execução do programa.";
ui_pt["Build a wall in front of the robot."] = "Constrói uma parede na frente do Robô.";
ui_pt["End the program's execution."] = "Ausführung des Programms beenden.";
ui_pt["True if a wall is blocking the way."] = "Verdadeiro se uma parede está bloqueando o caminho.";
ui_pt["True if nothing is blocking the way."] = "Verdadeiro se nada está bloqueando o caminho.";
ui_pt["True if desired destination."] = "Verdadeiro se é o destino desejado.";
ui_pt["True if robot carries at least one object."] = "Verdadeiro se o Robô carrega pelo menos um objeto.";
ui_pt["True if there is at least one object here."] = "Verdadeiro se existe pelo menos um objeto aqui.";
ui_pt["True if robot is facing North."] = "Verdadeiro se o Robô está voltado para o Norte.";
ui_pt["Delay between actions; default is 300 ms."] = "Atraso entre ações; default é 300 ms.";

ui_pt["Save world in browser"] = "Salvar mundo no navegador";
ui_pt["LOAD BLOCKLY"] = "Carrega Blockly";
ui_pt["LOAD BLOCKLY EXPLAIN"] = "Explicação do programa de importação de dados.";
ui_pt["LOAD EDITOR"] = "Carrega Editor";
ui_pt["LOAD EDITOR EXPLAIN"] = "Explicação do carregamento do editor";
ui_pt["LOAD LIBRARY"] = "Carrega Biblioteca";
ui_pt["LOAD LIBRARY EXPLAIN"] = "Explica o carregamento de biblioteca.";
ui_pt["LOAD WORLD"] = "Carrega Mundo";
ui_pt["LOAD WORLD EXPLAIN"] = "Explica o carregamento de mundo.";
ui_pt["SAVE BLOCKLY"] = "Salva Blockly";
ui_pt["SAVE BLOCKLY EXPLAIN"] = "Explica o salvamento de blockly." + mac_user_save_files_en;
ui_pt["SAVE EDITOR"] = "Salva Editor";
ui_pt["SAVE EDITOR EXPLAIN"] = "Explica o salvamento de Editor" + mac_user_save_files_en;
ui_pt["SAVE LIBRARY"] = "Salva Biblioteca";
ui_pt["SAVE LIBRARY EXPLAIN"] = "Explica o salvamento de biblioteca." + mac_user_save_files_en;
ui_pt["SAVE WORLD"] = "Salva Mundo";
ui_pt["SAVE WORLD EXPLAIN"] = "Explica o salvamento de Mundo." + mac_user_save_files_en;

ui_pt["PROGRESS SECTION TITLE"] = "Título da Seção de Progresso:";
ui_pt["PROGRESS EXPLAIN"] = "As tarefas são resolvidas com " + RUR.CHECKMARK +
    "e as informações são salvas no seu navegador. Se você usar outro navegador " +
    "as tarefas que você resolveu em outro navegador não serão mostradas. " +
    "Se você clicar no botão salvar abaixo, um arquivo chamado progress.json com as tarefas resolvidas será salvo " +
    "no navegador atual. Você pode importar este arquivo para outro navegador para que seu progresso possa ser atualizado.";
ui_pt["SAVE PROGRESS"] = "Salvar Progresso";
ui_pt["IMPORT PROGRESS"] = "Importar Progresso";
ui_pt["RETRIEVE SOLUTION"] = "Revelar Solução";
ui_pt["RETRIEVE SOLUTION EXPLAIN"] = "Mostra solução para as tarefas deste mundo";

ui_pt["ADD CONTENT TO WORLD"] = "Adicionar conteúdo ao Mundo.";
ui_pt["ADD BLOCKLY TEXT"] = "Adicionar código Blockly";
ui_pt["ADD EDITOR TEXT"] = "Adicionar código no Editor";
ui_pt["ADD LIBRARY TEXT"] = "Adicionar biblioteca";
ui_pt["ADD PRE TEXT"] = "Adicionar texto pré";
ui_pt["ADD POST TEXT"] = "Adicionar texto pós";
ui_pt["ADD DESCRIPTION TEXT"] = "Adicionar descrição";
ui_pt["ADD ONLOAD TEXT"] = "Adicionar texto de carregamento";

ui_pt["KEYBOARD BUTTON"] = "Teclado Reeborg";
ui_pt["ADDITIONAL OPTIONS"] = "Opções adicionais";

ui_pt["BASIC COMMANDS"] = "Comandos Básicos";
ui_pt["DEFINING"] = "Definições";
ui_pt["LOOPS"] = "Repetições";
ui_pt["DECISIONS"] = "Decisões";
ui_pt["CONDITIONS"] = "Condicionais";
ui_pt["USING VARIABLES"] = "Usando variáveis";
ui_pt["COMMANDS"] = "Comandos";
ui_pt["OTHER"] = "Outros";
ui_pt["OBJECTS"] = "Objetos";

ui_pt["Python Code"] = "Código Python";
ui_pt["Javascript Code"] = "Código Javascript";
ui_pt["LIBRARY"] = "biblioteca";
ui_pt["EXTRA"] = "Extra";
ui_pt["PRE"] = "Pré";
ui_pt["POST"] = "Pós";
ui_pt["DESCRIPTION"] = "Descrição";
ui_pt["ONLOAD"] = "Ao Carregar";

ui_pt["HIGHLIGHT IMPOSSIBLE"] = "Destaque Impossível.";
ui_pt["COMMAND RESULT"] = "Resultado do comando.";

ui_pt["DELETE WORLD TEXT"] = "Apagar Mundo:";
ui_pt["PYTHON ONLY"] = "Python somente";
ui_pt["COLLABORATION"] = "Colaboração";
ui_pt["TOGETHERJS EXPLAIN"] = "Ferramento para colaborar com uma ou mais pessoas usando Mozilla TogetherJS. Não funciona com Blockly.";
ui_pt["WORLD CREATION TITLE"] = "Mundo: Criação, Edição, ...";
ui_pt["EDIT WORLD"] = "Editar Mundo";
ui_pt["EDIT WORLD EXPLAIN"] = "Edita configuração do Mundo.";
ui_pt["PROGRAM IN EDITOR"] = "Programa em editor";
ui_pt["PROGRAM IN BLOCKLY WORKSPACE"] = "Programa em Blockly-Workspace";
ui_pt["CONTACT"] = "(Somente Inglês/Francês) Email:";
ui_pt["ISSUES"] = "Relatórios, Sugestões, etc (Inglês/Francês)";
ui_pt["FORUM"] = "Fórum de discussão";
ui_pt["HELP"] = "Ajuda";
ui_pt["DOCUMENTATION"] = '<a href="http://reeborg.ca/docs/en" target="_blank" rel="noopener">Documentação</a>';
ui_pt["PYTHON HELP"] = "Em Python: execute um comando com <code>help()</code> para obter ajuda. Ou execute ainda um comando como <code>help(move)</code> para obter ajuda com um dado comando.";
ui_pt["KEYBOARD HELP"] = "Clique no teclado Reeborg para obter uma lista de comandos disponíveis, palavras-chave Python, etc.";

ui_pt["WORLD EDITOR"] = "Editor de Mundo";
ui_pt["m-east"] = "Oeste";
ui_pt["m-north"] = "Norte";
ui_pt["m-west"] = "Oeste";
ui_pt["m-south"] = "Sul";
ui_pt["m-random"] = "Aleatório";
ui_pt["m-dimensions"] = "Dimensões";
ui_pt["m-add"] = "Adicionar";
ui_pt["m-add-robot"] = "Adicionar Robô";
ui_pt["m-robot"] = "Robô";
ui_pt["m-position"] = "Posição";
ui_pt["m-turn"] = "Virar";
ui_pt["m-objects"] = "Objetos";
ui_pt["m-walls"] = "Paredes";
ui_pt["m-objects2"] = "Objetos";
ui_pt["m-tiles"] = "Blocos";
ui_pt["m-fill"] = "Preencher";
ui_pt["m-solid"] = "Sólido";
ui_pt["m-decorative"] = "Objeto decorativo";
ui_pt["m-background"] = "Pano de fundo";
ui_pt["m-goal"] = "Ponto de chegada";
ui_pt["mg-robot"] = "Rpbô";
ui_pt["mg-walls"] = "Paredes";
ui_pt["mg-objects"] = "Objetos";

ui_pt["Reeborg says: I'm done!"] = "Reeborg diz: Pronto!";
ui_pt["Reeborg writes:"] = "Reeborg escreve:";
ui_pt["Reeborg shouts: Something is wrong!"] = "Reeborg grita: Algo está errado!";
ui_pt["Reeborg explores some Javascript code"] = "Reeborg explorando código JavaScript";
ui_pt["Reeborg states:"] = "Reeborg afirma:";
ui_pt["Reeborg watches some variables!"] = "Reeborg assiste algumas variáveis!";
ui_pt["Click on the world to get some additional information."] = "Clique no mundo para obter algumas informações adicionais.";

ui_pt["Reeborg's basic keyboard"] = "Teclado básico do Reeborg";
ui_pt["kbd-command-btn"] = "Comandos";
ui_pt["kbd-condition-btn"] = "Condições";
ui_pt["kbd-python-btn"] = "Python";
ui_pt["kbd-py-console-btn"] = "Python";
ui_pt["kbd-javascript-btn"] = "JavaScript";
ui_pt["kbd-objects-btn"] = "Objetos";
ui_pt["kbd-special-btn"] = "Especial";

ui_pt["UNDO"] = "Desfazer";
ui_pt["REDO"] = "Refazer";
ui_pt["tab"] = "TAB";
ui_pt["shift-tab"] = "Shift-TAB";
ui_pt["enter"] = "\u23CE";
ui_pt["<code>repeat</code> is not a true Python keyword."] = "<code>repeat</code> não é uma palavra-chave do Python.";

ui_pt["Colour:"] = "Cor:";
ui_pt["Enter a colour"] = "Entre com uma cor";

ui_pt["Background image"] = "Imagem de fundo";

ui_pt["NAME:"] = "Nome:";
ui_pt["Save world in browser"] = "Salvar o mundo no navegador";

ui_pt["Set the world's dimensions"] = "Defina dimensões do mundo";
ui_pt["set-dimensions-explain"] = "Aqui você pode definir as dimensões do seu mundo";
ui_pt["Maximum x value:"] = "Máximo valor de x:";
ui_pt["Maximum y value:"] = "Máximo valor de y:";
ui_pt["Use small tiles"] = "Usar blocos pequenos";

ui_pt["Set goal number for object"] = "Definir número do objetivo para objeto";
ui_pt["dialog-goal-object-explain"] = "Clique na checkbox se você deseja que o número seja igual ao número de objetos encontrados no mundo quando gerado.";
ui_pt["Number of objects"] = "Número de objetos";
ui_pt["All such objects"] = "Todos os objetos";

ui_pt["Number of objects:"] = "Número de objetos:";
ui_pt["Maximum:"] = "Máximo:";
ui_pt["Add object in the world"] = "Adicionar objeto no mundo";
ui_pt["ADD OBJECT EXPLAIN"] = "Escolha zero para remover qualquer objeto nesta localização. Se <code>Maximum</code> for definido para um valor maior que <code>Número de objetos</code>, um número de objetos entre estes dois números, será gerado de forma aleatória a cada vez que o programa for executado.";

ui_pt["Unlimited:"] = "Ilimitado:";
ui_pt["Give object to robot"] = "Dar objeto ao Robô:";
ui_pt["GIVE OBJECT EXPLAIN"] = "Escolha um número de objetos para o Robô carregar. Clique no checkbox caso você deseje que o número seja ilimitado.";

ui_pt["UPDATE BLOCKLY CONTENT"] = "Este mundo possui contéudo padrão para a área de trabalho de blocos. Para substituir os blocos, clique no botão.";
ui_pt["UPDATE BLOCKLY BUTTON"] = "Atualizar Blockly";
ui_pt["Contents from World"] = "Conteúdo do Mundo";

ui_pt["WARNING: Do not change this comment."] = "WARNING: Do not change this comment.";
ui_pt["Library Code is below."] = "Código da biblioteca abaixo.";
ui_pt["No solution can be saved when using REPL (Py)."] = "Nenhuma solução pode ser salva quando REPL (Py) estiver sendo usado!.";
ui_pt["No solution can be loaded when using REPL (Py)."] = "Nenhuma solução pode ser carregada quando REPL (Py) estiver sendo usado!.";

ui_pt["You are not allowed to use <code>done</code> in this world!"] = "Não permitido usar <code>done()</code> neste mundo!";
ui_pt["Execution ended before the <em>Post</em> code was executed."] = "Execução interrompida antes de <em>Post</em> ser executado.";

ui_pt["Difficulty level"] = "Nível de dificuldade";

ui_pt["Expected result"] = "Resultado esperado";
ui_pt["Differences highlighted"] = "Diferenças reveladas";
ui_pt["Actual result"] = "Resultado";

ui_pt["Cannot parse progress file."] = "Não foi possível a leitura do arquivo de progresso.";
ui_pt["Cannot merge progress."] = "Não foi possível atualizar o progresso.";
ui_pt["No solution found for this world."] = "Nenhuma solução encontrada para esse mundo.";

ui_pt["THINKING"] = "Pensando ...";

function inverse(obj){
  var retobj = {};
  for(var key in obj){
    retobj[obj[key]] = key;
  }
  return retobj;
}

pt_to_en = inverse(en_to_pt)
},{}]},{},[16]);
