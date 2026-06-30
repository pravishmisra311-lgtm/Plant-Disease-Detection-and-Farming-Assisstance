import { useRef, useState, useCallback } from 'react';

/**
 * ImageUploader — Drag-and-drop + file picker + webcam capture
 */
export default function ImageUploader({ onImageReady, disabled }) {
  const fileInputRef  = useRef(null);
  const videoRef      = useRef(null);
  const canvasRef     = useRef(null);
  const streamRef     = useRef(null);

  const [isDragging,   setIsDragging]   = useState(false);
  const [previewUrl,   setPreviewUrl]   = useState(null);
  const [showCamera,   setShowCamera]   = useState(false);
  const [cameraError,  setCameraError]  = useState(null);

  // ── File helpers ────────────────────────────────────────────────────────
  const handleFile = useCallback((file) => {
    if (!file || !file.type.startsWith('image/')) return;
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    const img = new Image();
    img.onload = () => onImageReady(img, url);
    img.src = url;
  }, [onImageReady]);

  // ── Drag and drop ────────────────────────────────────────────────────────
  const onDragOver  = (e) => { e.preventDefault(); setIsDragging(true); };
  const onDragLeave = ()  => setIsDragging(false);
  const onDrop      = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  // ── Camera ───────────────────────────────────────────────────────────────
  const startCamera = async () => {
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      streamRef.current = stream;
      setShowCamera(true);
      // Wait a tick for the video element to mount
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      }, 100);
    } catch {
      setCameraError('Camera access denied. Please allow camera permission and try again.');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    setShowCamera(false);
  };

  const capturePhoto = () => {
    const video  = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    canvas.width  = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);

    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      setPreviewUrl(url);

      const img = new Image();
      img.onload = () => onImageReady(img, url);
      img.src = url;
    }, 'image/jpeg', 0.92);

    stopCamera();
  };

  const clearImage = () => {
    setPreviewUrl(null);
    onImageReady(null, null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div>
      {/* Preview */}
      {previewUrl && !showCamera && (
        <div className="card anim-scale-in" style={{ padding: 'var(--sp-3)', marginBottom: 'var(--sp-4)' }}>
          <div style={{ position: 'relative', borderRadius: 'var(--r-lg)', overflow: 'hidden' }}>
            <img
              src={previewUrl}
              alt="Uploaded plant"
              style={{ width: '100%', maxHeight: 380, objectFit: 'contain', background: 'var(--bg-surface-2)', borderRadius: 'var(--r-md)' }}
            />
            <button
              onClick={clearImage}
              style={{
                position: 'absolute', top: 10, right: 10,
                background: 'rgba(0,0,0,0.6)', color: '#fff',
                border: 'none', borderRadius: 'var(--r-full)',
                width: 32, height: 32, fontSize: '0.85rem', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
              title="Remove image"
            >✕</button>
          </div>
        </div>
      )}

      {/* Camera view */}
      {showCamera && (
        <div className="card anim-scale-in" style={{ padding: 'var(--sp-3)', marginBottom: 'var(--sp-4)' }}>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            style={{ width: '100%', borderRadius: 'var(--r-md)', background: '#000', maxHeight: 380 }}
          />
          <canvas ref={canvasRef} style={{ display: 'none' }} />
          <div style={{ display: 'flex', gap: 'var(--sp-3)', marginTop: 'var(--sp-3)' }}>
            <button className="btn btn-primary" style={{ flex: 1 }} onClick={capturePhoto} id="capture-btn">
              📸 Capture Photo
            </button>
            <button className="btn btn-ghost" onClick={stopCamera} id="cancel-camera-btn">
              ✕ Cancel
            </button>
          </div>
        </div>
      )}

      {/* Drop zone */}
      {!previewUrl && !showCamera && (
        <div
          className={`anim-fade-in ${isDragging ? 'upload-pulse' : ''}`}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onClick={() => !disabled && fileInputRef.current?.click()}
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-label="Upload plant image"
          onKeyDown={(e) => e.key === 'Enter' && fileInputRef.current?.click()}
          style={{
            border: `2px dashed ${isDragging ? 'var(--c-primary-light)' : 'var(--border)'}`,
            borderRadius: 'var(--r-xl)',
            padding: 'var(--sp-12) var(--sp-8)',
            textAlign: 'center',
            cursor: disabled ? 'not-allowed' : 'pointer',
            background: isDragging ? 'rgba(64,145,108,0.06)' : 'var(--bg-surface-2)',
            transition: 'all var(--t-base)',
            marginBottom: 'var(--sp-4)',
            opacity: disabled ? 0.6 : 1,
          }}
        >
          <div style={{ fontSize: '3rem', marginBottom: 'var(--sp-3)', lineHeight: 1 }} className="anim-float">
            🌿
          </div>
          <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: 'var(--sp-2)' }}>
            Drop a plant image here
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 'var(--sp-4)' }}>
            or click to browse · JPG, PNG, WEBP
          </p>
          <span className="badge badge-primary">📁 Choose File</span>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={(e) => handleFile(e.target.files[0])}
        id="plant-image-input"
      />

      {/* Actions row */}
      {!showCamera && (
        <div style={{ display: 'flex', gap: 'var(--sp-3)', flexWrap: 'wrap' }}>
          <button
            className="btn btn-outline btn-sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={disabled}
            id="upload-btn"
          >
            📁 Upload Image
          </button>
          <button
            className="btn btn-outline btn-sm"
            onClick={startCamera}
            disabled={disabled}
            id="camera-btn"
          >
            📷 Use Camera
          </button>
          {previewUrl && (
            <button
              className="btn btn-ghost btn-sm"
              onClick={clearImage}
              id="clear-image-btn"
            >
              🗑️ Clear
            </button>
          )}
        </div>
      )}

      {cameraError && (
        <p style={{ color: 'var(--c-danger)', fontSize: '0.82rem', marginTop: 'var(--sp-2)' }}>
          ⚠️ {cameraError}
        </p>
      )}
    </div>
  );
}
