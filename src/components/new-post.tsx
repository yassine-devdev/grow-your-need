"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ChevronDown, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface CreatePostFormProps {
  titleText?: string;
  descriptionText?: string;
  formTitleLabel?: string;
  formContentLabel?: string;
  formFeaturedImageLabel?: string;
  formCollectionLabel?: string;
  titlePlaceholder?: string;
  contentPlaceholder?: string;
  contentSavedText?: string;
  imageDragDropText?: string;
  chooseFileButtonText?: string;
  fileChosenText?: string;
  noFileChosenText?: string;
  imageUrlPlaceholder?: string;
  uploadFromUrlButtonText?: string;
  selectCollectionPlaceholder?: string;
  collections?: string[];
  manageCollectionsButtonText?: string;
  saveAsDraftButtonText?: string;
  publishPostButtonText?: string;
  recentPostsTitle?: string;
  noRecentPostsText?: string;
  titleMinLengthMessage?: string;
  contentMinLengthMessage?: string;
  postCreatedSuccessMessage?: string;
  defaultImageUrl?: string;
}

function CreatePost1({
  titleText = "Create New Posts",
  descriptionText = "Manage account and website settings.",
  formTitleLabel = "Title",
  formContentLabel = "Content",
  formFeaturedImageLabel = "Featured Image",
  formCollectionLabel = "Collection",
  titlePlaceholder = "Enter post title",
  contentPlaceholder = "Press '/' for commands",
  contentSavedText = "Saved",
  imageDragDropText = "Drag and drop an image here or click to select",
  chooseFileButtonText = "Choose File",
  fileChosenText = "File chosen",
  noFileChosenText = "No file chosen",
  imageUrlPlaceholder = "Enter image URL",
  uploadFromUrlButtonText = "Upload from URL",
  selectCollectionPlaceholder = "Select a collection",
  collections = [
    "Blog Posts",
    "News",
    "Tutorials",
    "Case Studies",
    "Product Updates",
  ],
  manageCollectionsButtonText = "Manage Collections",
  saveAsDraftButtonText = "Save as Draft",
  publishPostButtonText = "Publish Post",
  recentPostsTitle = "Recent Posts",
  noRecentPostsText = "No recent posts found.",
  titleMinLengthMessage = "Title must be at least 2 characters.",
  contentMinLengthMessage = "Content must be at least 10 characters.",
  postCreatedSuccessMessage = "Post created successfully!",
  defaultImageUrl = "https://imagedelivery.net/Kpcbofvpelk1jdjXmWIr5w/15656e6c-1315-435d-fa59-ec0ce2ac0700/public",
}: CreatePostFormProps) {
  const [imageUrl, setImageUrl] = useState("");
  const [isRecentPostsOpen, setIsRecentPostsOpen] = useState(false);

  const formSchema = z.object({
    title: z.string().min(2, { message: titleMinLengthMessage }),
    content: z.string().min(10, { message: contentMinLengthMessage }),
    featuredImage: z.string().optional(),
    collection: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      featuredImage: "",
      collection: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    alert(postCreatedSuccessMessage);
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
      form.setValue("featuredImage", url);
    }
  };

  const handleUrlUpload = () => {
    const url = form.getValues("featuredImage");
    if (url) {
      setImageUrl(url);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">{titleText}</h1>
        <p className="text-muted-foreground">{descriptionText}</p>
      </div>

      <Card className="rounded-lg border shadow-sm">
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {/* Left Column - Title and Content */}
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">
                          {formTitleLabel}
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder={titlePlaceholder}
                            className="h-10"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">
                          {formContentLabel}
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Textarea
                              placeholder={contentPlaceholder}
                              className="min-h-[500px] resize-none bg-muted/50"
                              {...field}
                            />
                            <div className="absolute right-2 top-2 rounded bg-background px-2 py-1 text-xs text-muted-foreground">
                              {contentSavedText}
                            </div>
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                {/* Right Column - Featured Image and Collection */}
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="featuredImage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">
                          {formFeaturedImageLabel}
                        </FormLabel>
                        <FormControl>
                          <div className="space-y-4">
                            <div
                              className="flex h-48 cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-2 border-dashed bg-muted/30"
                              onClick={() =>
                                document.getElementById("image-upload")?.click()
                              }
                            >
                              {imageUrl ? (
                                <img
                                  src={imageUrl || defaultImageUrl}
                                  alt="Preview"
                                  className="max-h-full object-cover"
                                  onError={() => setImageUrl("")}
                                />
                              ) : (
                                <div className="p-4 text-center text-muted-foreground">
                                  <p>{imageDragDropText}</p>
                                </div>
                              )}
                              <input
                                id="image-upload"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageUpload}
                              />
                            </div>

                            <div className="flex items-center gap-2">
                              <Button
                                type="button"
                                variant="outline"
                                className="w-full justify-start text-left font-normal"
                                onClick={() =>
                                  document
                                    .getElementById("image-upload")
                                    ?.click()
                                }
                              >
                                {chooseFileButtonText}
                                <span className="ml-2 text-muted-foreground">
                                  {imageUrl ? fileChosenText : noFileChosenText}
                                </span>
                              </Button>
                            </div>

                            <div className="flex gap-2">
                              <Input
                                placeholder={imageUrlPlaceholder}
                                className="flex-1"
                                {...field}
                                onChange={(e) => {
                                  field.onChange(e);
                                  if (!e.target.value) {
                                    setImageUrl("");
                                  }
                                }}
                              />
                              <Button type="button" onClick={handleUrlUpload}>
                                <Upload className="mr-2 h-4 w-4" />
                                {uploadFromUrlButtonText}
                              </Button>
                            </div>
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="collection"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">
                          {formCollectionLabel}
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue
                                placeholder={selectCollectionPlaceholder}
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {collections.map((collection) => (
                              <SelectItem key={collection} value={collection}>
                                {collection}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full justify-center"
                  >
                    {manageCollectionsButtonText}
                  </Button>
                </div>
              </div>

              <div className="flex justify-start space-x-4 pt-4">
                <Button type="button" variant="outline">
                  {saveAsDraftButtonText}
                </Button>
                <Button type="submit">{publishPostButtonText}</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Collapsible
        open={isRecentPostsOpen}
        onOpenChange={setIsRecentPostsOpen}
        className="mt-6 rounded-lg border shadow-sm"
      >
        <CollapsibleTrigger className="flex w-full items-center justify-between p-4 font-medium">
          <span>{recentPostsTitle}</span>
          <ChevronDown
            className={`h-4 w-4 transition-transform ${isRecentPostsOpen ? "rotate-180" : ""}`}
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="border-t p-4 pt-0">
          <div className="text-muted-foreground">{noRecentPostsText}</div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}

export { CreatePost1 };
