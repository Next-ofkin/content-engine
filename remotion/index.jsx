import { registerRoot, Composition } from "remotion";
import { ShortVideo } from "./Video";

const RemotionRoot = () => {
  return (
    <Composition
      id="ShortVideo"
      component={ShortVideo}
      durationInFrames={300}
      fps={30}
      width={1080}
      height={1920}
      defaultProps={{
        scriptText: "Preview text will appear here while testing in Studio.",
      }}
    />
  );
};

registerRoot(RemotionRoot);