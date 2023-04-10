const out = `Title: MobileNets: Efficient Convolutional Neural Networks for Mobile Vision Applications
Summary: This paper presents MobileNets, a class of efficient models for mobile and embedded vision applications. MobileNets use depth-wise separable convolutions to build lightweight deep neural networks. The paper introduces two simple global hyper-parameters that efficiently trade off between latency and accuracy, allowing the model builder to choose the right sized model for their application based on the constraints of the problem. The paper presents extensive experiments on resource and accuracy tradeoffs and shows strong performance compared to other popular models on ImageNet classification. The effectiveness of MobileNets is demonstrated across a wide range of applications and use cases including object detection, fine-grain classification, face attributes, and large scale geo-localization.
Tags: MobileNets, Convolutional Neural Networks, Mobile Vision Applications, Depth-wise Separable Convolutions, Lightweight Deep Neural Networks, Hyper-parameters, Resource and Accuracy Tradeoffs, ImageNet Classification, Object Detection, Fine-grain Classification, Face Attributes, Geo-localization.`;

var title_index = out.indexOf("Title:");
var summary_index = out.indexOf("Summary:");
var tag_index = out.indexOf("Tags:");
console.log(out.slice(title_index + 7, tag_index));
console.log(out.slice(summary_index + 9, tag_index));
console.log(out.slice(tag_index + 6));
