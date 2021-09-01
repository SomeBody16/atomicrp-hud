const stage = new Konva.Stage({
  container: 'container',
  width: 1080,
  height: 720
});

const shadow = {
  shadowColor: 'black',
  shadowBlur: 6,
  shadowOpacity: 0.7,
};

const mapRadius = stage.height() * 0.40;
const mapPos = {
  x: mapRadius + (stage.width() * 0.045),
  y: (stage.height() * 0.975) - mapRadius,
}
const statsRadius = mapRadius + 65;
const textRadius = statsRadius + 65;

const initCompass = () => {
  const group = new Konva.Group();
  const mainColor = '#F60';
  const subColor = '#AAA';

  const mainSize = 40;
  const subSize = 30;

  const steps = 36 * 2;
  for (let i = 0; i < steps; i++) {
    const angle = (360 / steps) * i;
    const letters = {
      180: {
        letter: 'N',
        letterAngle: 0,
        color: '#F00',
        fontSize: 50,
      },
      225: {
        letter: 'NW',
        letterAngle: 315,
        color: subColor,
        fontSize: subSize,
      },
      270: {
        letter: 'W',
        letterAngle: 270,
        color: mainColor,
        fontSize: mainSize,
        fontStyle: 'bold',
      },
      315: {
        letter: 'SW',
        letterAngle: 225,
        color: subColor,
        fontSize: subSize,
      },
      0: {
        letter: 'S',
        letterAngle: 180,
        color: mainColor,
        fontSize: mainSize,
        fontStyle: 'bold',
      },
      45: {
        letter: 'SE',
        letterAngle: 135,
        color: subColor,
        fontSize: subSize,
      },
      90: {
        letter: 'E',
        letterAngle: 90,
        color: mainColor,
        fontSize: mainSize,
        fontStyle: 'bold',
      },
      135: {
        letter: 'NE',
        letterAngle: 45,
        color: subColor,
        fontSize: subSize,
      },
    }

    if (Object.keys(letters).includes(angle.toString())) {
      const letter = new Konva.Text({
        ...getCirclePos(mapRadius, angle, mapPos),
        text: letters[angle].letter,
        fontSize: letters[angle].fontSize,
        fontStyle: letters[angle].fontStyle,
        fontFamily: 'Redemption',
        fill: letters[angle].color,
        ...shadow,
      });
      letter.offsetX(letter.width() / 2.5);
      letter.offsetY(letter.height() / 3);
      letter.rotation(letters[angle].letterAngle);
      group.add(letter);
    }
    else {
      const posStart = getCirclePos(mapRadius - 10, angle, mapPos);
      const posEnd = getCirclePos(mapRadius + 5, angle, mapPos);
      const line = new Konva.Line({
        points: [posStart.x, posStart.y, posEnd.x, posEnd.y],
        stroke: '#777',
        strokeWidth: 2,
        lineCap: 'round',
        lineJoin: 'round',
        ...shadow,
      });
      group.add(line);
    }
  }

  group.x(mapPos.x);
  group.y(mapPos.y);
  group.offsetX(mapPos.x);
  group.offsetY(mapPos.y);
  return group;
}

