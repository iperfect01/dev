export default function Testimonials() {
  return (
    <div className="max-w-5xl mx-auto py-16 px-6 space-y-8">
      <h1 className="text-4xl font-bold text-center">What Our Clients Say</h1>
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <div className="border rounded-lg p-6 shadow-sm">
          <p className="italic">“DevPerfection transformed our digital presence!”</p>
          <p className="mt-4 font-semibold">— Jane Doe, CEO of TechCorp</p>
        </div>
        <div className="border rounded-lg p-6 shadow-sm">
          <p className="italic">“A reliable partner who delivers perfection every time.”</p>
          <p className="mt-4 font-semibold">— John Smith, Founder of InnovateX</p>
        </div>
      </div>
    </div>
  );
}
