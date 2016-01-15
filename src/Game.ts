/// <reference path="Vendor/p2.d.ts" />

class Game
{
    private world:p2.World;

    public run():void
    {
        this.setupWorld();
        this.setupRenderer();
        this.createTracks();
    }

    private setupRenderer():void
    {
        var game = this;
        var renderer = new p2.WebGLRenderer(function() {
            this.setWorld(game.world);
        });
        renderer.on('dropBody', this.onDrop.bind(this));
    }

    private setupWorld():void
    {
        this.world = new p2.World({ gravity : [0, 0] });
        this.world.solver.iterations = 100;
        this.world.on('postStep', this.postStep, this);
    }

    private postStep():void
    {
        this.world.bodies.forEach(function(body:p2.Body) {
            body.velocity = [0, 0];
            body.angularVelocity = 0;
        });
    }

    private createTracks():void
    {
        this.createShortStraight();
        this.createShortStraight();
        this.createShortStraight();
        this.createShortStraight();
        this.createShortStraight();
        this.createMiddleStraight();
        this.createMiddleStraight();
        this.createMiddleStraight();
        this.createMiddleStraight();
        this.createMiddleStraight();
        this.createLongStraight();
        this.createLongStraight();
        this.createLongStraight();
        this.createLongStraight();
        this.createLongStraight();
        //this.createCurve();
    }

    private createShortStraight():void
    {
        this.createTrack(
            [
                [-0.1, -0.2],
                [0.1, -0.2],
                [0.1, 0.2],
                [-0.1, 0.2],
            ],
            [0, 0.2],
            [0, -0.2]
        );
    }

    private createMiddleStraight():void
    {
        this.createTrack(
            [
                [-0.1, -0.3],
                [0.1, -0.3],
                [0.1, 0.3],
                [-0.1, 0.3],
            ],
            [0, 0.3],
            [0, -0.3]
        );
    }

    private createLongStraight():void
    {
        this.createTrack(
            [
                [-0.1, -0.4],
                [0.1, -0.4],
                [0.1, 0.4],
                [-0.1, 0.4],
            ],
            [0, 0.4],
            [0, -0.4]
        );
    }

    private createCurve():void
    {
        this.createTrack(
            [
                [-3.5, -0.2],
                [2.5, 2.2],
                [3.5, 0.8],
                [-3.5, -2.2],
            ],
            [0, 0.4],
            [0, -0.4]
        );
    }

    private createTrack(path:number[][], pin:number[], hole:number[]):void
    {
        var track = new p2.Body({ mass: 0.1, position: [this.world.bodies.length / 5, 0] });
        var shape = new p2.Convex({ vertices: path });
        track.addShape(shape);
        track.addShape(new p2.Circle({ radius: 0.05 }), pin);
        track.pin = pin;
        track.hole = hole;
        track.collisionResponse = false;
        this.world.addBody(track);
    }

    private onDrop(event):void
    {
        var draggedBody = event.body;
        if (draggedBody.pinJoint !== undefined) return;

        for (let i = 0; i < this.world.bodies.length; i++) {
            let body = this.world.bodies[i];
            if (!draggedBody.overlaps(body)) {
                continue;
            }
            if (body.holeJoint !== undefined) {
                continue;
            }
            if (draggedBody.holeJoint !== undefined && draggedBody.holeJoint == body) {
                continue;
            }
            this.createJoint(draggedBody, body);
            return;
        }
    }

    private createJoint(bodyA:p2.Body, bodyB:p2.Body):void
    {
        bodyA.pinJoint = bodyB;
        bodyB.holeJoint = bodyA;

        var constraint = new p2.RevoluteConstraint(bodyA, bodyB, { localPivotA: bodyA.pin, localPivotB: bodyB.hole });
        constraint.setLimits(-Math.PI / 16, Math.PI / 16);
        this.world.addConstraint(constraint);
    }
}

export default Game
