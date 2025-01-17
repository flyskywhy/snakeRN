import Constants from 'expo-constants';
import {GCanvasView} from '@flyskywhy/react-native-gcanvas';
import * as React from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

import GestureView from './components/GestureView';
import Links from './components/Links';
import Colors from './constants/Colors';
import Game, {Settings} from './Game';
import useAppState from './hooks/useAppState';
import {BlurView} from 'expo-blur';

let thisCanvas = null;

export default function App({onReady}) {
  const [score, setScore] = React.useState(0);
  const [isPlaying, setPlaying] = React.useState(false);
  const appState = useAppState();
  const isPaused = appState !== 'active';

  let game = React.useRef(null);

  const initCanvas = (canvas) => {
    if (thisCanvas) {
      return;
    }

    thisCanvas = canvas;
    if (Platform.OS === 'web') {
      // canvas.width not equal canvas.clientWidth but "Defaults to 300" ref
      // to https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas,
      // so have to assign again, unless <canvas width=SOME_NUMBER/> in render()
      thisCanvas.width = thisCanvas.clientWidth;
      thisCanvas.height = thisCanvas.clientHeight;

      const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          if (entry.target.id === 'canvasPixi') {
            let {width, height} = entry.contentRect;
            onCanvasResize({width, height, canvas: entry.target});
          }
        }
      });
      resizeObserver.observe(document.getElementById('canvasPixi'));
    }
    initGame(canvas);
  };

  const initGame = React.useMemo(
    () => (canvas) => {
      game.current = new Game(canvas);
      game.current.board.onScore = (score) => setScore(score);
      game.current.board.onPlaying = (isPlaying) => setPlaying(isPlaying);
      game.current.board.setPaused(isPaused);
      onReady && onReady();
    },
    [],
  );

  const onCanvasResize = ({width, height, canvas}) => {
    canvas.width = width;
    canvas.height = height;
  };

  React.useEffect(() => {
    if (game.current) game.current.board.setPaused(isPaused);
  }, [game && game.current, appState]);

  const onTap = React.useMemo(
    () => () => {
      if (game.current) {
        game.current.board.onTap();
      }
    },
    [game && game.current],
  );

  const onSwipe = React.useMemo(
    () => (direction) => {
      if (game.current) {
        game.current.board.onSwipe(direction);
      }
    },
    [game && game.current],
  );

  return (
    <View style={styles.container}>
      <GestureView style={styles.gestureView} onTap={onTap} onSwipe={onSwipe}>
        {Platform.OS === 'web' ? (
          <canvas
            id={'canvasPixi'}
            ref={initCanvas}
            style={{flex: 1, height: '100%', overflow: 'hidden'}}
          />
        ) : (
          <GCanvasView
            onCanvasCreate={initCanvas}
            isGestureResponsible={false}
            devicePixelRatio={Settings.devicePixelRatio}
            offscreenCanvas={true}
            style={{flex: 1, height: '100%', overflow: 'hidden'}}
          />
        )}
      </GestureView>

      {isPaused && <Paused />}

      <Text style={styles.score}>{score}</Text>
      <Links show={!isPlaying} />
    </View>
  );
}

function Paused() {
  return (
    <BlurView
      intensity={90}
      style={[
        StyleSheet.absoluteFill,
        {justifyContent: 'center', alignItems: 'center'},
      ]}>
      <Text
        style={{/*fontFamily: 'kombat',*/ textAlign: 'center', fontSize: 48}}>
        Paused
      </Text>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: Colors.primary,
  },
  gestureView: {
    flex: 1,
  },
  score: {
    position: 'absolute',
    top: 24,
    right: 24,
    opacity: 0.6,
    // fontFamily: 'kombat',
    fontSize: 48,
    textAlign: 'right',
    fontWeight: 'bold',
  },
});
