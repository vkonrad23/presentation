import { useCallback, useEffect, useRef, useState } from 'react';
import { Camera, CameraOff, CheckCircle2, ShieldCheck, X } from 'lucide-react';

type CameraState = 'idle' | 'requesting' | 'starting' | 'ready' | 'error';

function cameraErrorMessage(error: unknown) {
  const name = error instanceof Error ? error.name : '';
  switch (name) {
    case 'NotAllowedError':
    case 'PermissionDeniedError':
      return 'Camera access was blocked. Allow camera access for this site in your browser’s address bar or site settings, then try again.';
    case 'NotFoundError':
    case 'DevicesNotFoundError':
      return 'No camera was found. Connect a webcam or enable your built-in camera, then try again.';
    case 'NotReadableError':
    case 'TrackStartError':
      return 'Your camera is unavailable. Close other apps or tabs using it, check your device’s camera permissions, then try again.';
    case 'SecurityError':
      return 'This browser or device policy blocks camera access. Check the site’s camera permissions or use a browser that allows webcam access.';
    case 'OverconstrainedError':
      return 'This camera could not provide a compatible preview. Try another camera or a current version of your browser.';
    case 'AbortError':
      return 'The camera could not finish starting. Check its connection, then try again.';
    default:
      return 'The camera preview could not start. Check that your camera is connected and available, then try again.';
  }
}

const stateLabels: Record<CameraState, string> = {
  idle: 'Camera off',
  requesting: 'Permission requested',
  starting: 'Preview starting',
  ready: 'Camera ready',
  error: 'Camera unavailable',
};

