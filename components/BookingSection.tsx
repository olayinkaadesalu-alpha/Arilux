
import React, { useState } from 'react';

interface Props {
  timeSlots: string[];
}

export const BookingSection: React.FC<Props> = ({ timeSlots }) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!time) {
      alert("Please select a preferred artistry session time.");
      return;
    }
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setTime('');
      setDate('');
    }, 4000);
  };

  return (
    <div className="bg-[#FAF9F6] p-8 md:p-20 shadow-sm border border-black/5">
      <div className="flex flex-col lg:flex-row gap-20">
        <div className="lg:w-5/12 text-left space-y-10">
          <div className="space-y-6">
            <h3 className="text-[12px] uppercase tracking-[0.6em] font-black text-[#C6A48E]">The Concierge</h3>
            <h2 className="text-5xl md:text-7xl font-light uppercase tracking-tighter text-black leading-tight">Request a<br/>Session</h2>
          </div>
          
          <p className="italic serif text-xl md:text-2xl text-black/50 leading-relaxed">
            Our private consultations are tailored to your unique features and stylistic goals. From bridal preparation to professional masterclasses.
          </p>

          <div className="pt-10 space-y-4 border-t border-black/5">
            <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-black/30">Lagos Studio Only</p>
            <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-black/30">Confirmation within 24h</p>
          </div>
        </div>

        <form onSubmit={handleBooking} className="lg:w-7/12 bg-white p-8 md:p-16 space-y-12 text-left shadow-2xl">
          {submitted ? (
            <div className="py-24 text-center space-y-8 animate-in fade-in zoom-in">
              <div className="text-6xl text-zinc-200 serif italic">Received.</div>
              <p className="text-[10px] uppercase tracking-[0.5em] font-black opacity-40">The Atelier Concierge will reach out via email shortly.</p>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                <label className="text-[10px] uppercase tracking-[0.5em] font-black text-black/40">Choose Date</label>
                <input 
                  type="date" 
                  required
                  className="w-full bg-transparent border-b border-black/10 py-5 text-sm font-bold focus:outline-none focus:border-black transition-all rounded-none"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>

              <div className="space-y-6">
                <label className="text-[10px] uppercase tracking-[0.5em] font-black text-black/40">Available Hours</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {timeSlots.map(t => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTime(t)}
                      className={`py-4 text-[9px] tracking-[0.3em] uppercase border transition-all duration-700 font-black ${time === t ? 'bg-black text-white border-black shadow-lg translate-y-[-2px]' : 'border-black/5 hover:border-black/20 text-black/30'}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-8">
                <button 
                  type="submit"
                  className="w-full py-6 bg-black text-white uppercase text-[11px] tracking-[0.6em] font-black hover:bg-[#C6A48E] transition-all duration-700 shadow-xl"
                >
                  Send Inquiry
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};
