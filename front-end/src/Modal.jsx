export default function Modal({ onClose, children }) {
  return (
    <div
      class="transition duration-300 ease-out min-w-screen h-screen fixed left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover"
      id="modal-id"
    >
      <div class="transition duration-300 ease-out absolute bg-black opacity-80 inset-0 z-0" onClick={onClose}></div>
      <div class="transition duration-300 ease-out w-full max-w-xl p-5 relative mx-auto my-auto rounded-xl shadow-lg bg-white ">
        {children}
      </div>
    </div>
  );
}