const getStatPosition = (order) => getCirclePos(statsRadius, 230 - (order * 15.5), mapPos);
const initStats = () => {
  const stats = {
    health: {
      order: 0,
      color: '#F00',
      value: 0.75,
      icon: 'M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z',
    },
    armor: {
      order: 1,
      color: '#3F48CC',
      value: 0.75,
      icon: 'M466.5 83.7l-192-80a48.15 48.15 0 0 0-36.9 0l-192 80C27.7 91.1 16 108.6 16 128c0 198.5 114.5 335.7 221.5 380.3 11.8 4.9 25.1 4.9 36.9 0C360.1 472.6 496 349.3 496 128c0-19.4-11.7-36.9-29.5-44.3z',
    },
    hunger: {
      order: 2,
      color: '#FFA500',
      value: 0.75,
      icon: 'M444 68.52C399.45 24.05 345.11 0 299.17 0c-23.64 0-44.77 6.79-61.47 20a41.83 41.83 0 0 0-7.3 5.82C191.68 64.5 128.14 139.6 128.14 209.42v100.37l-8.61 8.6c-9.71 9.69-24 11.07-36.79 6a60.33 60.33 0 0 0-65 98.72c15.26 15.28 36.51 19.59 56.13 15.1-4.49 19.6-.18 40.83 15.11 56.1a60.36 60.36 0 0 0 98.83-65c-5.1-12.73-3.72-27 6-36.75l8.6-8.59h100.47c69.89 0 145.07-63.46 183.8-102.15a40.86 40.86 0 0 0 6.66-9c37.42-49.4 17.37-137.63-49.34-204.3zm8.73 179.39c-9.76 9.75-24.3 11.8-34.79 11.8-34.72 0-77.19-20.87-110.82-54.47-27.19-27.16-46.31-60.32-52.45-91-4.74-23.7-1.19-43.56 9.74-54.48C274.13 50.05 288.69 48 299.18 48c34.72 0 77.18 20.87 110.82 54.46 53.88 53.84 67 121.19 42.7 145.45zM331.89 127.23c-9.81 9.8-5.84 29.67 8.88 44.37s34.61 18.68 44.42 8.87 5.84-29.66-8.88-44.37-34.61-18.67-44.42-8.87z',
    },
    thirst: {
      order: 3,
      color: '#0FF',
      value: 0.75,
      icon: 'M205.22 22.09c-7.94-28.78-49.44-30.12-58.44 0C100.01 179.85 0 222.72 0 333.91 0 432.35 78.72 512 176 512s176-79.65 176-178.09c0-111.75-99.79-153.34-146.78-311.82zM176 448c-61.75 0-112-50.25-112-112 0-8.84 7.16-16 16-16s16 7.16 16 16c0 44.11 35.89 80 80 80 8.84 0 16 7.16 16 16s-7.16 16-16 16z',
      iconMargin: 7,
    },
    voice: {
      order: 4,
      color: '#800080',
      value: 0.75,
      icon: 'M215.03 71.05L126.06 160H24c-13.26 0-24 10.74-24 24v144c0 13.25 10.74 24 24 24h102.06l88.97 88.95c15.03 15.03 40.97 4.47 40.97-16.97V88.02c0-21.46-25.96-31.98-40.97-16.97zm233.32-51.08c-11.17-7.33-26.18-4.24-33.51 6.95-7.34 11.17-4.22 26.18 6.95 33.51 66.27 43.49 105.82 116.6 105.82 195.58 0 78.98-39.55 152.09-105.82 195.58-11.17 7.32-14.29 22.34-6.95 33.5 7.04 10.71 21.93 14.56 33.51 6.95C528.27 439.58 576 351.33 576 256S528.27 72.43 448.35 19.97zM480 256c0-63.53-32.06-121.94-85.77-156.24-11.19-7.14-26.03-3.82-33.12 7.46s-3.78 26.21 7.41 33.36C408.27 165.97 432 209.11 432 256s-23.73 90.03-63.48 115.42c-11.19 7.14-14.5 22.07-7.41 33.36 6.51 10.36 21.12 15.14 33.12 7.46C447.94 377.94 480 319.54 480 256zm-141.77-76.87c-11.58-6.33-26.19-2.16-32.61 9.45-6.39 11.61-2.16 26.2 9.45 32.61C327.98 228.28 336 241.63 336 256c0 14.38-8.02 27.72-20.92 34.81-11.61 6.41-15.84 21-9.45 32.61 6.43 11.66 21.05 15.8 32.61 9.45 28.23-15.55 45.77-45 45.77-76.88s-17.54-61.32-45.78-76.86z',
    },
    oxygen: {
      order: 5,
      color: '#C8BFE7',
      value: 0.75,
      icon: 'M636.11 390.15C614.44 308.85 580.07 231 534.1 159.13 511.98 124.56 498.03 96 454.05 96 415.36 96 384 125.42 384 161.71v60.11l-32.88-21.92a15.996 15.996 0 0 1-7.12-13.31V16c0-8.84-7.16-16-16-16h-16c-8.84 0-16 7.16-16 16v170.59c0 5.35-2.67 10.34-7.12 13.31L256 221.82v-60.11C256 125.42 224.64 96 185.95 96c-43.98 0-57.93 28.56-80.05 63.13C59.93 231 25.56 308.85 3.89 390.15 1.3 399.84 0 409.79 0 419.78c0 61.23 62.48 105.44 125.24 88.62l59.5-15.95c42.18-11.3 71.26-47.47 71.26-88.62v-87.49l-85.84 57.23a7.992 7.992 0 0 1-11.09-2.22l-8.88-13.31a7.992 7.992 0 0 1 2.22-11.09L320 235.23l167.59 111.72a7.994 7.994 0 0 1 2.22 11.09l-8.88 13.31a7.994 7.994 0 0 1-11.09 2.22L384 316.34v87.49c0 41.15 29.08 77.31 71.26 88.62l59.5 15.95C577.52 525.22 640 481.01 640 419.78c0-9.99-1.3-19.94-3.89-29.63z',
      iconMargin: -5,
      iconScale: 0.95,
      hidden: true,
    },
    carHealth: {
      order: 6,
      color: '#7B7',
      value: 0.75,
      icon: 'M143.25 220.81l-12.42 46.37c-3.01 11.25-3.63 22.89-2.41 34.39l-35.2 28.98c-6.57 5.41-16.31-.43-14.62-8.77l15.44-76.68c1.06-5.26-2.66-10.28-8-10.79l-77.86-7.55c-8.47-.82-11.23-11.83-4.14-16.54l65.15-43.3c4.46-2.97 5.38-9.15 1.98-13.29L21.46 93.22c-5.41-6.57.43-16.3 8.78-14.62l76.68 15.44c5.26 1.06 10.28-2.66 10.8-8l7.55-77.86c.82-8.48 11.83-11.23 16.55-4.14l43.3 65.14c2.97 4.46 9.15 5.38 13.29 1.98l60.4-49.71c6.57-5.41 16.3.43 14.62 8.77L262.1 86.38c-2.71 3.05-5.43 6.09-7.91 9.4l-32.15 42.97-10.71 14.32c-32.73 8.76-59.18 34.53-68.08 67.74zm494.57 132.51l-12.42 46.36c-3.13 11.68-9.38 21.61-17.55 29.36a66.876 66.876 0 0 1-8.76 7l-13.99 52.23c-1.14 4.27-3.1 8.1-5.65 11.38-7.67 9.84-20.74 14.68-33.54 11.25L515 502.62c-17.07-4.57-27.2-22.12-22.63-39.19l8.28-30.91-247.28-66.26-8.28 30.91c-4.57 17.07-22.12 27.2-39.19 22.63l-30.91-8.28c-12.8-3.43-21.7-14.16-23.42-26.51-.57-4.12-.35-8.42.79-12.68l13.99-52.23a66.62 66.62 0 0 1-4.09-10.45c-3.2-10.79-3.65-22.52-.52-34.2l12.42-46.37c5.31-19.8 19.36-34.83 36.89-42.21a64.336 64.336 0 0 1 18.49-4.72l18.13-24.23 32.15-42.97c3.45-4.61 7.19-8.9 11.2-12.84 8-7.89 17.03-14.44 26.74-19.51 4.86-2.54 9.89-4.71 15.05-6.49 10.33-3.58 21.19-5.63 32.24-6.04 11.05-.41 22.31.82 33.43 3.8l122.68 32.87c11.12 2.98 21.48 7.54 30.85 13.43a111.11 111.11 0 0 1 34.69 34.5c8.82 13.88 14.64 29.84 16.68 46.99l6.36 53.29 3.59 30.05a64.49 64.49 0 0 1 22.74 29.93c4.39 11.88 5.29 25.19 1.75 38.39zM255.58 234.34c-18.55-4.97-34.21 4.04-39.17 22.53-4.96 18.49 4.11 34.12 22.65 39.09 18.55 4.97 45.54 15.51 50.49-2.98 4.96-18.49-15.43-53.67-33.97-58.64zm290.61 28.17l-6.36-53.29c-.58-4.87-1.89-9.53-3.82-13.86-5.8-12.99-17.2-23.01-31.42-26.82l-122.68-32.87a48.008 48.008 0 0 0-50.86 17.61l-32.15 42.97 172 46.08 75.29 20.18zm18.49 54.65c-18.55-4.97-53.8 15.31-58.75 33.79-4.95 18.49 23.69 22.86 42.24 27.83 18.55 4.97 34.21-4.04 39.17-22.53 4.95-18.48-4.11-34.12-22.66-39.09z',
      iconMargin: -6,
      hidden: true,
    },
    carFuel: {
      order: 7,
      color: '#AA0',
      value: 0.75,
      icon: 'M336 448H16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h320c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm157.2-340.7l-81-81c-6.2-6.2-16.4-6.2-22.6 0l-11.3 11.3c-6.2 6.2-6.2 16.4 0 22.6L416 97.9V160c0 28.1 20.9 51.3 48 55.2V376c0 13.2-10.8 24-24 24s-24-10.8-24-24v-32c0-48.6-39.4-88-88-88h-8V64c0-35.3-28.7-64-64-64H96C60.7 0 32 28.7 32 64v352h288V304h8c22.1 0 40 17.9 40 40v27.8c0 37.7 27 72 64.5 75.9 43 4.3 79.5-29.5 79.5-71.7V152.6c0-17-6.8-33.3-18.8-45.3zM256 192H96V64h160v128z',
      hidden: true,
    },
  }

  for (const statName in stats) {
    const stat = stats[statName];
    const pos = getStatPosition(stat.order);

    const background = new Konva.Circle({
      ...pos,
      radius: 40,
      fill: 'black',
      stroke: pSBC(-0.75, stat.color),
      ...shadow,
    });
    const value = new Konva.Arc({
      ...pos,
      innerRadius: 35,
      outerRadius: 45,
      angle: stat.value * 360,
      fill: stat.color,
      ...shadow,
    });
    value.rotation(-90);

    const icon = new Konva.Path({
      x: pos.x - 22 + (stat.iconMargin ?? 0),
      y: pos.y - 22,
      data: stat.icon,
      fill: 'lightgray',
      scale: {
        x: 0.09 * (stat.iconScale ?? 1),
        y: 0.09 * (stat.iconScale ?? 1),
      },
    });

    stats[statName] = {
      ...stats[statName],
      setShow: (show = true) => {
        hudManager._showNode(background, show);
        hudManager._showNode(value, show);
        hudManager._showNode(icon, show);
      },
      node: {background, value, icon},
      flashStart: () => {
        new Konva.Tween({node: value, duration: 0.1, fill: pSBC(0.3, stat.color)}).play();
        new Konva.Tween({node: background, duration: 0.1, fill:  pSBC(-0.75, stat.color)}).play();
      },
      flashStop: () => {
        new Konva.Tween({node: value, duration: 0.5, fill: stat.color}).play();
        new Konva.Tween({node: background, duration: 0.5, fill: 'black'}).play();
      },
      setValue: (newValue) => {
        new Konva.Tween({node: icon, duration: 0.05, fill: stat.color}).play();
        new Konva.Tween({node: value, duration: 0.2, angle: newValue * 360}).play();
        setTimeout(
          () => new Konva.Tween({node: icon, duration: 0.5, fill: 'lightgray'}).play(),
          200
        );
      },
      position: (pos) => {
        if (!pos) {
          return background.position();
        }
        background.position(pos);
        value.position(pos);
        icon.position({
          x: pos.x - 22 + (stat.iconMargin ?? 0),
          y: pos.y - 22,
        });
      },
      moveTo: (pos, duration = 0.5) => {
        new Konva.Tween({ node: background, ...pos, duration }).play();
        new Konva.Tween({ node: value, ...pos, duration }).play();
        new Konva.Tween({
          node: icon,
          x: pos.x - 22 + (stat.iconMargin ?? 0),
          y: pos.y - 22,
          duration
        }).play();
      },
    }
  }

  return stats;
}

