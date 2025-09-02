"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useContentStore } from "./store/contentStore";

type SectionForm = {
  title: string;
  subtitle: string;
  description: string;
};

export default function ContentManager() {
  const { sections, fetchSections, updateSection, loading } = useContentStore();

  useEffect(() => {
    fetchSections();
  }, [fetchSections]);

  const renderSectionForm = (sectionId: string) => {
    const section = sections[sectionId];
    const { register, handleSubmit, reset } = useForm<SectionForm>({
      defaultValues: section,
    });

    useEffect(() => {
      if (section) reset(section);
    }, [section, reset]);

    const onSubmit = async (data: SectionForm) => {
      await updateSection(sectionId, data);
      alert(`✅ ${sectionId} updated successfully!`);
    };

    return (
      <form
        key={sectionId}
        onSubmit={handleSubmit(onSubmit)}
        className="border p-4 rounded mb-6"
      >
        <h2 className="text-xl font-bold mb-2 capitalize">{sectionId}</h2>
        <input
          {...register("title")}
          placeholder="Title"
          className="w-full border p-2 rounded mb-2"
        />
        <input
          {...register("subtitle")}
          placeholder="Subtitle"
          className="w-full border p-2 rounded mb-2"
        />
        <textarea
          {...register("description")}
          placeholder="Description"
          className="w-full border p-2 rounded mb-2"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </form>
    );
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Content Management</h1>
      {Object.keys(sections).length === 0 && <p>Loading sections...</p>}
      {Object.keys(sections).map((sectionId) => renderSectionForm(sectionId))}
    </div>
  );
}