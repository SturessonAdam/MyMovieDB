import '../styles/trailerModal.css';

type TrailerModalProps = {
    show: boolean;
    onClose: () => void;
    trailerURL: string
}

function TrailerModal({ show, onClose, trailerURL } : TrailerModalProps ) {
  if (!show) {
    return null;
  }

  return (
    <div>
        <span className="close" onClick={onClose}>&times;</span>
        <iframe
        src={trailerURL}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen>
        </iframe>
    </div>
    )
};

export default TrailerModal;