'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';
import { testimonials } from '@/data/dummy';

export function Testimonials() {
  return (
    <section className="py-20 bg-[#f0f4f8]" id="testimonials">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16" data-aos="fade-up">
          <span className="inline-block px-4 py-2 bg-[#dc2626]/10 text-[#dc2626] rounded-full text-sm font-medium mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#102a43] mb-4">
            Stories of Healing & Hope
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Real stories from people who found guidance, healing, and renewed faith through our platform.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.id}
              className="border-none shadow-lg hover:shadow-xl transition-shadow bg-white"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <CardContent className="p-6">
                <Quote className="w-8 h-8 text-[#dc2626]/30 mb-4" />
                <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <p className="font-semibold text-[#102a43]">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex gap-1 mt-3">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#dc2626] text-[#dc2626]" />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