const initAtomicId = () => {
  const atomicRp = new Konva.Text({
    x: 30,
    y: stage.height() - 50,
    text: 'Atomic RP',
    fontSize: 35,
    fontFamily: 'Redemption',
    fill: '#F60',
    ...shadow,
  });
  const id = new Konva.Text({
    x: 30,
    y: stage.height() - 90,
    text: '2137',
    fontSize: 45,
    fontFamily: 'Redemption',
    fill: '#F60',
    ...shadow,
  });
  return { atomicRp, id };
}

const initPlace = () => {
  const primary = new Konva.Text({
    ...getCirclePos(textRadius, 147, mapPos),
    text: `Pillbox Hill`,
    fontSize: 50,
    fontFamily: 'Redemption',
    fill: '#F60',
    ...shadow,
  });
  const secondary = new Konva.Text({
    ...getCirclePos(textRadius, 135, mapPos),
    text: `Elgin Ave`,
    fontSize: 40,
    fontFamily: 'Redemption',
    fill: '#DDD',
    ...shadow,
  });

  return { primary, secondary };
}

const carMaxAngle = 288;
const initCar = () => {
  const speedometer = new Konva.Arc({
    ...mapPos,
    innerRadius: statsRadius + 5,
    outerRadius: statsRadius + 25,
    angle: carMaxAngle,
    fill: '#FA0',
    clockwise: true,
    ...shadow,
  });
  speedometer.rotation(50);

  const tachometer = new Konva.Arc({
    ...mapPos,
    innerRadius: statsRadius - 5,
    outerRadius: statsRadius - 15,
    angle: carMaxAngle,
    fill: '#888',
    clockwise: true,
    ...shadow,
  });
  tachometer.rotation(50);

  const speedometerText = new Konva.Text({
    ...getCirclePos(textRadius, 57, mapPos),
    text: `0mph`,
    fontSize: 70,
    fontFamily: 'Redemption',
    fill: 'white',
    align: 'center',
    ...shadow,
  });
  speedometerText.move({x: -30, y: 0});

  return { speedometer, tachometer, speedometerText };
}

