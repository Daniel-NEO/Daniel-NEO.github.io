window.addEventListener('DOMContentLoaded', (event) => {
    var Engine = Matter.Engine,
        Render = Matter.Render,
        World = Matter.World,
        Bodies = Matter.Bodies,
        Mouse = Matter.Mouse,
        MouseConstraint = Matter.MouseConstraint;

    var engine = Engine.create(),
        world = engine.world;

    var render = Render.create({
        element: document.getElementById('world'),
        engine: engine,
        options: {
            width: Math.min(document.documentElement.clientWidth, 800),
            height: Math.min(document.documentElement.clientHeight, 600),
            wireframes: false
        }
    });

    var ball = Bodies.circle(400, 200, 40, {
        density: 0.04,
        frictionAir: 0.01,
        restitution: 0.8,
        friction: 0.01,
        render: { fillStyle: 'blue' }
    });

    var floor = Bodies.rectangle(400, 610, 810, 60, { 
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

    World.add(world, [ball, floor, mouseConstraint]);
    Engine.run(engine);
    Render.run(render);
});
