window.addEventListener('DOMContentLoaded', (event) => {
    var Engine = Matter.Engine,
        Render = Matter.Render,
        World = Matter.World,
        Bodies = Matter.Bodies,
        Mouse = Matter.Mouse,
        MouseConstraint = Matter.MouseConstraint;

    var engine = Engine.create(),
        world = engine.world;

    var width = Math.min(document.documentElement.clientWidth, 500),
        height = Math.min(document.documentElement.clientHeight, 600);

        var render = Render.create({
            element: document.getElementById('world'),
            engine: engine,
            options: {
                width: 500,
                height: 500,
                wireframes: false,
                background: 'white' // Add this line to set the background color to white
            }
        });

    var ball = Bodies.circle(width / 2, height/2, 20, {
        density: 0.04,
        frictionAir: 0.01,
        restitution: 0.8,
        friction: 0.01,
        render: { fillStyle: 'blue' }
    });

    var floor = Bodies.rectangle(width / 2, height+390, width+1000, 1000, { 
        isStatic: true,
        render: { fillStyle: 'black' } 
    });

    var wallLeft = Bodies.rectangle(-490, height / 2, 1000, height, {
        isStatic: true,
        render: { fillStyle: 'black' }
    });

    var wallRight = Bodies.rectangle(width+490, height / 2, 1000, height, {
        isStatic: true,
        render: { fillStyle: 'black' }
    });

    var ceiling = Bodies.rectangle(width / 2, -490, width+1000, 1000, {
        isStatic: true,
        render: { fillStyle: 'black' }
    });

    var mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });

    World.add(world, [ball, floor, wallLeft, wallRight, ceiling, mouseConstraint]);
    Engine.run(engine);
    Render.run(render);
});