const hud = {
  layer: {
    display: new Konva.Layer(),
    // wavy: new Konva.Layer(),
  },
  component: {
    compass: initCompass(),
    stats: initStats(),
    atomicId: initAtomicId(),
    place: initPlace(),
    car: initCar(),
  },
  switch: {
    compassOpened: false,
  }
};

const angleMap = {};
for (let i = 235; i < 360; i++) {
  angleMap[getCirclePos(statsRadius, i, mapPos).x] = i;
}

const hudManager = {
  _initStage: () => {
    // hud.layer.wavy.getNativeCanvasElement().style.filter = 'url(#bars)';

    for (const stat of Object.values(hud.component.stats)) {
      hud.layer.display.add(stat.node.background);
      hud.layer.display.add(stat.node.icon);
      hud.layer.display.add(stat.node.value);
    }

    hud.layer.display.add(hud.component.compass);

    hud.layer.display.add(hud.component.car.speedometer);
    hud.layer.display.add(hud.component.car.tachometer);
    hud.layer.display.add(hud.component.car.speedometerText);

    hud.layer.display.add(hud.component.atomicId.atomicRp);
    hud.layer.display.add(hud.component.atomicId.id);

    hud.layer.display.add(hud.component.place.primary);
    hud.layer.display.add(hud.component.place.secondary);


    stage.add(hud.layer.display);
    // stage.add(hud.layer.wavy);
  },
  _draw: () => {
    hud.layer.display.draw();
    // hud.layer.wavy.draw();
  },
  setShow: (show = true) => {
    hudManager.setShowCompass(show);
    hudManager.setShowPlayerStats(show);
    hudManager.setShowSpeedometer(show);
    hudManager.setShowPlace(show);
  },
  setShowCompass: (show = true) => {
    hudManager._showNode(hud.component.compass, show);
    hud.switch.compassOpened = !show;
  },
  setShowPlayerStats: (show = true) => {
    for (const stat of Object.values(hud.component.stats)) {
      stat.setShow(show && !stat.hidden);
    }
  },
  setShowSpeedometer: (show = true) => {
    hudManager._showNode(hud.component.car.speedometer, show);
    hudManager._showNode(hud.component.car.tachometer, show);
    hudManager._showNode(hud.component.car.speedometerText, show);
  },
  setShowPlace: (show = true) => {
    hudManager._showNode(hud.component.place.primary, show);
    hudManager._showNode(hud.component.place.secondary, show);
  },

  compass: {
    setRotation: (destRotation) => {
      const animDuration = 100;

      const baseRotation = hud.component.compass.rotation();
      const diffRotation = Math.abs(baseRotation - destRotation);

      const anim = new Konva.Animation((frame) => {
        const progress = Math.min(frame.time / animDuration, 1);
        if (progress >= 1) {
          hud.component.compass.rotation(destRotation);
          anim.stop();
          return;
        }

        if (diffRotation > 180) {
          if (destRotation > baseRotation) { // 10 -> 350
            let trueDiffRotation = (360 - destRotation) + baseRotation;
            let newRotation = baseRotation - (trueDiffRotation * progress);
            if (newRotation < 0) newRotation += 360;
            hud.component.compass.rotation(newRotation);
          } else { // 350 -> 10
            let trueDiffRotation = (360 - baseRotation) + destRotation;
            let newRotation = baseRotation + (trueDiffRotation * progress);
            if (newRotation > 360) newRotation -= 360;
            hud.component.compass.rotation(newRotation);
          }
        } else {
          if (destRotation > baseRotation) { // 100 -> 200
            let newRotation = baseRotation + (diffRotation * progress);
            hud.component.compass.rotation(newRotation);
          } else { // 200 -> 100
            let newRotation = baseRotation - (diffRotation * progress);
            if (newRotation > 360) newRotation -= 360;
            hud.component.compass.rotation(newRotation);
          }
        }
      }, hud.layer.display);
      anim.start();
    },
  },
  place: {
    update: (primary, secondary) => {
      hud.component.place.primary.text(primary);
      hud.component.place.secondary.text(secondary);
    }
  },
  car: {
    update: (speed, turnover, speedText) => {
      new Konva.Tween({node: hud.component.car.speedometer, duration: 0.1, angle: 360 - (speed * (360 - carMaxAngle))}).play();
      new Konva.Tween({node: hud.component.car.tachometer, duration: 0.1, angle: 360 - (turnover * (360 - carMaxAngle))}).play();
      hud.component.car.speedometerText.text(speedText);
    },
  },
  filter: {
    drunk: () => {
      hud.layer.display.getNativeCanvasElement().style.filter = 'url(#drunk)';
      // hud.layer.wavy.getNativeCanvasElement().style.filter = 'url(#drunk)';
    },
    clear: () => {
      hud.layer.display.getNativeCanvasElement().style.filter = '';
      // hud.layer.wavy.getNativeCanvasElement().style.filter = 'url(#bars)';
    },
  },
  stats: {
    show: (name) => {
      hud.component.stats[name].hidden = false;
      hudManager.stats._draw();
    },
    hide: (name) => {
      hud.component.stats[name].hidden = true;
      hudManager.stats._draw();
    },
    setValue: (name, value) => hud.component.stats[name].setValue(value),
    flashStart: (name) => hud.component.stats[name].flashStart(),
    flashStop: (name) => hud.component.stats[name].flashStop(),
    _draw: () => {
      let orderDiff = 0;
      for (const statName in hud.component.stats) {
        const stat = hud.component.stats[statName];
        stat.setShow(!stat.hidden);
        if (stat.hidden) {
          orderDiff--;
          continue;
        }
        const pos = !hud.switch.compassOpened
          ? getStatPosition(stat.order + orderDiff)
          : {...getStatPosition(0), y: stage.height() - 140 - ((stat.order + orderDiff) * 100)}
        stat.moveTo(pos);
      }
    }
  },
  setMode: {
    onFoot: () => {
      hudManager.setMode._switch(
        ['player-stats'],
        ['oxygen', 'carHealth', 'carFuel'],
      )
    },
    openedPhoneOnFoot: () => {
      hudManager.setMode._switch(
        ['compass', 'player-stats', 'place'],
        ['oxygen', 'carHealth', 'carFuel'],
      );
      // setTimeout(() => hudManager.setShowPlace(false), 3000);
    },
    swimming: () => {
      hudManager.setMode._switch(
        ['player-stats'],
        ['carHealth', 'carFuel'],
      )
    },
    swimmingInCar: () => {
      hudManager.setMode._switch(
        ['compass', 'player-stats', 'place', 'speedometer'],
        [],
      );
      // setTimeout(() => hudManager.setShowPlace(false), 3000);
    },
    inCar: () => {
      hudManager.setMode._switch(
        ['compass', 'player-stats', 'place', 'speedometer'],
        ['oxygen'],
      );
      // setTimeout(() => hudManager.setShowPlace(false), 3000);
    },
    openedPhoneWhileSwimming: () => {
      hudManager.setMode._switch(
        ['compass', 'player-stats', 'place'],
        ['carHealth', 'carFuel'],
      );
      // setTimeout(() => hudManager.setShowPlace(false), 3000);
    },

    _switch: (list = [], hiddenStats = []) => {
      hudManager.setShowCompass(list.includes('compass'));
      hudManager.setShowPlayerStats(list.includes('player-stats'));
      hudManager.setShowSpeedometer(list.includes('speedometer'));
      hudManager.setShowPlace(list.includes('place'));
      for (const statName of Object.keys(hud.component.stats)) {
        hud.component.stats[statName].hidden = hiddenStats.includes(statName);
      }
      hudManager.stats._draw();
    }
  },

  _showNode: (node, show = true, duration = 0.5) => {
    new Konva.Tween({ node, opacity: show ? 1 : 0, duration }).play();
  }
}

hudManager._initStage();
hudManager._draw();
// setTimeout(hudManager.setMode.onFoot, 500);
setTimeout(hudManager._draw, 1000);
