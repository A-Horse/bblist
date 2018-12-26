export function onTrackTopBarMouseDown(event, component) {
  // TODO 只需要在content里query
  if (event.nativeEvent.target.classList.contains("ant-dropdown-trigger")) {
    return;
  }

  const tracks = window.document.querySelectorAll(".task-track");
  const thisTrack = component.domMain;
  const movingTrack = thisTrack.cloneNode(true);

  const trackContainer = window.document.body.querySelector(
    ".board-track-container"
  );

  const trackHorMargin = 14;
  const trackVerMargin = 15;

  thisTrack.classList.add("shadowing");

  const thisTrackRect = thisTrack.getBoundingClientRect();
  const thisTrackLeft = thisTrackRect.left;
  const thisTrackTop = thisTrackRect.top;
  const trackOuterWidth = thisTrackRect.width + trackHorMargin * 2;

  // TODO getMouseElementInnerOffset
  const thisTrackMouseOffset = {
    left: event.pageX - thisTrackLeft,
    top: event.pageY - thisTrackTop
  };

  movingTrack.classList.add("moving");

  movingTrack.style.height = thisTrack.offsetHeight + "px";
  movingTrack.style.width = thisTrack.offsetWidth + "px";
  movingTrack.style.top = thisTrackRect.top - trackVerMargin + "px";

  let currentTrackIndex = Number(thisTrack.dataset.index);

  function onMouseMove(event) {
    const movingOffset =
      event.pageX - thisTrackMouseOffset.left - trackHorMargin;
    movingTrack.style.transform = `translate(${movingOffset}px, 0)`;

    const mouseMovingOffset = event.pageX + trackContainer.scrollLeft;

    const ii = Math.floor(mouseMovingOffset / trackOuterWidth);

    if (ii === currentTrackIndex) {
      return;
    }

    if (ii - currentTrackIndex === 1) {
      tracks.forEach(track => {
        const trackDataIndex = Number(track.dataset.index);
        if (trackDataIndex === currentTrackIndex) {
          const currentTransformLeft = Number(track.dataset.transformLeft) || 0;
          track.dataset.transformLeft = currentTransformLeft + trackOuterWidth;
          track.dataset.index = trackDataIndex + 1;
          track.style.transform = `translate(${currentTransformLeft +
            trackOuterWidth}px, 0)`;
        }
        if (trackDataIndex === ii) {
          const currentTransformLeft = Number(track.dataset.transformLeft) || 0;
          track.dataset.transformLeft = currentTransformLeft - trackOuterWidth;
          track.dataset.index = trackDataIndex - 1;
          track.style.transform = `translate(${currentTransformLeft -
            trackOuterWidth}px, 0)`;
        }
      });
      currentTrackIndex = ii;
    } else if (currentTrackIndex - ii === 1) {
      tracks.forEach(track => {
        const trackDataIndex = Number(track.dataset.index);
        if (trackDataIndex === currentTrackIndex) {
          const currentTransformLeft = Number(track.dataset.transformLeft) || 0;
          track.dataset.transformLeft = currentTransformLeft - trackOuterWidth;
          track.dataset.index = trackDataIndex - 1;
          track.style.transform = `translate(${currentTransformLeft -
            trackOuterWidth}px, 0)`;
        }
        if (trackDataIndex === ii) {
          const currentTransformLeft = Number(track.dataset.transformLeft) || 0;
          track.dataset.transformLeft = currentTransformLeft + trackOuterWidth;
          track.dataset.index = trackDataIndex + 1;
          track.style.transform = `translate(${currentTransformLeft +
            trackOuterWidth}px, 0)`;
        }
      });
      currentTrackIndex = ii;
    }
  }

  const self = component;
  function onMouseUp() {
    thisTrack.classList.remove("shadowing");
    window.document.body.removeChild(movingTrack);
    window.document.body.removeEventListener("mousemove", onMouseMove);
    window.document.body.removeEventListener("mouseup", onMouseUp);

    self.props.updateTaskTrackIndexs();
  }

  window.document.body.appendChild(movingTrack);

  const movingOffset = event.pageX - thisTrackMouseOffset.left - trackHorMargin;
  movingTrack.style.transform = `translate(${movingOffset}px, 0)`;

  window.document.body.addEventListener("mousemove", onMouseMove);
  window.document.body.addEventListener("mouseup", onMouseUp);

  // TODO body onblur
}
