// components/admin/ContentManager/ContentManager.tsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Edit, 
  Save, 
  Trash2, 
  Plus,
  Search,
  FileText,
  Briefcase,
  Settings,
  DollarSign,
  HelpCircle,
  Users,
  MessageSquare,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAppSelector, useAppDispatch } from "@/app/store/hooks";
import {
  fetchContent,
  updateSection,
  updateProject,
  updateService,
  updateFAQ,
  updatePricingPlan,
  deleteProject,
  deleteService,
  deleteFAQ,
  deletePricingPlan,
  createProject,
  createService,
  createFAQ,
  createPricingPlan,
  clearError
} from "@/app/store/slices/contentSlice";

interface ContentManagerProps {
  contentType: 'sections' | 'projects' | 'services' | 'pricing' | 'faqs' | 'team' | 'testimonials';
}

export function ContentManager({ contentType }: ContentManagerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [editedData, setEditedData] = useState<any>({});
  const [isCreating, setIsCreating] = useState(false);
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  
  const { 
    sections, 
    projects, 
    services, 
    faqs, 
    pricingPlans, 
    teamMembers,
    testimonials,
    loading,
    error
  } = useAppSelector((state) => state.content);

  useEffect(() => {
    dispatch(fetchContent());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast({
        title: "خطأ",
        description: error,
        variant: "destructive",
      });
      dispatch(clearError());
    }
  }, [error, toast, dispatch]);

  // الحصول على البيانات بناء على النوع
  const getContentData = () => {
    switch (contentType) {
      case 'sections': return Object.values(sections);
      case 'projects': return projects;
      case 'services': return services;
      case 'pricing': return pricingPlans;
      case 'faqs': return faqs;
      case 'team': return teamMembers;
      case 'testimonials': return testimonials;
      default: return [];
    }
  };

  // الحصول على دالة التحديث بناء على النوع
  const getUpdateFunction = () => {
    switch (contentType) {
      case 'sections': return updateSection;
      case 'projects': return updateProject;
      case 'services': return updateService;
      case 'faqs': return updateFAQ;
      case 'pricing': return updatePricingPlan;
      default: return () => Promise.resolve();
    }
  };

  // الحصول على دالة الحذف بناء على النوع
  const getDeleteFunction = () => {
    switch (contentType) {
      case 'projects': return deleteProject;
      case 'services': return deleteService;
      case 'faqs': return deleteFAQ;
      case 'pricing': return deletePricingPlan;
      default: return () => Promise.resolve();
    }
  };

  // الحصول على دالة الإنشاء بناء على النوع
  const getCreateFunction = () => {
    switch (contentType) {
      case 'projects': return createProject;
      case 'services': return createService;
      case 'faqs': return createFAQ;
      case 'pricing': return createPricingPlan;
      default: return () => Promise.resolve();
    }
  };

  const contentData = getContentData();
  const updateFunction = getUpdateFunction();
  const deleteFunction = getDeleteFunction();
  const createFunction = getCreateFunction();

  // تصفية المحتوى بناء على البحث
  const filteredContent = contentData.filter((item: any) =>
    item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.question?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getIcon = () => {
    switch (contentType) {
      case 'sections': return <FileText className="h-5 w-5" />;
      case 'projects': return <Briefcase className="h-5 w-5" />;
      case 'services': return <Settings className="h-5 w-5" />;
      case 'pricing': return <DollarSign className="h-5 w-5" />;
      case 'faqs': return <HelpCircle className="h-5 w-5" />;
      case 'team': return <Users className="h-5 w-5" />;
      case 'testimonials': return <MessageSquare className="h-5 w-5" />;
      default: return <FileText className="h-5 w-5" />;
    }
  };

  const getTitle = () => {
    switch (contentType) {
      case 'sections': return "أقسام الموقع";
      case 'projects': return "المشاريع";
      case 'services': return "الخدمات";
      case 'pricing': return "خطط الأسعار";
      case 'faqs': return "الأسئلة الشائعة";
      case 'team': return "أعضاء الفريق";
      case 'testimonials': return "آراء العملاء";
      default: return "المحتوى";
    }
  };

  const handleEdit = (item: any) => {
    setEditingItem(item.id);
    setEditedData({ ...item });
  };

  const handleSave = async (id: string) => {
    try {
      await dispatch(updateFunction({ id, data: editedData })).unwrap();
      setEditingItem(null);
      toast({
        title: "تم الحفظ",
        description: "تم تحديث المحتوى بنجاح",
      });
    } catch (error: any) {
      toast({
        title: "خطأ",
        description: error.message || "فشل في حفظ التغييرات",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteFunction(id)).unwrap();
      toast({
        title: "تم الحذف",
        description: "تم حذف العنصر بنجاح",
      });
    } catch (error: any) {
      toast({
        title: "خطأ",
        description: error.message || "فشل في حذف العنصر",
        variant: "destructive",
      });
    }
  };

  const handleCreate = async () => {
    try {
      await dispatch(createFunction(editedData)).unwrap();
      setIsCreating(false);
      setEditedData({});
      toast({
        title: "تم الإنشاء",
        description: "تم إنشاء العنصر بنجاح",
      });
    } catch (error: any) {
      toast({
        title: "خطأ",
        description: error.message || "فشل في إنشاء العنصر",
        variant: "destructive",
      });
    }
  };

  const handleCancel = () => {
    setEditingItem(null);
    setIsCreating(false);
    setEditedData({});
  };

  const handleInputChange = (field: string, value: string) => {
    setEditedData((prev: any) => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-6">
      {/* Search and Actions Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 dark:bg-primary/30 rounded-full">
            {getIcon()}
          </div>
          <div>
            <h3 className="text-xl font-semibold">{getTitle()}</h3>
            <p className="text-sm text-muted-foreground">
              {filteredContent.length} items
            </p>
          </div>
        </div>
        
        <div className="flex gap-2 w-full sm:w-auto">
          <Input
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-64"
          />
          {contentType !== 'sections' && (
            <Button 
              className="bg-primary hover:bg-primary/90"
              onClick={() => setIsCreating(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New
            </Button>
          )}
        </div>
      </div>

      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      )}

      {/* Creation Form */}
      {isCreating && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="hover:shadow-lg transition-shadow mb-6">
            <CardContent className="p-6">
              <div className="space-y-4">
                <Input
                  value={editedData.title || editedData.name || editedData.question || ''}
                  onChange={(e) => handleInputChange(
                    contentType === 'faqs' ? 'question' : 
                    contentType === 'pricing' ? 'name' : 'title', 
                    e.target.value
                  )}
                  placeholder="Title"
                />
                <textarea
                  value={editedData.description || editedData.answer || editedData.subtitle || ''}
                  onChange={(e) => handleInputChange(
                    contentType === 'faqs' ? 'answer' : 
                    contentType === 'pricing' ? 'description' : 'description', 
                    e.target.value
                  )}
                  placeholder="Description"
                  className="w-full p-2 border rounded-md min-h-[100px]"
                />
                <div className="flex gap-2">
                  <Button 
                    onClick={handleCreate}
                    className="bg-primary hover:bg-primary/90"
                    size="sm"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Create
                  </Button>
                  <Button 
                    onClick={handleCancel}
                    variant="outline"
                    size="sm"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Content List */}
      <div className="grid gap-4">
        {!loading && filteredContent.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <div className="text-muted-foreground mb-4">
                {getIcon()}
              </div>
              <h3 className="text-lg font-semibold mb-2">No Content Found</h3>
              <p className="text-muted-foreground">
                Start by adding new content to {getTitle()}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredContent.map((item: any) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  {editingItem === item.id ? (
                    // Editing Mode
                    <div className="space-y-4">
                      <Input
                        value={editedData.title || editedData.name || editedData.question || ''}
                        onChange={(e) => handleInputChange(
                          contentType === 'faqs' ? 'question' : 
                          contentType === 'pricing' ? 'name' : 'title', 
                          e.target.value
                        )}
                        placeholder="Title"
                      />
                      <textarea
                        value={editedData.description || editedData.answer || editedData.subtitle || ''}
                        onChange={(e) => handleInputChange(
                          contentType === 'faqs' ? 'answer' : 
                          contentType === 'pricing' ? 'description' : 'description', 
                          e.target.value
                        )}
                        placeholder="Description"
                        className="w-full p-2 border rounded-md min-h-[100px]"
                      />
                      <div className="flex gap-2">
                        <Button 
                          onClick={() => handleSave(item.id)}
                          className="bg-primary hover:bg-primary/90"
                          size="sm"
                        >
                          <Save className="h-4 w-4 mr-2" />
                          Save
                        </Button>
                        <Button 
                          onClick={handleCancel}
                          variant="outline"
                          size="sm"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    // Display Mode
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg mb-2">
                          {item.title || item.name || item.question}
                        </h4>
                        <p className="text-muted-foreground line-clamp-2">
                          {item.description || item.answer || item.subtitle}
                        </p>
                        {contentType === 'pricing' && (
                          <p className="text-primary font-medium mt-2">
                            ${item.monthlyPrice} / month
                          </p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(item)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        {contentType !== 'sections' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:text-destructive/90"
                            onClick={() => handleDelete(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
