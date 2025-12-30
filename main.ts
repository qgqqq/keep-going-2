sprites.on_fire_created(function (location) {
    scene.createParticleEffectAtLocation(location, effects.fire)
    sprites.set_flame_strength(location, 5)
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    myPlane,
    [img`
        ........................
        ........................
        ..............ffffff....
        ..f8.........fbbbb9f....
        ..f88......ffbbbbff.....
        ..fb88...ff888ffff8.....
        ..fbb8888888bbbbbbffff..
        f888888bbbbbbbbbbbb1bbff
        fffffbbbbbbbbb99dddbbbbf
        .....fbbbb88bbbbbbbbb8f.
        ....fbbbb88fb8888888ff..
        ...bbbbb88ffffffffff....
        ...b88889f.fc.fc........
        ...ffffff...............
        ........................
        ........................
        `,img`
        ........................
        ........................
        ........................
        ..f8..........ffffff....
        ..f88.......ffbbbb9f....
        ..fb88.....fffffff8.....
        ..fbb88888ffbbbbbbffff..
        f888888bbbbbbb9999dbbbff
        fffffbbbbbbbbbbbbbbbbbbf
        ....fbbbb888bbbbbbbbb8f.
        ...bbbbb888fb8888888ff..
        ...b88889fffffffffff....
        ...ffffff..fc.fc........
        ........................
        ........................
        ........................
        `],
    100,
    true
    )
})
sprites.on_fire_destroyed(function (location) {
    scene.clearParticleEffectsAtLocation(location)
    tiles.setTileAt(location, assets.tile`burnt tree`)
})
scene.onOverlapTile(SpriteKind.Water, assets.tile`tree fire`, function (sprite, location) {
    sprites.change_flame_strength_by(location, -1)
    sprite.destroy()
})
controller.A.onEvent(ControllerButtonEvent.Repeated, function () {
    sprites.spray(myPlane, forest_imgs.water)
})
controller.left.onEvent(ControllerButtonEvent.Repeated, function () {
    animation.runImageAnimation(
    myPlane,
    assets.animation`Fire Plane 2 Left Animation`,
    700,
    true
    )
})
let myPlane: Sprite = null
myPlane = sprites.create(forest_imgs.Fire_Plane_2_Right, SpriteKind.Player)
controller.moveSprite(myPlane)
scene.cameraFollowSprite(myPlane)
for (let index = 0; index < 4; index++) {
    sprites.create_spreading_fire(assets.tile`tree`, assets.tile`tree fire`)
}
game.set_health_of_trees(7)
game.set_dryness_of_grass(3)
game.set_strength_of_wind(3)
hud.fire_hud(true)
hud.danger_hud(true)
hud.forest_hud(true)
music.thump.play()
game.onUpdate(function () {
    sprites.random_spread()
})
