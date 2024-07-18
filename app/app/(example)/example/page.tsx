export default function Page() {
  return (
    <>
      {Array.from({ length: 50 }).map((_, index) => (
        <div key={index} className="mb-4">
          <h2 className="text-2xl font-semibold">Section {index + 1}</h2>
          <p className="text-base">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
            odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla
            quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent
            mauris. Fusce nec tellus sed augue semper porta. Mauris massa.
            Vestibulum lacinia arcu eget nulla.
          </p>
        </div>
      ))}
    </>
  );
}
