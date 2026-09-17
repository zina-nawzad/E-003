"use client";

interface IntroVideoProps {
  onComplete: () => void;
}

const IntroVideo = ({ onComplete }: IntroVideoProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <video
        src="/video/intor.mp4"
        autoPlay
        muted
        playsInline
        onEnded={onComplete}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default IntroVideo;