export function CameraCheck() {
  const [state, setState] = useState<CameraState>('idle');
  const [message, setMessage] = useState('Check your framing and light before you rehearse. The camera is optional.');
  const videoRef = useRef<HTMLVideoElement>(null);
  const checkButtonRef = useRef<HTMLButtonElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const requestRef = useRef(0);
  const stateRef = useRef<CameraState>('idle');
  const mountedRef = useRef(false);
  const removeTrackListenersRef = useRef<(() => void) | null>(null);
  const previewTimeoutRef = useRef<number | undefined>(undefined);

  const releaseCamera = useCallback(() => {
    window.clearTimeout(previewTimeoutRef.current);
    previewTimeoutRef.current = undefined;
    removeTrackListenersRef.current?.();
    removeTrackListenersRef.current = null;

    const stream = streamRef.current;
    streamRef.current = null;
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.srcObject = null;
    }
    stream?.getTracks().forEach((track) => track.stop());
  }, []);

  const stopCamera = useCallback((reason: string) => {
    requestRef.current += 1;
    releaseCamera();
    stateRef.current = 'idle';
    if (mountedRef.current) {
      setState('idle');
      setMessage(reason);
    }
  }, [releaseCamera]);

  const failRequest = useCallback((request: number, reason: string) => {
    if (!mountedRef.current || request !== requestRef.current) return;
    requestRef.current += 1;
    releaseCamera();
    stateRef.current = 'error';
    setState('error');
    setMessage(reason);
  }, [releaseCamera]);

  useEffect(() => {
    mountedRef.current = true;
    const stopWhenHidden = () => {
      if (document.visibilityState === 'hidden' && stateRef.current !== 'idle') {
        stopCamera('Camera stopped while this tab was hidden. Check it again when you’re ready.');
      }
    };
    const stopWhenLeaving = () => {
      if (stateRef.current !== 'idle') {
        stopCamera('Camera stopped when you left this page. Check it again when you’re ready.');
      }
    };
    document.addEventListener('visibilitychange', stopWhenHidden);
    window.addEventListener('pagehide', stopWhenLeaving);
    return () => {
      mountedRef.current = false;
      requestRef.current += 1;
      stateRef.current = 'idle';
      releaseCamera();
      document.removeEventListener('visibilitychange', stopWhenHidden);
      window.removeEventListener('pagehide', stopWhenLeaving);
    };
  }, [releaseCamera, stopCamera]);

  function confirmPreviewFrame() {
    const video = videoRef.current;
    const stream = streamRef.current;
    if (!mountedRef.current || !video || !stream || video.srcObject !== stream) return;
    if (video.paused || video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) return;
    if (video.videoWidth === 0 || video.videoHeight === 0) return;
    if (!stream.getVideoTracks().some((track) => track.readyState === 'live')) return;

    window.clearTimeout(previewTimeoutRef.current);
    previewTimeoutRef.current = undefined;
    stateRef.current = 'ready';
    setState('ready');
    setMessage('Your live preview is ready. Check your framing and light, then rehearse at your own pace.');
  }

  async function checkCamera() {
    if (stateRef.current === 'requesting' || stateRef.current === 'starting' || stateRef.current === 'ready') return;

    const request = ++requestRef.current;
    if (!window.isSecureContext) {
      failRequest(request, 'Camera access needs a secure page. Open this project through localhost or HTTPS, then try again.');
      return;
    }
    if (!navigator.mediaDevices?.getUserMedia) {
      failRequest(request, 'This browser does not support camera access here. Try a current version of Chrome, Edge, Firefox, or Safari through localhost or HTTPS.');
      return;
    }

    stateRef.current = 'requesting';
    setState('requesting');
    setMessage('Allow camera access in your browser to see your preview. You can cancel this check at any time.');

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'user',
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });

      // A browser permission prompt cannot be aborted; release any late result.
      if (!mountedRef.current || request !== requestRef.current) {
        stream.getTracks().forEach((track) => track.stop());
        return;
      }
      streamRef.current = stream;
      if (document.visibilityState === 'hidden') {
        stopCamera('Camera stopped while this tab was hidden. Check it again when you’re ready.');
        return;
      }

      const tracks = stream.getVideoTracks();
      if (!tracks.some((track) => track.readyState === 'live')) {
        failRequest(request, 'The camera did not provide a live video feed. Check its connection, then try again.');
        return;
      }
      const stopWhenEnded = () => {
        if (request === requestRef.current && streamRef.current === stream) {
          stopCamera('The camera disconnected or access ended. Check your device, then try again.');
        }
      };
      tracks.forEach((track) => track.addEventListener('ended', stopWhenEnded));
      removeTrackListenersRef.current = () => tracks.forEach((track) => track.removeEventListener('ended', stopWhenEnded));

      const video = videoRef.current;
      if (!video) {
        stopCamera('Camera stopped. You can keep rehearsing without it.');
        return;
      }
      stateRef.current = 'starting';
      setState('starting');
      setMessage('Starting your private camera preview…');
      previewTimeoutRef.current = window.setTimeout(() => {
        if (stateRef.current === 'starting') {
          failRequest(request, 'The camera opened but no playable preview arrived. Close other camera apps, check the connection, then try again.');
        }
      }, 12000);
      video.srcObject = stream;
      try {
        await video.play();
        if (request === requestRef.current) confirmPreviewFrame();
      } catch {
        failRequest(request, 'Your browser could not play the camera preview. Check camera permissions, close other camera apps, then try again.');
      }
    } catch (error) {
      failRequest(request, cameraErrorMessage(error));
    }
  }

  function cancelOrStop() {
    const reason = stateRef.current === 'ready'
      ? 'Camera stopped. You can keep rehearsing without it.'
      : 'Camera check cancelled. You can keep rehearsing without camera access.';
    stopCamera(reason);
    window.requestAnimationFrame(() => checkButtonRef.current?.focus({ preventScroll: true }));
  }

  const pending = state === 'requesting' || state === 'starting';
  const active = pending || state === 'ready';

  return (
    <section className="mt-7 overflow-hidden rounded-2xl border border-[#DCE5DB] bg-[#F7F8F2]" aria-labelledby="camera-check-title" data-camera-state={state}>
      <div className="p-5">
        <div className="flex items-start gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#063F32] text-[#E8B93F]">
            <Camera size={21} aria-hidden="true" />
          </span>
          <div>
            <h3 id="camera-check-title" className="text-base font-semibold text-[#10251F]">A quick camera check</h3>
            <p className="mt-1 text-sm leading-relaxed text-[#52645D]">Optional · a private preview before your pitch</p>
          </div>
        </div>

        <div className="relative mt-5 aspect-video overflow-hidden rounded-xl border border-[#DCE5DB] bg-[#EDF4EC]">
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            onLoadedData={confirmPreviewFrame}
            onPlaying={confirmPreviewFrame}
            onError={() => {
              if (streamRef.current) failRequest(requestRef.current, 'The camera preview was interrupted. Check your device, then try again.');
            }}
            aria-label="Mirrored live camera preview"
            data-testid="camera-preview"
            className={[
              'absolute inset-0 h-full w-full -scale-x-100 object-cover transition-opacity motion-reduce:transition-none',
              state === 'ready' ? 'opacity-100' : 'opacity-0',
            ].join(' ')}
          />
          {state !== 'ready' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-5 text-center text-[#52645D]">
              <CameraOff size={28} strokeWidth={1.5} aria-hidden="true" />
              <p className="text-sm leading-relaxed">{pending ? 'Waiting for your camera preview…' : 'Your preview appears here when you choose.'}</p>
            </div>
          )}
          {state === 'ready' && (
            <span className="absolute top-3 left-3 inline-flex items-center gap-2 rounded-full bg-[#F7F8F2] px-3 py-1.5 text-sm font-semibold text-[#063F32]">
              <CheckCircle2 size={15} aria-hidden="true" />Live preview
            </span>
          )}
        </div>

        <div className="mt-4 min-h-24" role="status" aria-live="polite" aria-atomic="true">
          <p className="text-sm font-semibold text-[#063F32]">{stateLabels[state]}</p>
          <p className={['mt-1 text-sm leading-relaxed', state === 'error' ? 'text-[#8A3223]' : 'text-[#52645D]'].join(' ')}>{message}</p>
        </div>

        <div className="mt-3 flex flex-wrap gap-3">
          <button ref={checkButtonRef} type="button" className="button min-h-11" onClick={checkCamera} disabled={active}>
            <Camera size={17} aria-hidden="true" />Check my camera
          </button>
          {active && (
            <button type="button" className="button button-secondary min-h-11" onClick={cancelOrStop}>
              {pending ? <X size={17} aria-hidden="true" /> : <CameraOff size={17} aria-hidden="true" />}
              {pending ? 'Cancel camera check' : 'Stop camera'}
            </button>
          )}
        </div>

        <p className="mt-4 flex items-start gap-2 text-sm leading-relaxed text-[#52645D]">
          <ShieldCheck size={17} className="mt-0.5 shrink-0 text-[#08754D]" aria-hidden="true" />
          Private camera preview. Microphone access stays off, and nothing is recorded, uploaded, or saved.
        </p>
      </div>
    </section>
  );
}
